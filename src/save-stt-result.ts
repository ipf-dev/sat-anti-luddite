import assert from 'assert';
import { Handler } from 'aws-lambda';

import ElasticSearch from './module/aws-elastic-search';
import S3 from './module/aws-s3';
import SNS from './module/aws-sns';

const es = new ElasticSearch();
const s3 = new S3();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event, context, callback) => {
    const {
        TranscriptionJobStatus: jobStatus,
        TranscriptionJobName: jobName,
    } = event.detail;

    assert(jobStatus === 'COMPLETED', `Invalid job status: ${jobStatus}`);

    const sttResult = await getSTTResult(jobName);
    // eslint-disable-next-line prefer-destructuring
    const documentId = jobName.split('-')[0];
    // eslint-disable-next-line prefer-destructuring
    const bid = documentId.split('_')[0];
    const body = {
        bid: bid,
        jobName: sttResult.jobName,
        result: sttResult.results,
    };

    try {
        await es.index({
            index: 'stt-result',
            body: body,
            id: documentId,
        });

        await publishResultToSNS({ documentId });

        callback(null, {
            message: 'STT result saved to Elasticsearch successfully',
            documentId: documentId,
        });
    } catch (err) {
        console.log('Error saving STT result to Elasticsearch:', JSON.stringify(err));
        callback(err, { message: 'Error saving STT result to Elasticsearch' });
    }
};

async function getSTTResult(jobName: string): Promise<any> {
    const bucket = process.env.STT_OUTPUT_BUCKET;
    assert(typeof bucket !== 'undefined', `STT_OUTPUT_BUCKET is undefined for jobId: ${jobName} `);
    const data = await s3.getObject({
        bucket: bucket,
        key: `${jobName}.json`,
    });
    assert(typeof data !== 'undefined', `Cannot find stt result json for jobId: ${jobName}`);
    return JSON.parse(data.toString());
}

async function publishResultToSNS(message: any) {
    const arn = process.env.SNS_STT_SENT_TOKENIZE;
    const sns = new SNS();
    if (typeof arn === 'undefined') return;
    await sns.publish({ message, arn });
}