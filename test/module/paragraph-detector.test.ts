import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/module/aws-elastic-search-mock';
import ParagraphLineDetector, { ParagraphLines } from '../../src/module/paragraph-line-detector';
import { RawBlock } from '../../src/model/raw-block';
import LineBlock from '../../src/model/line-block';

const es = new ElasticSearchMock();

test('When_ExecuteParagraphLineDetectorOnMerlinP11_Except_ResultToHaveLength4', async () => {
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: 'TPSDM06_11',
    });
    // eslint-disable-next-line no-underscore-dangle
    const lines = resp.body._source.result
        .filter((block: RawBlock) => block.BlockType === 'LINE')
        .map((block: RawBlock) => new LineBlock(block));
    const detector = new ParagraphLineDetector(lines);
    const result: ParagraphLines[] = detector.execute();
    expect(result).toHaveLength(4);
});
