import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearch from './aws-elastic-search';
import { STTSentence } from '../model/stt-sentence';
import { STTResult } from '../model/stt-result';
import { OCRResult } from '../model/ocr-result';
import StringUtil from '../util/string-util';
import { OCRSentence } from '../model/ocr-sentence';
import SentenceAnalyzer from './sentence-analyzer';

/* eslint-disable no-underscore-dangle, no-param-reassign, arrow-body-style, array-callback-return, no-plusplus, space-infix-ops */
// noinspection SpellCheckingInspection
export default class BinderDataSource {
    private static readonly MAX_SEARCH_RESULT = 200;
    private static readonly REMOVE_MULTIPLE_SPACING = /\s\s+/g;

    private ocrResult: OCRResult[];
    private sttResult: STTResult[];
    private sttSentences: STTSentence[];

    constructor() {
        this.ocrResult = [];
        this.sttResult = [];
        this.sttSentences = [];
    }

    public async load(bid: string, languageCode: 'en-GB' | 'en-US') {
        this.ocrResult = await BinderDataSource.getOCRResult(bid);
        this.sttResult = await BinderDataSource.getSTTResult(bid, languageCode);
        this.sttSentences = await BinderDataSource.getSTTSentence(bid, languageCode);
    }

    public fetch() {
        return {
            ocrResult: this.ocrResult,
            sttResult: this.sttResult,
            sttSentences: this.sttSentences,
        };
    }

    public filterNoise(): this {
        this.ocrResult.map((ocrResult) => {
            ocrResult.sentences = ocrResult.sentences.filter((sentence) => {
                const text = StringUtil.stripSpecialCharacter(sentence.text);

                return text.trim().length > 2;
            });
        });

        this.sttResult = this.sttResult.filter((result) => {
            return result.start_time && result.end_time;
        });

        this.sttResult = this.sttResult.filter((result) => {
            return result.start_time && result.end_time;
        });

        this.sttSentences = this.sttSentences.filter((sentence) => {
            return sentence.startTime && sentence.endTime;
        });

        return this;
    }

    // Some numeric data are stored in a string format.
    public typeForce(): this {
        this.sttResult.map((result) => {
            result.start_time = Number(result.start_time);
            result.end_time = Number(result.end_time);

            result.alternatives.map((alternative) => {
                alternative.confidence = Number(alternative.confidence);
                return alternative;
            });
            return result;
        });

        this.sttSentences.map((sentence) => {
            sentence.startTime = Number(sentence.startTime);
            sentence.endTime = Number(sentence.endTime);
            sentence.confidence = Number(sentence.confidence);
            return sentence;
        });

        return this;
    }

    // Since the OCR & STT Binding are based on the string comparison.
    // The target string must be normalized in advance to improve the result.
    public normalizeText(): this {
        this.ocrResult.map((result) => {
            for (const sentence of result.sentences) {
                sentence.textStripped = StringUtil.stripSpecialCharacter(sentence.text)
                    .toLowerCase()
                    .replace(BinderDataSource.REMOVE_MULTIPLE_SPACING, ' ')
                    .trim();
            }
        });

        this.sttResult.map((result) => {
            for (const alternative of result.alternatives) {
                alternative.contentStripped = StringUtil.stripSpecialCharacter(alternative.content)
                    .toLowerCase()
                    .replace(BinderDataSource.REMOVE_MULTIPLE_SPACING, ' ')
                    .trim();
            }
        });

        this.sttSentences.map((sentence) => {
            sentence.textStripped = StringUtil.stripSpecialCharacter(sentence.text)
                .toLowerCase()
                .replace(BinderDataSource.REMOVE_MULTIPLE_SPACING, ' ')
                .trim();
        });

        return this;
    }

    // While tokenizing sentence, some verbal text are split to multiple sentences.
    // e.g. "Oh no!", said Chip. > ["Oh no!", said Chip.]
    public defragmentation(): this {
        this.ocrResult?.map((ocrData) => {
            const lastIndex = ocrData.sentences.length - 1;

            for (let i=0; i<lastIndex; i++) {
                if (SentenceAnalyzer.shouldConcatenate(ocrData.sentences[i], ocrData.sentences[i+1])) {
                    ocrData.sentences[i] = BinderDataSource.combineSentence(ocrData.sentences[i], ocrData.sentences[i+1]);
                    ocrData.sentences[i+1].consumed = true;
                }
            }
        });

        return this;
    }

    public sort(): this {
        this.ocrResult?.sort((a: OCRResult, b: OCRResult) => (a.page > b.page ? 1 : -1));
        this.sttResult?.sort((a, b) => (a.start_time > b.start_time ? 1 : -1));
        this.sttSentences?.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

        return this;
    }

    private static async getOCRResult(bid: string): Promise<OCRResult[]> {
        const result: OCRResult[] = [];
        const es = new ElasticSearch();
        const response: ApiResponse = await es.search({
            index: 'ocr-sentence',
            query: {
                match: { bid },
            },
            size: BinderDataSource.MAX_SEARCH_RESULT,
        });

        if (response.statusCode === 200 && response.body?.hits?.hits?.length > 0) {
            for (const doc of response.body.hits.hits) {
                result.push({
                    page: doc._source.page,
                    sentences: doc._source.result,
                });
            }
        }
        return result;
    }

    private static async getSTTResult(bid: string, languageCode: 'en-GB' | 'en-US'): Promise<STTResult[]> {
        const result: STTResult[] = [];
        const es = new ElasticSearch();
        const response: ApiResponse = await es.search({
            index: 'stt-result',
            query: {
                bool: {
                    must: [
                        { match: { bid } },
                        { match: { languageCode } },
                    ],
                },
            },
            size: BinderDataSource.MAX_SEARCH_RESULT,
        });

        if (response.statusCode === 200 && response.body?.hits?.hits?.length > 0) {
            for (const doc of response.body.hits.hits) {
                result.push(...doc._source.result.items);
            }
        }
        return result;
    }

    private static async getSTTSentence(bid: string, languageCode: 'en-GB' | 'en-US'): Promise<STTSentence[]> {
        const sentences: STTSentence[] = [];
        const es = new ElasticSearch();
        const response: ApiResponse = await es.search({
            index: 'stt-sentence',
            query: {
                bool: {
                    must: [
                        { match: { bid } },
                        { match: { languageCode } },
                    ],
                },
            },
            size: BinderDataSource.MAX_SEARCH_RESULT,
        });

        if (response.statusCode === 200 && response.body?.hits?.hits?.length > 0) {
            for (const doc of response.body.hits.hits) {
                sentences.push(...doc._source.result);
            }
        }
        return sentences;
    }

    private static combineSentence(before: OCRSentence, after: OCRSentence): OCRSentence {
        return {
            consumed: false,
            text: `${before.text} ${after.text}`,
            textStripped: `${before.textStripped} ${after.textStripped}`,
            confidence: (before.confidence + after.confidence) / 2,
            geometry: [
                ...before.geometry,
                ...after.geometry,
            ],
        };
    }
}