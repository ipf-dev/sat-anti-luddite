import { Handler } from 'aws-lambda';
import { SNSEvent } from 'aws-lambda/trigger/sns';
import { ApiResponse } from '@elastic/elasticsearch';

import { TextElements } from './model/text-elements';
import ElasticSearch from './module/aws-elastic-search';
import SNS from './module/aws-sns';
import OCRResult from './module/ocr-result';

const es = new ElasticSearch();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event: SNSEvent, context, callback) => {
    const records = event.Records;
    const snsPromises = records.map(async (record) => {
        const msg = record.Sns.Message;
        const { documentId } = JSON.parse(msg);
        const resp: ApiResponse = await es.get({
            index: 'ocr-result',
            id: documentId,
        });
        // eslint-disable-next-line no-underscore-dangle
        const { bid, page, result: ocr } = resp.body._source;
        const ocrResult: OCRResult = new OCRResult(ocr);
        const textElements: TextElements = ocrResult.findTextElements();
        const result = {
            documentId: documentId,
            ocrResult: {
                bid: bid,
                page: page,
                result: textElements,
            },
        };
        return publishResultToSNS(result);
    });

    try {
        const results = await Promise.all(snsPromises);
        callback(null, results);
    } catch (err) {
        console.error('Error processing OCR result', JSON.stringify(err));
        callback(err, { message: 'Error processing OCR result' });
    }
};

async function publishResultToSNS(message: any) {
    const arn = process.env.SNS_OCR_SENT_TOKENIZE;
    const sns = new SNS();
    if (typeof arn === 'undefined') return;
    await sns.publish({ message, arn });
}