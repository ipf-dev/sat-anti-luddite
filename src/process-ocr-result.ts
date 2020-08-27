import { Handler } from 'aws-lambda';
import { ApiResponse } from '@elastic/elasticsearch';
import ElasticSearch from './module/aws-elastic-search';
import OCRResult from './module/ocr-result';

const es = new ElasticSearch();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event, context, callback) => {
    const { id } = event;

    try {
        const resp: ApiResponse = await es.get('ocr-result', id);
        // eslint-disable-next-line no-underscore-dangle
        const ocrResult: OCRResult = new OCRResult(resp.body._source.result);
        ocrResult.findTextElements();
        // TODO textElements 중 paragraph에 대해서만 sentence tokenize
        // TODO ElasticSearch에 결과 저장

        callback(null, {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            event: event,
        });
    } catch (err) {
        console.error('Error processing OCR result', JSON.stringify(err));
        callback(err, { message: 'Error processing OCR result' });
    }
};