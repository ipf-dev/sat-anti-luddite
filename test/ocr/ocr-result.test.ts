import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearchMock from '../../src/common/aws/aws-elastic-search-mock';
import OCRResult from '../../src/ocr/ocr-result';
import { RawBlock } from '../../src/ocr/raw-block';

const es = new ElasticSearchMock();

test('When_Instantiate_Expect_Success', async () => {
    const documentId = 'TPSDM06_9';
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: documentId,
    });
    // eslint-disable-next-line no-underscore-dangle
    const { bid, page, result } = resp.body._source;
    const ocrResult = new OCRResult({
        bid, page, result, documentId,
    });
    expect(ocrResult).toBeInstanceOf(OCRResult);
});

test('When_InstantiateWithInvalidParam_Expect_ThrowError', async () => {
    function instantiateEmptyOCRResult() {
        const blocks: RawBlock[] = [
            {
                BlockType: 'WORD',
                Confidence: 71.9177017211914,
                Text: 'a',
                Geometry: {
                    BoundingBox: {
                        Width: 0.008509140461683273,
                        Height: 0.01095305010676384,
                        Left: 0.851206362247467,
                        Top: 0.0938008725643158,
                    },
                    Polygon: [
                        { X: 0.851206362247467, Y: 0.0938008725643158 },
                        { X: 0.8597155213356018, Y: 0.0938008725643158 },
                        { X: 0.8597155213356018, Y: 0.10475391894578934 },
                        { X: 0.851206362247467, Y: 0.10475391894578934 },
                    ],
                },
                Id: '592521b8-895a-46d5-a85b-fc49170c9a7a',
            },
        ];
        const param = {
            documentId: 'testDocumentId',
            bid: 'TESTBID',
            page: 4,
            result: blocks,
        };
        // eslint-disable-next-line no-new
        new OCRResult(param);
    }

    expect(instantiateEmptyOCRResult).toThrowError('Invalid argument creating OCRResult object');
});

test('When_findTextElements_Expect_Success', async () => {
    const documentId = 'TPSDM06_11';
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: documentId,
    });
    // eslint-disable-next-line no-underscore-dangle
    const { bid, page, result } = resp.body._source;
    const ocrResult = new OCRResult({
        bid, page, result, documentId,
    });
    ocrResult.filter();
});