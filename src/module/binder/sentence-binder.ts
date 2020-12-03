import fs from 'fs';
import log from 'loglevel';

import { Language } from '../../model/language';
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
        readonly language: Language,
    ) {
        this.sttResult = [];
        this.sttSentences = [];
        this.ocrSentences = [];
        this.completeSentences = [];
    }

    private async setup(): Promise<void> {
        const dataSource = new BinderDataSource(this.language);

        await dataSource.load(this.bid);

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

        this.findOCRPartiallyIncludedInSTT();
        this.revokeTangledSequenceSentence();

        this.sortCompleteSentence();

        await this.teardown();
    }

    private findBestMatch() {
        for (const ocrSentence of this.ocrSentences) {
            const candidate = this.findBestMatchedSTT(ocrSentence);

            if (candidate) {
                candidate.consumed = true;
                ocrSentence.consumed = true;

                this.appendCompleteSentence(ocrSentence.page, candidate, ocrSentence);
            }
        }
    }

    private findBestMatchedSTT(ocrSentence: OCRSentence): STTSentence | null {
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
        return candidate;
    }

    private findOCRPartiallyIncludedInSTT() {
        for (const sttSentence of this.sttSentences) {
            for (const ocrSentence of this.ocrSentences) {
                if (ocrSentence.tokens.length < 3 || ocrSentence.consumed || sttSentence.consumed) continue;

                if (sttSentence.isPartiallyMatched(ocrSentence.textStripped)) {
                    const [matched, remained] = sttSentence.splitMatched(ocrSentence.textStripped, this.sttResult);

                    if (matched) {
                        this.appendCompleteSentence(ocrSentence.page, matched, ocrSentence);

                        ocrSentence.consumed = true;
                        sttSentence.consumed = true;
                    }
                    if (remained) {
                        this.findRemainMatch(remained);
                    }
                }
            }
        }
    }

    private findRemainMatch(remain: STTSentence) {
        for (const ocrSentence of this.ocrSentences) {
            const similarity = ocrSentence.getSimilarity(remain.textStripped);

            if (similarity > SentenceBinder.SIMILARITY_THRESHOLD) {
                ocrSentence.consumed = true;

                this.appendCompleteSentence(ocrSentence.page, remain, ocrSentence);
            }
        }
    }

    private revokeTangledSequenceSentence() {
        const sequenceGuard = new SequenceGuard(this.completeSentences);
        const tangledFiltered: CompleteSentence[] = sequenceGuard.getFilteredSentence();

        for (const tangledSentence of tangledFiltered) {
            const index = this.completeSentences.indexOf(tangledSentence);

            if (index >= 0 && index < this.completeSentences.length) {
                this.completeSentences.splice(index, 1);
            }
            this.revokeConsumeFlag(tangledSentence);
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

    private appendCompleteSentence(page: number, sttSentence: STTSentence, ocrSentence: OCRSentence) {
        const sentence = new CompleteSentence(
            page,
            this.language,
            sttSentence.startTime,
            sttSentence.endTime,
            sttSentence.text,
            sttSentence.audioSequence,
            ocrSentence.text,
            ocrSentence.geometry,
        );

        this.completeSentences.push(sentence);
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

    public getCompleteSentences(): CompleteSentence[] {
        return this.completeSentences;
    }

    private printIncompleteSentence() {
        const sentences = this.filterIncompleteVerbalSentences();

        log.info('incomplete sentence count: ', sentences.length);
    }

    private printCompleteSentence() {
        // for (const sentence of this.completeSentences) {
        //     console.log(sentence.toMinifyString());
        // }
        log.info('complete sentence count: ', this.completeSentences.length);
    }

    private writeInCompleteSentence() {
        fs.writeFileSync(
            `test/output/report/incomplete-stt-sentence-${this.bid}.json`,
            JSON.stringify(this.filterIncompleteVerbalSentences()),
        );
    }

    private writeCompleteSentence() {
        fs.writeFileSync(
            `test/output/report/complete-sentence-${this.bid}.json`,
            JSON.stringify(this.completeSentences),
        );
    }

    private async teardown(): Promise<void> {
        this.printIncompleteSentence();
        this.printCompleteSentence();
        this.writeInCompleteSentence();
        this.writeCompleteSentence();
    }
}