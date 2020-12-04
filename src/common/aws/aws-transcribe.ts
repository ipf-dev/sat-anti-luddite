import AWS from 'aws-sdk';
import * as TranscribeClient  from 'aws-sdk/clients/transcribeservice';
import { StartTranscriptionJobRequest } from 'aws-sdk/clients/transcribeservice';
import { LanguageCode } from '../type/language-code';

export type TranscribeEvent = {
    detail: {
        TranscriptionJobStatus: string,
        TranscriptionJobName: string,
    }
}

type StartTranscriptionJobParam = {
    jobName: string;
    bucket: string;
    key: string;
    languageCode: LanguageCode;
}

export default class Transcribe {
    private client: TranscribeClient;

    public constructor() {
        this.client = new AWS.TranscribeService();
    }

    public async startTranscriptionJob({
        jobName, bucket, key, languageCode,
    }: StartTranscriptionJobParam) {
        const params: StartTranscriptionJobRequest = {
            LanguageCode: languageCode,
            Media: {
                MediaFileUri: `s3://${bucket}/${key}`,
            },
            MediaFormat: 'mp3',
            TranscriptionJobName: jobName,
            OutputBucketName: process.env.STT_OUTPUT_BUCKET,
        };
        return this.client.startTranscriptionJob(params).promise();
    }
}