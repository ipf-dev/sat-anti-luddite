import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/common/aws/aws-elastic-search-mock';
import Paragraph from '../../src/ocr/paragraph';
import { RawBlock } from '../../src/ocr/raw-block';
import LineBlock from '../../src/ocr/line-block';
import WordBlock from '../../src/ocr/word-block';
import ParagraphDetector from '../../src/ocr/paragraph-detector';

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
