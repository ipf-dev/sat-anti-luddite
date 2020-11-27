import fs from 'fs';

import STTSentence from '../../model/binder/stt-sentence';
import STTResult from '../../model/binder/stt-result';
import OCRPageResult from '../../model/binder/ocr-page-result';
import OCRSentence from '../../model/binder/ocr-sentence';
import CompleteSentence from '../../model/binder/complete-sentence';
import BinderDataSource from './binder-data-source';
import SequenceGuard from './sequence-guard';

export default class SentenceBinder {
    private static readonly SIMILARITY_THRESHOLD = 0.81;

    private ocrResult: OCRPageResult[];
    private sttResult: STTResult[];
    private sttSentences: STTSentence[];
    private readonly completeSentences: CompleteSentence[];

    public constructor(
        readonly bid: string,
        readonly languageCode: 'en-GB' | 'en-US',
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
        } = dataSource.sort().fetch();

        this.ocrResult = ocrResult;
        this.sttResult = sttResult;
        this.sttSentences = sttSentences;
    }

    public async execute(): Promise<void> {
        await this.setup();

        this.findBestMatches();
        this.revokeTangledSequenceSentence();
        this.findPartialMatches();
        this.revokeTangledSequenceSentence();
        this.sortCompleteSentence();

        await this.teardown();
    }

    private findBestMatches() {
        for (const ocrPageResult of this.ocrResult) {
            this.findBestMatch(ocrPageResult);
        }
    }

    private findBestMatch(ocrPage: OCRPageResult) {
        for (const ocrSentence of ocrPage.sentences) {
            let candidate: STTSentence | null = null;
            let candidateSimilarity = 0;

            for (const sttSentence of this.sttSentences) {
                if (ocrSentence.consumed || sttSentence.consumed) continue;

                const similarity = ocrSentence.getSimilarity(sttSentence.textStripped);

                if (similarity > SentenceBinder.SIMILARITY_THRESHOLD && similarity > candidateSimilarity) {
                    candidate = sttSentence;
                    candidateSimilarity = similarity;
                }
            }

            if (candidate) {
                candidate.consumed = true;
                ocrSentence.consumed = true;

                this.appendCompleteSentence(ocrPage.page, candidateSimilarity, candidate, ocrSentence);
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

    private findPartialMatch(ocrPage: OCRPageResult) {
        for (const ocrSentence of ocrPage.sentences) {
            for (const sttSentence of this.sttSentences) {
                if (ocrSentence.tokens.length < 3 || ocrSentence.consumed || sttSentence.consumed) continue;

                if (sttSentence.isPartiallyMatched(ocrSentence.textStripped)) {
                    const [matched, remained] = sttSentence.splitMatched(ocrSentence.textStripped, this.sttResult);

                    if (matched) {
                        const similarity = ocrSentence.getSimilarity(matched.textStripped);

                        this.appendCompleteSentence(ocrPage.page, similarity, matched, ocrSentence);

                        ocrSentence.consumed = true;
                        sttSentence.consumed = true;
                        matched.consumed = true;
                    }
                    if (remained) {
                        this.findRemainMatch(remained);
                    }
                }
            }
        }
    }

    private findRemainMatch(remain: STTSentence) {
        for (const ocrPage of this.ocrResult) {
            for (const ocrSentence of ocrPage.sentences) {
                const similarity = ocrSentence.getSimilarity(remain.textStripped);

                if (similarity > SentenceBinder.SIMILARITY_THRESHOLD) {
                    this.appendCompleteSentence(ocrPage.page, similarity, remain, ocrSentence);

                    ocrSentence.consumed = true;
                }
            }
        }
    }

    private revokeTangledSequenceSentence() {
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

    private appendCompleteSentence(page: number, similarity: number, sttSentence: STTSentence, sentence: OCRSentence) {
        this.completeSentences.push(new CompleteSentence(
            page,
            similarity,
            sttSentence.startTime,
            sttSentence.endTime,
            sttSentence.text,
            sttSentence.audioPath,
            sttSentence.audioSequence,
            sentence.text,
            sentence.geometry,
        ));
    }

    private sortCompleteSentence() {
        this.completeSentences.sort((a, b) => {
            if (a.page !== b.page) {
                return (a.page > b.page) ? 1 : -1;
            }
            return (a.startTime > b.startTime) ? 1 : -1;
        });
    }

    // noinspection JSUnusedLocalSymbols
    private printIncompleteSentence() {
        let unboundCount = 0;

        for (const ocrResult of this.ocrResult) {
            for (const sentence of ocrResult.sentences) {
                if (!sentence.consumed) {
                    unboundCount++;

                    console.log(`sentence: ${sentence.text}, ${sentence.confidence}, ${ocrResult.page}`);
                }
            }
        }
        console.log('complete sentence count: ', unboundCount);
    }

    // noinspection JSUnusedLocalSymbols
    private printCompleteSentence() {
        for (const sentence of this.completeSentences) {
            console.log(sentence.toMinifyString());
        }
        console.log('complete sentence count: ', this.completeSentences.length);
    }

    // noinspection JSUnusedLocalSymbols
    private writeCompleteSentence() {
        const path = `test/output/complete-sentence-${this.bid}.json`;

        fs.writeFileSync(path, JSON.stringify(this.completeSentences));
    }

    // eslint-disable-next-line
    private sendSentenceDatabase() {
        // TODO: Filter sentence which contains 3~12 words. For sentence database.
        // TODO: Filter sentence are perfect matching. For sentence database.
    }

    private async teardown(): Promise<void> {
        // this.printIncompleteSentence();
        // this.printCompleteSentence();
        this.writeCompleteSentence();

        this.sendSentenceDatabase();
    }
}