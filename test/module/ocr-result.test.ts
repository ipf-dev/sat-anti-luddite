import { ApiResponse } from '@elastic/elasticsearch';
import OCRResult from '../../src/module/ocr-result';
import ElasticSearchMock from '../../src/module/aws/elastic-search-mock';

const es = new ElasticSearchMock();

test('getOCRResult', async () => {
    const bid = 'TPSDM06';
    const page = '9';
    const id = `${bid}_${page}`;
    const resp: ApiResponse = await es.get('ocr-result', id);
    // eslint-disable-next-line no-underscore-dangle
    const ocrResult = new OCRResult(resp.body._source.result);
    expect(ocrResult).toBeInstanceOf(OCRResult);
});

test('emptyOCRResult', async () => {
    function createEmptyOCRResult() {
        const param = [
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
        new OCRResult(param);
    }

    expect(createEmptyOCRResult).toThrowError('OCR Result is empty');
});

test('findIndicator', async () => {
    const bid = 'TPSDM06';
    const page = '11';
    const id = `${bid}_${page}`;
    const resp: ApiResponse = await es.get('ocr-result', id);
    // eslint-disable-next-line no-underscore-dangle
    const ocrResult = new OCRResult(resp.body._source.result);
    ocrResult.classifyTextElements();
    const indicators = ocrResult.getIndicators();
    expect(indicators[0]).toHaveProperty('Id', 'a6c5bc69-1948-407b-9998-e237960d7856');
    expect(indicators[1]).toHaveProperty('Id', 'e5b2e341-1c96-4cfc-a58d-58491c86f47e');
    expect(indicators[2]).toHaveProperty('Id', 'e8f4a4a9-9135-479d-a0e5-22fc8dad2837');
});
