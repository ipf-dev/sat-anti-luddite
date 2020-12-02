import { Handler } from 'aws-lambda';
import log from 'loglevel';

import { DetectDocumentTextResponse } from 'aws-sdk/clients/textract';
import AntiLudditeHandler from './anti-luddite-handler';
import Textract from './module/aws-textract';
import ElasticSearch from './module/aws-elastic-search';
import SNS from './module/aws-sns';

AntiLudditeHandler.init();
const textract = new Textract();
const elasticSearch = new ElasticSearch();

/* eslint-disable  import/prefer-default-export, no-await-in-loop */
export const handler: Handler = async (event, context, callback) => {
    const { bid, documents } = event;
    const bucket = event.bucket || process.env.TEXTRACT_INPUT_BUCKET;
    const documentIds: string[] = [];

    for (const { page, s3Key } of documents) {
        const ocrResult = await detectDocumentText(bucket, s3Key);
        const documentId = await indexOcrResult(bid, page, ocrResult);

        await invokeBodyFilter({ documentId });

        documentIds.push(documentId);

        // The AWS Textract Quota is limited to 1 tps.
        // In order to avoid ProvisionedThroughputExceededException, we need to throttle the requests.
        await sleep(1000);
    }
    callback(null, documentIds);
};

async function detectDocumentText(bucket: string, key: string): Promise<DetectDocumentTextResponse> {
    return textract.detectDocumentText({ key, bucket });
}

async function indexOcrResult(bid: string, page: number, ocrResult: DetectDocumentTextResponse): Promise<string> {
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

    return documentId;
}

async function invokeBodyFilter(message: any): Promise<void>  {
    const arn = process.env.SNS_OCR_BODY_FILTER;
    const sns = new SNS();
    if (typeof arn === 'undefined') return;
    await sns.publish({ message, arn });
}

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}