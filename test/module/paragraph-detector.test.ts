import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/module/aws-elastic-search-mock';
import ParagraphLineDetector, { ParagraphLines } from '../../src/module/paragraph-line-detector';
import { Block } from '../../src/model/block';
import LineBlock from '../../src/model/line-block';

const es = new ElasticSearchMock();

test('When_ExecuteParagraphLineDetectorOnMerlinP11_Except_ResultToHaveLength8', async () => {
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: 'TPSDM06_11',
    });
    // eslint-disable-next-line no-underscore-dangle
    const lines = resp.body._source.result
        .filter((block: Block) => block.BlockType === 'LINE')
        .map((block: Block) => new LineBlock(block));
    const detector = new ParagraphLineDetector(lines);
    const result: ParagraphLines[] = detector.execute();
    expect(result).toHaveLength(8);
});
