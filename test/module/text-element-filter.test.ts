import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/module/aws-elastic-search-mock';
import TextElementFilter from '../../src/module/text-element-filter';
import { Block } from '../../src/model/block';
import LineBlock from '../../src/model/line-block';
import WordBlock from '../../src/model/work-block';

const es = new ElasticSearchMock();

test('When_ExecuteTextElementFilterOnMerlinP11_Except_Success', async () => {
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: 'TPSDM06_11',
    });
    // eslint-disable-next-line no-underscore-dangle
    const lines = resp.body._source.result
        .filter((block: Block) => block.BlockType === 'LINE')
        .map((block: Block) => new LineBlock(block));
    // eslint-disable-next-line no-underscore-dangle
    const words = resp.body._source.result
        .filter((block: Block) => block.BlockType === 'WORD')
        .map((block: Block) => new WordBlock(block));
    const filter = new TextElementFilter(lines, words);
    const textElements = filter.execute();
    expect(textElements.indicators.lines).toHaveLength(3);
    expect(textElements.indicators.words).toHaveLength(7);
    expect(textElements.negligibles.lines).toHaveLength(19);
    expect(textElements.negligibles.words).toHaveLength(48);
    expect(textElements.paragraphs).toHaveLength(4);
    expect(textElements.singleLines.lines).toHaveLength(0);
    expect(textElements.singleLines.words).toHaveLength(0);
});