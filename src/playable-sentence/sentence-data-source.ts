import log from 'loglevel';

import ElasticSearch from '../common/aws/aws-elastic-search';
import PlayableSentence from './model/playable-sentence';
import PlayableSentenceWithId from './model/playable-sentence-with-id';
import { GetSentenceRequest } from './model/request';
import { GetSentenceResponse } from './model/response';
import GetSentenceEsRequestBody from './get-sentence-es-request-body';
import AddSentenceESRequestBody from './add-sentence-es-request-body';

export default class SentenceDataSource {
    private static readonly INDEX: string = 'playable-sentence';
    private readonly es: ElasticSearch;

    constructor() {
        this.es = new ElasticSearch();
    }

    public async get(request: GetSentenceRequest): Promise<GetSentenceResponse> {
        const body = GetSentenceEsRequestBody.generate(request);
        log.debug('SentenceDataSource.get', JSON.stringify(body));
        const result = await this.es.searchWithBody(SentenceDataSource.INDEX, body);

        const sentence: PlayableSentence[] = result.body.hits.hits
        // eslint-disable-next-line no-underscore-dangle
            .map((hit: any) => PlayableSentence.build(hit._source));
        const total = result.body.hits.total.value;
        return {
            total, sentence,
        };
    }

    public async findDuplicateId(sentence: PlayableSentence): Promise<string | null> {
        const body = GetSentenceEsRequestBody.generate({
            bid: sentence.bid,
            text: sentence.text,
            size: 1,
        });
        log.debug('SentenceDataSource.findDuplicateId', JSON.stringify(body));
        const result = await this.es.searchWithBody(SentenceDataSource.INDEX, body);
        const total = result.body.hits.total.value;
        if (total === 0) return null;
        // eslint-disable-next-line no-underscore-dangle
        return result.body.hits.hits[0]._id;
    }

    public async add(sentences: PlayableSentenceWithId[]): Promise<void> {
        const body = AddSentenceESRequestBody.generate(SentenceDataSource.INDEX, sentences);
        log.debug('SentenceDataSource.upload', JSON.stringify(body));
        await this.es.bulk(SentenceDataSource.INDEX, body);
    }
}
