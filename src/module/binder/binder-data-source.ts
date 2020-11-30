import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearch from '../aws-elastic-search';
import STTSentence from '../../model/binder/stt-sentence';
import STTResult from '../../model/binder/stt-result';
import OCRSentence from '../../model/binder/ocr-sentence';

/* eslint-disable no-param-reassign, no-underscore-dangle */
export default class BinderDataSource {
    private static readonly MAX_SEARCH_RESULT = 200;

    private sttResult: STTResult[];
    private sttSentences: STTSentence[];
    private ocrSentences: OCRSentence[];

    constructor() {
        this.sttResult = [];
        this.sttSentences = [];
        this.ocrSentences = [];
    }

    public async load(bid: string, languageCode: 'en-GB' | 'en-US') {
        this.sttResult = await BinderDataSource.getSTTResult(bid, languageCode);
        this.sttSentences = await BinderDataSource.getSTTSentence(bid, languageCode);
        this.ocrSentences = await BinderDataSource.getOCRSentence(bid);
    }

    public fetch() {
        return {
            sttResult: this.sttResult,
            sttSentences: this.sttSentences,
            ocrSentences: this.ocrSentences,
        };
    }

    public sort(): this {
        this.ocrSentences?.sort((a: OCRSentence, b: OCRSentence) => (a.page > b.page ? 1 : -1));

        this.sttResult?.sort((a, b) => {
            if (a.audioSequence === b.audioSequence) {
                return a.startTime > b.startTime ? 1 : -1;
            }
            return a.audioSequence > b.audioSequence ? 1 : -1;
        });

        this.sttSentences?.sort((a, b) => {
            if (a.audioSequence === b.audioSequence) {
                return a.startTime > b.startTime ? 1 : -1;
            }
            return a.audioSequence > b.audioSequence ? 1 : -1;
        });

        return this;
    }

    // While tokenizing sentence, some verbal text are split to multiple sentences.
    // e.g. "Oh no!", said Chip. > ["Oh no!", said Chip.]
    public defragmentation(): this {
        const lastIndex = this.ocrSentences.length - 1;

        for (let i = 0; i < lastIndex; i++) {
            if (this.ocrSentences[i].shouldConcatenate(this.ocrSentences[i + 1])) {
                this.ocrSentences[i].concatenate(this.ocrSentences[i + 1]);
                this.ocrSentences[i + 1].consumed = true;
            }
        }
        return this;
    }

    private static async getOCRSentence(bid: string): Promise<OCRSentence[]> {
        const sentences: OCRSentence[] = [];
        const es = new ElasticSearch();
        const response: ApiResponse = await es.search({
            index: 'ocr-sentence',
            query: {
                match: { bid },
            },
            sort: ['page'],
            size: BinderDataSource.MAX_SEARCH_RESULT,
        });

        if (response.statusCode === 200 && response.body?.hits?.hits?.length > 0) {
            for (const doc of response.body.hits.hits) {
                const page = doc._source.page;

                for (const sentence of doc._source.result) {
                    sentences.push(new OCRSentence(page, sentence));
                }
            }
        }
        return sentences;
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
                        {
                            match: {
                                languageCode: {
                                    query: languageCode,
                                    operator: 'and',
                                },
                            },
                        },
                    ],
                },
            },
            sort: ['sequence'],
            size: BinderDataSource.MAX_SEARCH_RESULT,
        });

        if (response.statusCode === 200 && response.body?.hits?.hits?.length > 0) {
            for (const doc of response.body.hits.hits) {
                for (const item of doc._source.result.items) {
                    if (item.start_time && item.end_time) {
                        result.push(new STTResult(item, doc._source.sequence));
                    }
                }
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
                        {
                            match: {
                                languageCode: {
                                    query: languageCode,
                                    operator: 'and',
                                },
                            },
                        },
                    ],
                },
            },
            sort: ['sequence'],
            size: BinderDataSource.MAX_SEARCH_RESULT,
        });

        if (response.statusCode === 200 && response.body?.hits?.hits?.length > 0) {
            for (const doc of response.body.hits.hits) {
                for (const sentence of doc._source.result) {
                    if (sentence.startTime && sentence.endTime) {
                        sentences.push(new STTSentence(
                            sentence,
                            `source/${doc._id}.mp3`,
                            doc._source.sequence,
                        ));
                    }
                }
            }
        }
        return sentences;
    }
}