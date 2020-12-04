import assert from 'assert';
import { Handler } from 'aws-lambda';
import log from 'loglevel';

import AntiLudditeHandler from '../common/anti-luddite-handler';
import ElasticSearch from '../common/aws/aws-elastic-search';
import S3 from '../common/aws/aws-s3';
import SNS from '../common/aws/aws-sns';
import { TranscribeEvent } from '../common/aws/aws-transcribe';
import STTJobMetadata from './stt-job-metadata';

AntiLudditeHandler.init();
const es = new ElasticSearch();
const s3 = new S3();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event: TranscribeEvent, context, callback) => {
    const jobName = getJobName(event);
    const jobMetadata = new STTJobMetadata(jobName);
    const sttResult = await fetchSTTResult(jobName);
    const documentId = jobMetadata.getDocumentId();
    const esIndexParam = {
        index: 'stt-result',
        body: {
            bid: jobMetadata.getBid(),
            jobName: sttResult.jobName,
            languageCode: jobMetadata.getTranscribeLanguageCode(),
            sequence: jobMetadata.getSequenceNumber(),
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
        log.error('Error saving STT result to Elasticsearch:', JSON.stringify(err));
        callback(err, { message: 'Error saving STT result to Elasticsearch' });
    }
};

function getJobName(event: TranscribeEvent) {
    const {
        TranscriptionJobStatus: jobStatus,
        TranscriptionJobName: jobName,
    } = event.detail;
    assert(jobStatus === 'COMPLETED', `Invalid job status: ${jobStatus}`);
    return jobName;
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