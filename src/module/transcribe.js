const awsSdk = require('aws-sdk');

module.exports = class Transcribe {
    constructor() {
        this.client = new awsSdk.TranscribeService();
    }

    async startTranscriptionJob({
        jobName, bucket, key, languageCode,
    }) {
        const params = {
            LanguageCode: languageCode,
            Media: {
                MediaFileUri: `s3://${bucket}/${key}`,
            },
            MediaFormat: 'mp3',
            TranscriptionJobName: jobName,
            OutputBucketName: process.env.STT_OUTPUT_BUCKET,
        };
        const result = await this.client.startTranscriptionJob(params).promise();
        return result;
    }
};