import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearch from '../aws-elastic-search';
import STTSentence from '../../model/binder/stt-sentence';
import STTResult from '../../model/binder/stt-result';
import OCRPageResult from '../../model/binder/ocr-page-result';

/* eslint-disable no-param-reassign, no-underscore-dangle */
export default class BinderDataSource {
    private static readonly MAX_SEARCH_RESULT = 200;

    private ocrResult: OCRPageResult[];
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

    public sort(): this {
        this.ocrResult?.sort((a: OCRPageResult, b: OCRPageResult) => (a.page > b.page ? 1 : -1));
        this.sttResult?.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
        this.sttSentences?.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

        return this;
    }

    private static async getOCRResult(bid: string): Promise<OCRPageResult[]> {
        const result: OCRPageResult[] = [];
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
                result.push(new OCRPageResult(
                    doc._source.page,
                    doc._source.result,
                ));
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