import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/module/aws-elastic-search-mock';
import ParagraphDetector from '../../src/module/paragraph-detector';
import { Block } from '../../src/model/block';
import LineBlock from '../../src/model/line-block';
import { Paragraph } from '../../src/model/text-elements';

const es = new ElasticSearchMock();

test('When_ExecuteParagraphDetector_Except_Success', async () => {
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: 'TPSDM06_11',
    });
    // eslint-disable-next-line no-underscore-dangle
    const lines = resp.body._source.result
        .filter((block: Block) => block.BlockType === 'LINE')
        .map((block: Block) => new LineBlock(block));
    const detector = new ParagraphDetector(lines);
    const result: Paragraph[] = detector.execute();
});
