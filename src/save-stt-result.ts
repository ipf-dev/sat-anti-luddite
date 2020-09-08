import assert from 'assert';
import { Handler } from 'aws-lambda';

import ElasticSearch from './module/aws-elastic-search';
import S3 from './module/aws-s3';
import SNS from './module/aws-sns';
import { TranscribeEvent } from './module/aws-transcribe';

const es = new ElasticSearch();
const s3 = new S3();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event: TranscribeEvent, context, callback) => {
    const {
        jobName, documentId, bid, languageCode,
    } = parseTranscribeEvent(event);
    const sttResult = await fetchSTTResult(jobName);
    const esIndexParam = {
        index: 'stt-result',
        body: {
            bid: bid,
            jobName: sttResult.jobName,
            languageCode: languageCode,
            result: sttResult.results,
        },
        id: documentId,
    };

    try {
        await es.index(esIndexParam);

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

function parseTranscribeEvent(event: TranscribeEvent) {
    const {
        TranscriptionJobStatus: jobStatus,
        TranscriptionJobName: jobName,
    } = event.detail;
    assert(jobStatus === 'COMPLETED', `Invalid job status: ${jobStatus}`);
    return { ...parseJobName(jobName), jobName };
}

function parseJobName(jobName: string) {
    const documentId = jobName.split('-')[0];
    const [bid, languageCode] = documentId.split('_');
    return { documentId, bid, languageCode };
}

async function fetchSTTResult(jobName: string): Promise<any> {
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