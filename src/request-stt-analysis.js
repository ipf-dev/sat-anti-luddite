const awsSdk = require('aws-sdk');

const transcribeService = new awsSdk.TranscribeService();
const s3 = new awsSdk.S3();
const DEFAULT_LANGUAGE_CODE = 'en-GB';

module.exports.handler = async (event, context, callback) => {
    const records = event.Records;

    const transcribingPromises = records.map(async (record) => {
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        const jobName = `${getFileNameFromS3Key(key)}-${Date.now()}`;
        const languageCode = await getLanguageCode({ bucket, key });

        return transcribeService.startTranscriptionJob({
            LanguageCode: languageCode,
            Media: { MediaFileUri: `s3://${bucket}/${key}` },
            MediaFormat: 'mp3',
            TranscriptionJobName: jobName,
            OutputBucketName: process.env.STT_OUTPUT_BUCKET,
        }).promise();
    });

    await Promise.all(transcribingPromises)
        .then(() => {
            callback(null, { message: 'Start transcription job successfully' });
        })
        .catch((err) => {
            console.log('Error starting transcription job:', JSON.stringify(err));
            callback(err, { message: 'Error starting transcription job' });
        });
};

async function getLanguageCode({ bucket, key }) {
    let languageCode = DEFAULT_LANGUAGE_CODE;
    const tags = await s3.getObjectTagging({ Bucket: bucket, Key: key }).promise();
    tags.TagSet.forEach((tag) => {
        if (tag.Key === 'LanguageCode') languageCode = tag.Value;
    });
    return languageCode;
}

function getFileNameFromS3Key(key) {
    const pathes = key.split('/');
    const objectName = pathes[pathes.length - 1];
    return objectName.split('.')[0];
}