import { STTSentence } from '../../model/stt-sentence';
import { STTResult } from '../../model/stt-result';
import { OCRResult } from '../../model/ocr-result';
import { OCRSentence } from '../../model/ocr-sentence';
import CompleteSentence from '../../model/complete-sentence';
import BinderDataSource from './binder-data-source';
import SentenceAnalyzer from './sentence-analyzer';
import SequenceGuard from './sequence-guard';

/* eslint-disable no-underscore-dangle */
export default class SentenceBinder {
    private static readonly SIMILARITY_THRESHOLD = 0.81;

    private ocrResult: OCRResult[];
    private sttResult: STTResult[];
    private sttSentences: STTSentence[];
    private readonly completeSentences: CompleteSentence[];

    public constructor(
        readonly bid: string,
        readonly languageCode: 'en-GB' | 'en-US',
        readonly startPage: number,
        readonly endPage: number,
    ) {
        this.ocrResult = [];
        this.sttResult = [];
        this.sttSentences = [];
        this.completeSentences = [];
    }

    private async setup(): Promise<void> {
        const dataSource = new BinderDataSource();

        await dataSource.load(this.bid, this.languageCode);

        const {
            ocrResult,
            sttResult,
            sttSentences,
        } = dataSource.filterNoise()
            .typeForce()
            .normalizeText()
            .defragmentation()
            .sort()
            .fetch();

        this.ocrResult = ocrResult;
        this.sttResult = sttResult;
        this.sttSentences = sttSentences;
    }

    public async execute(): Promise<void> {
        await this.setup();

        this.findBestMatches();
        this.revokeSentenceWithTangledSequence();
        this.findPartialMatches();

        await this.teardown();
    }

    private findBestMatches() {
        for (const ocrPageResult of this.ocrResult) {
            this.findBestMatch(ocrPageResult);
        }
    }

    private findBestMatch(ocrPage: OCRResult) {
        for (const ocrSentence of ocrPage.sentences) {
            let candidate: STTSentence | null = null;
            let candidateSimilarity = 0;

            for (const sttSentence of this.sttSentences) {
                if (ocrSentence.consumed || sttSentence.consumed) continue;

                const similarity = SentenceAnalyzer.getSimilarity(sttSentence.textStripped, ocrSentence.textStripped);

                if (similarity > SentenceBinder.SIMILARITY_THRESHOLD && similarity > candidateSimilarity) {
                    candidate = sttSentence;
                    candidateSimilarity = similarity;
                }
            }

            if (candidate) {
                candidate.consumed = true;
                ocrSentence.consumed = true;

                this.appendBoundSentence(ocrPage.page, candidateSimilarity, candidate, ocrSentence);
            }
            candidate = null;
            candidateSimilarity = 0;
        }
    }

    private findPartialMatches() {
        for (const ocrPageResult of this.ocrResult) {
            this.findPartialMatch(ocrPageResult);
        }
    }

    private findPartialMatch(ocrPage: OCRResult) {
        for (const ocrSentence of ocrPage.sentences) {
            for (const sttSentence of this.sttSentences) {
                if (ocrSentence.consumed || sttSentence.consumed) continue;

                if (SentenceAnalyzer.isPartiallyMatched(sttSentence.textStripped, ocrSentence.textStripped)) {
                    console.log('isPartiallyMatched: ', sttSentence.textStripped, ',', ocrSentence.textStripped,
                        ',', SentenceAnalyzer.getSubSentenceSimilarity(sttSentence.textStripped, ocrSentence.textStripped));
                    // this.appendBoundSentence(ocrPage.page, candidate.startTime, candidate.endTime, ocrSentence);
                }
            }
        }
    }

    // Find Sentence with tangled order and kick out it.
    private revokeSentenceWithTangledSequence() {
        const sequenceGuard = new SequenceGuard(this.completeSentences);
        const filtered: CompleteSentence[] = sequenceGuard.getFilteredSentence();

        for (const sentence of filtered) {
            const index = this.completeSentences.indexOf(sentence);

            if (index >= 0 && index < this.completeSentences.length) {
                this.completeSentences.splice(index, 1);
            }
            this.revokeConsumeFlag(sentence);
        }
    }

    private revokeConsumeFlag(sentence: CompleteSentence) {
        for (const ocrPageResult of this.ocrResult) {
            if (sentence.page !== ocrPageResult.page) continue;

            for (const ocrSentence of ocrPageResult.sentences) {
                if (ocrSentence.text === sentence.sentence) {
                    ocrSentence.consumed = false;
                    break;
                }
            }
        }
        for (const sttSentence of this.sttSentences) {
            if (sttSentence.startTime === sentence.startTime && sttSentence.text === sentence.sttSentence) {
                sttSentence.consumed = false;
                break;
            }
        }
    }

    private appendBoundSentence(page: number, similarity: number, sttSentence: STTSentence, sentence: OCRSentence) {
        this.completeSentences.push(new CompleteSentence(
            page,
            similarity,
            sttSentence.startTime,
            sttSentence.endTime,
            sttSentence.text,
            sttSentence.audioPath,
            sttSentence.audioSequence,
            sentence,
        ));
    }

    private printIncompleteSentence() {
        let unboundCount = 0;

        for (const ocrResult of this.ocrResult) {
            ocrResult.sentences.map((sentence) => unboundCount++);
        }
        console.log('unbound count: ', unboundCount);
    }

    private printCompleteSentence() {
        // for (const sentence of this.completeSentences) {
        //     console.log(sentence.toString());
        // }
        console.log('complete sentence count: ', this.completeSentences.length);
    }

    // eslint-disable-next-line
    private sendSentenceDatabase() {
        // TODO: Filter sentence which contains 3~12 words. For sentence database.
        // TODO: Filter sentence are perfect matching. For sentence database.
    }

    private async teardown(): Promise<void> {
        // this.printIncompleteSentence();
        this.printCompleteSentence();

        this.sendSentenceDatabase();
    }
}