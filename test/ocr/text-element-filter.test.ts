import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/common/aws/aws-elastic-search-mock';
import { RawBlock } from '../../src/ocr/model/raw-block';
import LineBlock from '../../src/ocr/model/line-block';
import WordBlock from '../../src/ocr/model/word-block';
import TextElementFilter from '../../src/ocr/text-element-filter';

const es = new ElasticSearchMock();

test('When_ExecuteTextElementFilterOnMerlinP11_Except_Success', async () => {
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
    const filter = new TextElementFilter(lines, words);
    filter.execute();
    const textElements = filter.getResult();
    expect(textElements.indicators.lines).toHaveLength(3);
    expect(textElements.indicators.words).toHaveLength(7);
    expect(textElements.negligibles.lines).toHaveLength(19);
    expect(textElements.negligibles.words).toHaveLength(48);
    expect(textElements.paragraphs).toHaveLength(2);
    expect(textElements.singleLines.lines).toHaveLength(0);
    expect(textElements.singleLines.words).toHaveLength(0);
});