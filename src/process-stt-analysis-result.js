const assert = require('assert');
const awsSdk = require('aws-sdk');

const ElasticSearch = require('./module/elastic-search');

const s3 = new awsSdk.S3();
const elasticSearch = new ElasticSearch();

module.exports.handler = async (event, context, callback) => {
    const jobStatus = event.detail.TranscriptionJobStatus;
    const jobName = event.detail.TranscriptionJobName;

    assert(jobStatus === 'COMPLETED', `Invalid job status: ${jobStatus}`);

    const transcriptionResult = await getTranscriptionResult(jobName);
    // eslint-disable-next-line prefer-destructuring
    const bid = jobName.split('-')[0];
    const document = {
        bid: bid,
        jobName: transcriptionResult.jobName,
        result: transcriptionResult.results,
    };

    await elasticSearch.index({ id: bid, index: 'stt-result', body: document })
        .then(() => {
            callback(null, { message: 'STT result saved to Elasticsearch successfully' });
        })
        .catch((err) => {
            console.log('Error saving STT result to Elasticsearch:', JSON.stringify(err));
            callback(err, { message: 'Error saving STT result to Elasticsearch' });
        });
};

async function getTranscriptionResult(jobName) {
    const data = await s3.getObject({ Bucket: process.env.STT_OUTPUT_BUCKET, Key: `${jobName}.json` }).promise();
    const dataString = data.Body.toString('utf-8');
    return JSON.parse(dataString);
}