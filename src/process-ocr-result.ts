import { ElasticSearch } from './module/aws/elastic-search';
import { Handler } from 'aws-lambda'
import { ApiResponse } from '@elastic/elasticsearch';
import { OCRResult } from './module/ocr-result';

const es = new ElasticSearch();

export const handler: Handler = async (event, context, callback) => {
    const id = event.id;

    try {
        const ocrResult: OCRResult = await getOCRResult(id);
        ocrResult.classify();
        // TODO textElements 중 body에 대해서만 sentence tokenize
        // TODO ElasticSearch에 결과 저장
        callback(null, {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            event,
            ocrResult
        });
    } catch (err) {
        console.error('Error processing OCR result', JSON.stringify(err));
        callback(err, { message: 'Error processing OCR result' });  
    }
};

export async function getOCRResult(id: string): Promise<OCRResult> {
    const resp: ApiResponse = await es.get('ocr-result', id);
    return new OCRResult(resp.body._source.result);
}
