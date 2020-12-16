import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearch from '../../../src/common/aws/aws-elastic-search';

test('When_Delete_Document_From_ES_With_QueryDSL', async () => {
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