import fs from 'fs';

import STTSentence from '../../model/binder/stt-sentence';
import STTResult from '../../model/binder/stt-result';
import OCRSentence from '../../model/binder/ocr-sentence';
import CompleteSentence from '../../model/binder/complete-sentence';
import BinderDataSource from './binder-data-source';
import SequenceGuard from './sequence-guard';

export default class SentenceBinder {
    private static readonly SIMILARITY_THRESHOLD = 0.81;

    private sttResult: STTResult[];
    private sttSentences: STTSentence[];
    private ocrSentences: OCRSentence[];
    private readonly completeSentences: CompleteSentence[];

    public constructor(
        readonly bid: string,
        readonly languageCode: 'en-GB' | 'en-US',
    ) {
        this.sttResult = [];
        this.sttSentences = [];
        this.ocrSentences = [];
        this.completeSentences = [];
    }

    private async setup(): Promise<void> {
        const dataSource = new BinderDataSource();

        await dataSource.load(this.bid, this.languageCode);

        const {
            sttResult,
            sttSentences,
            ocrSentences,
        } = dataSource
            .defragmentation()
            .sort()
            .fetch();

        this.sttResult = sttResult;
        this.sttSentences = sttSentences;
        this.ocrSentences = ocrSentences;
    }

    public async execute(): Promise<void> {
        await this.setup();

        this.findBestMatch();
        this.revokeTangledSequenceSentence();
        this.findSTTSentenceContainOCRSentence();
        this.revokeTangledSequenceSentence();
        this.sortCompleteSentence();

        await this.teardown();
    }

    private findBestMatch() {
        for (const ocrSentence of this.ocrSentences) {
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

                this.appendCompleteSentence(ocrSentence.page, candidateSimilarity, candidate, ocrSentence);
            }
        }
    }

    private findSTTSentenceContainOCRSentence() {
        for (const sttSentence of this.sttSentences) {
            for (const ocrSentence of this.ocrSentences) {
                if (ocrSentence.tokens.length < 3 || ocrSentence.consumed || sttSentence.consumed) continue;

                if (sttSentence.isPartiallyMatched(ocrSentence.textStripped)) {
                    const [matched, remained] = sttSentence.splitMatched(ocrSentence.textStripped, this.sttResult);

                    if (matched) {
                        const similarity = ocrSentence.getSimilarity(matched.textStripped);

                        this.appendCompleteSentence(ocrSentence.page, similarity, matched, ocrSentence);

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

    // private findOCRSentenceContainSTTSentence() {
    //     for (const ocrPageResult of this.ocrResult) {
    //         for (const ocrSentence of ocrPageResult.sentences) {
    //             for (const sttSentence of this.sttSentences) {
    //                 if (ocrSentence.tokens.length < 3 || ocrSentence.consumed || sttSentence.consumed) continue;
    //
    //                 if (sttSentence.isPartiallyMatched(ocrSentence.textStripped)) {
    //                     const [matched, remained] = sttSentence.splitMatched(ocrSentence.textStripped, this.sttResult);
    //
    //                     if (matched) {
    //                         const similarity = ocrSentence.getSimilarity(matched.textStripped);
    //
    //                         this.appendCompleteSentence(ocrPageResult.page, similarity, matched, ocrSentence);
    //
    //                         ocrSentence.consumed = true;
    //                         sttSentence.consumed = true;
    //                         matched.consumed = true;
    //                     }
    //                     if (remained) {
    //                         this.findRemainMatch(remained);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    private findRemainMatch(remain: STTSentence) {
        for (const ocrSentence of this.ocrSentences) {
            const similarity = ocrSentence.getSimilarity(remain.textStripped);

            if (similarity > SentenceBinder.SIMILARITY_THRESHOLD) {
                this.appendCompleteSentence(ocrSentence.page, similarity, remain, ocrSentence);

                ocrSentence.consumed = true;
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
        for (const ocrSentence of this.ocrSentences) {
            if (ocrSentence.page === sentence.page && ocrSentence.text === sentence.sentence) {
                ocrSentence.consumed = false;
                break;
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

    private filterIncompleteVerbalSentences(): STTSentence[] {
        const incompleteSentences: STTSentence[] = [];
        const { audioSequence, startTime } = this.completeSentences[0];

        for (const sentence of this.sttSentences) {
            if (sentence.consumed
                || sentence.isPrevious(audioSequence, startTime)
                || sentence.textStripped.split(' ').length < 2) continue;

            incompleteSentences.push(sentence);
        }
        return incompleteSentences;
    }

    // noinspection JSUnusedLocalSymbols
    private printIncompleteSentence() {
        const sentences = this.filterIncompleteVerbalSentences();

        console.log('incomplete sentence count: ', sentences.length);
    }

    // noinspection JSUnusedLocalSymbols
    private printCompleteSentence() {
        // for (const sentence of this.completeSentences) {
        //     console.log(sentence.toMinifyString());
        // }
        console.log('complete sentence count: ', this.completeSentences.length);
    }

    private writeInCompleteSentence() {
        fs.writeFileSync(
            `test/output/report/incomplete-stt-sentence-${this.bid}.json`,
            JSON.stringify(this.filterIncompleteVerbalSentences()),
        );
    }

    // noinspection JSUnusedLocalSymbols
    private writeCompleteSentence() {
        fs.writeFileSync(
            `test/output/report/complete-sentence-${this.bid}.json`,
            JSON.stringify(this.completeSentences),
        );
    }

    // eslint-disable-next-line
    private sendSentenceDatabase() {
        // TODO: Filter sentence which contains 3~12 words. For sentence database.
        // TODO: Filter sentence are perfect matching. For sentence database.
    }

    private async teardown(): Promise<void> {
        this.printIncompleteSentence();
        this.printCompleteSentence();
        this.writeInCompleteSentence();
        this.writeCompleteSentence();

        this.sendSentenceDatabase();
    }
}