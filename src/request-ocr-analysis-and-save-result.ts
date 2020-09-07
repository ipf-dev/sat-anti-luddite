import { Handler } from 'aws-lambda';
import assert from 'assert';

import Textract from './module/aws-textract';
import ElasticSearch from './module/aws-elastic-search';

const textract = new Textract();
const elasticSearch = new ElasticSearch();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event, context, callback) => {
    const { bid, page, s3Key: key } = event;

    const bucket = process.env.TEXTRACT_INPUT_BUCKET;
    assert(typeof bucket !== 'undefined', `TEXTRACT_INPUT_BUCKET is undefined for event: ${event} `);
    const ocrResult = await textract.detectDocumentText({ key, bucket });
    const documentBody = {
        bid: bid,
        page: page,
        result: ocrResult.Blocks,
    };
    const result = await elasticSearch.index({
        id: `${bid}_${page}`,
        index: 'ocr-result',
        body: documentBody,
    });
    console.log(result);
};