import { Handler, SNSEventRecord } from 'aws-lambda';
import { SNSEvent } from 'aws-lambda/trigger/sns';
import { ApiResponse } from '@elastic/elasticsearch';

import ElasticSearch from './module/aws-elastic-search';
import SNS from './module/aws-sns';
import OCRResult, { OCRBodyFilterResult } from './module/ocr-result';

const es = new ElasticSearch();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event: SNSEvent, context, callback) => {
    const promises = event.Records.map(handleSNSEventRecord);

    try {
        const documentIds = await Promise.all(promises);
        callback(null, { documentIds: documentIds });
    } catch (err) {
        console.error('Error processing OCR result', JSON.stringify(err));
        callback(err, { message: 'Error processing OCR result' });
    }
};

async function handleSNSEventRecord(record: SNSEventRecord): Promise<string> {
    const { documentId } = JSON.parse(record.Sns.Message);
    const { bid, page, result } = await fetchOCRResult(documentId);
    const ocrResult: OCRResult = new OCRResult({
        documentId, bid, page, result,
    });
    ocrResult.filter();
    const filteredResult = ocrResult.getFilteredResult();
    await saveResult(documentId, filteredResult);
    await invokeSentTokenize({ documentId });
    return documentId;
}

async function fetchOCRResult(documentId: string): Promise<any> {
    const resp: ApiResponse = await es.get({
        index: 'ocr-result',
        id: documentId,
    });
    // eslint-disable-next-line no-underscore-dangle
    return resp.body._source;
}

async function saveResult(documentId: string, result: OCRBodyFilterResult): Promise<void> {
    await es.index({
        index: 'ocr-categorized',
        body: result,
        id: documentId,
    });
}

async function invokeSentTokenize(message: any): Promise<void>  {
    const arn = process.env.SNS_OCR_SENT_TOKENIZE;
    const sns = new SNS();
    if (typeof arn === 'undefined') return;
    await sns.publish({ message, arn });
}