import { Handler, S3EventRecord } from 'aws-lambda';
import { S3Event } from 'aws-lambda/trigger/s3';
import log from 'loglevel';

import AntiLudditeHandler from './anti-luddite-handler';
import Transcribe from './module/aws-transcribe';
import S3 from './module/aws-s3';
import STTFileMetadata from './model/stt-file-metadata';

AntiLudditeHandler.init();
const transcribe = new Transcribe();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event: S3Event, context, callback) => {
    const records = event.Records;
    const transcribingPromises = records.map(startTranscriptionJobForS3EventRecord);

    try {
        await Promise.all(transcribingPromises);
        callback(null, { message: 'Start transcription job successfully' });
    } catch (err) {
        log.error('Error starting transcription job:', JSON.stringify(err));
        callback(err, { message: 'Error starting transcription job' });
    }
};

async function startTranscriptionJobForS3EventRecord(record: S3EventRecord) {
    const bucket = record.s3.bucket.name;
    const { key } = record.s3.object;
    const fileName = S3.getFileNameFromKey(key);
    const fileMetadata = new STTFileMetadata(fileName);

    return transcribe.startTranscriptionJob({
        jobName: fileMetadata.getTranscribeJobName(),
        bucket: bucket,
        key: key,
        languageCode: fileMetadata.getTranscribeLanguageCode(),
    });
}