import { STTSentence } from '../model/stt-sentence';
import { STTResult } from '../model/stt-result';
import { OCRResult } from '../model/ocr-result';
import { OCRSentence } from '../model/ocr-sentence';
import BoxyPlaySentence from '../model/boxy-play-sentence';
import BinderDataSource from './binder-data-source';
import SentenceAnalyzer from './sentence-analyzer';

/* eslint-disable no-underscore-dangle */
export default class SentenceBinder {
    private static readonly SIMILARITY_THRESHOLD = 0.81;

    private ocrResult: OCRResult[];
    private sttResult: STTResult[];
    private sttSentences: STTSentence[];
    private readonly boxyPlaySentences: BoxyPlaySentence[];

    public constructor(
        readonly bid: string,
        readonly languageCode: 'en-GB' | 'en-US',
        readonly startPage: number,
        readonly endPage: number,
    ) {
        this.ocrResult = [];
        this.sttResult = [];
        this.sttSentences = [];
        this.boxyPlaySentences = [];
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

        this.bindPages();

        // TODO: Filter sentence which contains 3~12 words. For sentence database.
        // TODO: Filter sentence are perfect matching. For sentence database.

        await this.teardown();
    }

    private bindPages() {
        if (this.ocrResult == null || this.sttSentences == null) return;

        for (const ocrPageResult of this.ocrResult) {
            this.findBestMatch(ocrPageResult);
            this.findSTTConcatenated(ocrPageResult);
        }
    }

    private findBestMatch(ocrPage: OCRResult) {
        for (const ocrSentence of ocrPage.sentences) {
            let candidate: STTSentence | null = null;
            let maxSimilarity = 0;

            for (const sttSentence of this.sttSentences) {
                if (ocrSentence.consumed || sttSentence.consumed) continue;

                const similarity = SentenceAnalyzer.getSimilarity(sttSentence.textStripped, ocrSentence.textStripped);

                if (similarity > SentenceBinder.SIMILARITY_THRESHOLD && similarity > maxSimilarity) {
                    candidate = sttSentence;
                    maxSimilarity = similarity;
                }
            }

            if (candidate && maxSimilarity > 0) {
                candidate.consumed = true;
                ocrSentence.consumed = true;

                this.appendBoundSentence(ocrPage.page, candidate, ocrSentence);
            }
        }
    }

    private findSTTConcatenated(ocrPage: OCRResult) {
        for (const ocrSentence of ocrPage.sentences) {
            for (const sttSentence of this.sttSentences) {
                if (ocrSentence.consumed || sttSentence.consumed) continue;

                if (SentenceAnalyzer.isSTTConcatenated(sttSentence.textStripped, ocrSentence.textStripped)) {
                    ocrSentence.consumed = true;

                    // TODO: STT Sentence 에서 OCR Sentence 에 해당하는 부분 추출
                    // TODO: 추출된 부분의 시작시간과 종료시간 계산 (stt-result 활용)

                    // this.appendBoundSentence(ocrPage.page, candidate.startTime, candidate.endTime, ocrSentence);
                }
            }
        }
    }

    private appendBoundSentence(page: number, sttSentence: STTSentence, sentence: OCRSentence) {
        this.boxyPlaySentences.push(new BoxyPlaySentence(
            page,
            sttSentence.startTime,
            sttSentence.endTime,
            sttSentence.text,
            sentence,
        ));
    }

    /* eslint-disable array-callback-return */
    private printUnboundSentence() {
        let unboundCount = 0;

        for (const ocrResult of this.ocrResult) {
            ocrResult.sentences.map((sentence) => {
                if (!sentence.consumed) {
                    // console.log('sentence: ', ocrResult.page, ' , ', sentence.text, ' , ', sentence.textStripped);
                    unboundCount++;
                }
            });
        }
        console.log('unbound count: ', unboundCount);
    }

    private printBoxyPlaySentence() {
        for (const boxyPlaySentence of this.boxyPlaySentences) {
            console.log('boxyPlaySentence: ', boxyPlaySentence.page, ', ', boxyPlaySentence.sentence, ', ', boxyPlaySentence.sttSentence);
        }
        console.log('bound count: ', this.boxyPlaySentences.length);
    }

    private async teardown(): Promise<void> {
        // Logs
        // this.printUnboundSentence();
        this.printBoxyPlaySentence();
    }
}