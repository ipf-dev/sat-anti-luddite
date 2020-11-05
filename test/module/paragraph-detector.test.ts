import { ApiResponse } from '@elastic/elasticsearch';
import Paragraph from '../../src/model/paragraph';
import { RawBlock } from '../../src/model/raw-block';
import LineBlock from '../../src/model/line-block';
import WordBlock from '../../src/model/word-block';
import ElasticSearchMock from '../../src/module/aws-elastic-search-mock';
import ParagraphDetector from '../../src/module/paragraph-detector';

const es = new ElasticSearchMock();

test('When_ExecuteParagraphLineDetectorOnMerlinP11_Except_ResultToHaveLength4', async () => {
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: 'TPSDM06_11',
    });
    // eslint-disable-next-line no-underscore-dangle
    const words = resp.body._source.result
        .filter((block: RawBlock) => block.BlockType === 'WORD')
        .map((block: RawBlock) => new WordBlock(block));
    // eslint-disable-next-line no-underscore-dangle
    const lines = resp.body._source.result
        .filter((block: RawBlock) => block.BlockType === 'LINE')
        .map((block: RawBlock) => new LineBlock(block, words));
    const detector = new ParagraphDetector(lines, words);
    detector.execute();
    const result: Paragraph[] = detector.getResult();
    expect(result).toHaveLength(4);
});
