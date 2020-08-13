const Transcribe = require('./module/transcribe');
const S3 = require('./module/s3');

const transcribe = new Transcribe();
const s3 = new S3();

const DEFAULT_LANGUAGE_CODE = 'en-GB';

module.exports.handler = async (event, context, callback) => {
    const records = event.Records;
    const transcribingPromises = records.map(async (record) => {
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        const jobName = `${getFileNameFromS3Key(key)}-${Date.now()}`;
        const languageCode = await getLanguageCode({ bucket, key });

        return transcribe.startTranscriptionJob({
            jobName, bucket, key, languageCode,
        });
    });

    try {
        await Promise.all(transcribingPromises);
        callback(null, { message: 'Start transcription job successfully' });
    } catch (err) {
        console.log('Error starting transcription job:', JSON.stringify(err));
        callback(err, { message: 'Error starting transcription job' });
    }
};

function getFileNameFromS3Key(key) {
    const paths = key.split('/');
    const objectName = paths[paths.length - 1];
    return objectName.split('.')[0];
}

async function getLanguageCode({ bucket, key }) {
    let languageCode = DEFAULT_LANGUAGE_CODE;
    const tags = await s3.getObjectTagging({ bucket, key });
    tags.forEach((tag) => {
        if (tag.Key === 'LanguageCode') languageCode = tag.Value;
    });
    return languageCode;
}