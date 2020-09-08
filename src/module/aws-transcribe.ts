import AWS from 'aws-sdk';
import * as TranscribeClient from 'aws-sdk/clients/transcribeservice';

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
    languageCode: string;
}

export default class Transcribe {
    #client: TranscribeClient;

    public constructor() {
        this.#client = new AWS.TranscribeService();
    }

    public async startTranscriptionJob({
        jobName, bucket, key, languageCode,
    }: StartTranscriptionJobParam) {
        const params = {
            LanguageCode: languageCode,
            Media: {
                MediaFileUri: `s3://${bucket}/${key}`,
            },
            MediaFormat: 'mp3',
            TranscriptionJobName: jobName,
            OutputBucketName: process.env.STT_OUTPUT_BUCKET,
        };
        return this.#client.startTranscriptionJob(params).promise();
    }
}