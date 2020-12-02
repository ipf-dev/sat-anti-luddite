import { Handler, SNSEventRecord } from 'aws-lambda';
import log from 'loglevel';

import AntiLudditeHandler from './anti-luddite-handler';
import Textract from './module/aws-textract';
import ElasticSearch from './module/aws-elastic-search';
import SNS from './module/aws-sns';

AntiLudditeHandler.init();
const textract = new Textract();
const elasticSearch = new ElasticSearch();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event, context, callback) => {
    const { bid, page, s3Key: key } = event;
    let { bucket } = event;
    bucket = bucket || process.env.TEXTRACT_INPUT_BUCKET;
    const ocrResult = await textract.detectDocumentText({ key, bucket });
    const documentId = `${bid}_${page}`;
    const result = await elasticSearch.index({
        id: documentId,
        index: 'ocr-result',
        body: {
            bid: bid,
            page: page,
            result: ocrResult.Blocks,
        },
    });
    log.debug(result);
    await invokeBodyFilter({ documentId });
    callback(null, { documentId });
};

async function invokeBodyFilter(message: any): Promise<void>  {
    const arn = process.env.SNS_OCR_BODY_FILTER;
    const sns = new SNS();
    if (typeof arn === 'undefined') return;
    await sns.publish({ message, arn });
}
