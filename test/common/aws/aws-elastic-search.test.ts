import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearch from '../../../src/common/aws/aws-elastic-search';

test('When_DeleteByBid_Expect_Http200', async () => {
    const es = new ElasticSearch();
    const response: ApiResponse = await es.delete({
        index: 'stt-sentence',
        query: {
            match: {
                bid: 'NONEXISTBID',
            },
        },
    });

    expect(response.statusCode).toBe(200);
});

test('When_SearchWithBody_Expect_HaveTotal', async () => {
    const es = new ElasticSearch();
    const body = {
        query: {
            match_all: {},
        },
        size: 5,
    };
    const response: ApiResponse = await es.searchWithBody('playable-sentence', body);

    expect(response.statusCode).toBe(200);
    expect(response.body.hits.total.value).toBeGreaterThanOrEqual(0);
    expect(response.body.hits.hits).toEqual(
        expect.arrayContaining([]),
    );
});

test('When_BulkDelete_Expect_NoErrors', async () => {
    const es = new ElasticSearch();
    const body = [
        { delete: { _index: 'playable-sentence', _id: 'non-exist-document-1' } },
        { delete: { _index: 'playable-sentence', _id: 'non-exist-document-2' } },
        { delete: { _index: 'playable-sentence', _id: 'non-exist-document-3' } },
    ];
    const result = await es.bulk('playable-sentence', body);

    expect(result.errors).toBeFalsy();
});
