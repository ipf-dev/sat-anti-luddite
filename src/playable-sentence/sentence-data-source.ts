import log from 'loglevel';

import ElasticSearch from '../common/aws/aws-elastic-search';
import PlayableSentence from './model/playable-sentence';
import PlayableSentenceWithId from './model/playable-sentence-with-id';
import { GetSentenceResponse } from './model/response';
import GetSentenceRequestBuilder from './get-sentence-request-builder';
import UploadSentenceRequestBuilder from './update-sentence-request-builder';

export default class SentenceDataSource {
    private static readonly INDEX: string = 'playable-sentence';
    private readonly es: ElasticSearch;

    constructor() {
        this.es = new ElasticSearch();
    }

    public async get(request: any): Promise<GetSentenceResponse> {
        const body = new GetSentenceRequestBuilder(request).build().toJSON();
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

    public async findDuplicateId(sentence: PlayableSentence): Promise<string | undefined> {
        const body = new GetSentenceRequestBuilder({
            bid: sentence.bid,
            text: sentence.text,
            size: 1,
        }).build().toJSON();
        log.debug('SentenceDataSource.findDuplicateId', JSON.stringify(body));
        const result = await this.es.searchWithBody(SentenceDataSource.INDEX, body);
        const total = result.body.hits.total.value;
        if (total === 0) return undefined;
        // eslint-disable-next-line no-underscore-dangle
        return result.body.hits.hits[0]._id;
    }

    public async upload(sentences: PlayableSentenceWithId[]): Promise<void> {
        const body = new UploadSentenceRequestBuilder(SentenceDataSource.INDEX, sentences).build();
        log.debug('SentenceDataSource.upload', JSON.stringify(body));
        await this.es.bulk(SentenceDataSource.INDEX, body);
    }
}
