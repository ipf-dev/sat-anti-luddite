import { Handler } from 'aws-lambda';
import assert from 'assert';
import { ApiResponse } from '@elastic/elasticsearch';
import { AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { PublishResponse } from 'aws-sdk/clients/sns';

import AntiLudditeHandler from '../common/anti-luddite-handler';
import ElasticSearch from '../common/aws/aws-elastic-search';
import SNS from '../common/aws/aws-sns';
import { Dictionary } from '../common/model/dictionary';

const sourceIndex: Dictionary<string> = {
    'ocr-body-filter': 'ocr-result',
    'ocr-sent-tokenize': 'ocr-categorized',
};
const invokeArn: Dictionary<string | undefined> = {
    'ocr-body-filter': process.env.SNS_OCR_BODY_FILTER,
    'ocr-sent-tokenize': process.env.SNS_OCR_SENT_TOKNEIZE,
};

AntiLudditeHandler.init();
const elasticSearch = new ElasticSearch();
const sns = new SNS();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event, context, callback) => {
    const { bid, func } = event;
    const arn = invokeArn[func];
    assert(typeof arn !== 'undefined', 'Invalid function name');
    const documentIds: string[] = await getDocumentIds(bid, sourceIndex[func]);
    const promises
        : Promise<PromiseResult<PublishResponse, AWSError>>[] = documentIds
            .map((documentId) => invokeFunction(arn, documentId));
    await Promise.all(promises);
    callback(null, { documentIds: documentIds });
};

async function getDocumentIds(bid: string, index: string): Promise<string[]> {
    const sources: any[] = await fetchSourceByBid(bid, index);
    // eslint-disable-next-line no-underscore-dangle
    return sources.map((source) => source._id);
}

async function fetchSourceByBid(bid: string, index: string) {
    const esResult: ApiResponse = await elasticSearch.search({
        index: index,
        query: { term: { bid: bid } },
        size: 100,
        filter_path: ['hits.hits'],
    });
    return esResult.body.hits.hits;
}

function invokeFunction(arn: string, documentId: string) {
    return sns.publish({
        arn: arn,
        message: { documentId },
    });
}