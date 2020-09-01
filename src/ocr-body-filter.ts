import { Handler } from 'aws-lambda';
import { ApiResponse } from '@elastic/elasticsearch';

import { TextElements } from './model/text-elements';
import ElasticSearch from './module/aws-elastic-search';
import SNS from './module/aws-sns';
import OCRResult from './module/ocr-result';

const es = new ElasticSearch();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event, context, callback) => {
    const { documentId } = event;

    try {
        const resp: ApiResponse = await es.get({
            index: 'ocr-result',
            id: documentId,
        });
        // eslint-disable-next-line no-underscore-dangle
        const { bid, page, result: ocr } = resp.body._source;
        const ocrResult: OCRResult = new OCRResult(ocr);
        const textElements: TextElements = ocrResult.findTextElements();
        const result = {
            bid: bid,
            page: page,
            result: textElements,
        };
        await publishResultToSNS(result);

        callback(null, result);
    } catch (err) {
        console.error('Error processing OCR result', JSON.stringify(err));
        callback(err, { message: 'Error processing OCR result' });
    }
};

async function publishResultToSNS(result: any) {
    const snsTopicArn = process.env.SNS_OCR_SENT_TOKENIZER;
    const sns = new SNS();
    if (typeof snsTopicArn === 'undefined') return;
    await sns.publish({
        message: result,
        arn: snsTopicArn,
    });
}