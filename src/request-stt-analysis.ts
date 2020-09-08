import {Handler, S3EventRecord} from 'aws-lambda';
import { S3Event } from 'aws-lambda/trigger/s3';

import Transcribe from './module/aws-transcribe';
import S3 from './module/aws-s3';

const transcribe = new Transcribe();
const s3 = new S3();

const DEFAULT_LANGUAGE_CODE = 'en-GB';

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event: S3Event, context, callback) => {
    const records = event.Records;
    const transcribingPromises = records.map(startTranscriptionJobForS3EventRecord);

    try {
        await Promise.all(transcribingPromises);
        callback(null, { message: 'Start transcription job successfully' });
    } catch (err) {
        console.log('Error starting transcription job:', JSON.stringify(err));
        callback(err, { message: 'Error starting transcription job' });
    }
};

async function startTranscriptionJobForS3EventRecord(record: S3EventRecord) {
    const bucket = record.s3.bucket.name;
    const { key } = record.s3.object;
    const jobName = `${getFileNameFromS3Key(key)}-${Date.now()}`;
    const languageCode = await getLanguageCode({ bucket, key });

    return transcribe.startTranscriptionJob({
        jobName, bucket, key, languageCode,
    });
}

function getFileNameFromS3Key(key: string): string {
    const paths = key.split('/');
    const objectName = paths[paths.length - 1];
    return objectName.split('.')[0];
}

async function getLanguageCode(objectDesc: { bucket: string, key: string }): Promise<string> {
    let languageCode = DEFAULT_LANGUAGE_CODE;
    const tags = await s3.getObjectTagging(objectDesc);
    tags.forEach((tag) => {
        if (tag.Key === 'LanguageCode') languageCode = tag.Value;
    });
    return languageCode;
}