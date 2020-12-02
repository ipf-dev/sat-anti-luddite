import { Handler, S3EventRecord } from 'aws-lambda';
import log from 'loglevel';

import AntiLudditeHandler from './anti-luddite-handler';
import Transcribe from './module/aws-transcribe';
import S3 from './module/aws-s3';
import STTFileMetadata from './model/stt-file-metadata';

AntiLudditeHandler.init();
const transcribe = new Transcribe();

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event, context, callback) => {
    const { bucket, s3Key } = event;
    const fileName = S3.getFileNameFromKey(s3Key);
    const fileMetadata = new STTFileMetadata(fileName);

    try {
        await transcribe.startTranscriptionJob({
            jobName: fileMetadata.getTranscribeJobName(),
            bucket: bucket,
            key: s3Key,
            languageCode: fileMetadata.getTranscribeLanguageCode(),
        });
        callback(null, { message: 'Start transcription job successfully' });
    } catch (err) {
        log.error('Error starting transcription job:', JSON.stringify(err));
        callback(err, { message: 'Error starting transcription job' });
    }
};
