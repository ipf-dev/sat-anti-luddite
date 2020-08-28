import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/module/aws-elastic-search-mock';
import TextElementDetector from '../../src/module/text-element-detector';
import { Block } from '../../src/model/block';
import LineBlock from '../../src/model/line-block';

const es = new ElasticSearchMock();

test('TODO', async () => {
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: 'TPSDM06_11',
    });
    // eslint-disable-next-line no-underscore-dangle
    const lines = resp.body._source.result
        .filter((block: Block) => block.BlockType === 'LINE')
        .map((block: Block) => new LineBlock(block));
    const detector = new TextElementDetector(lines, 2);
    detector.execute();
});