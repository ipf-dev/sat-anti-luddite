const assert = require('assert');

const ElasticSearch = require('./module/elastic-search');
const S3 = require('./module/s3');

const es = new ElasticSearch();
const s3 = new S3();

module.exports.handler = async (event, context, callback) => {
    const jobStatus = event.detail.TranscriptionJobStatus;
    const jobName = event.detail.TranscriptionJobName;

    assert(jobStatus === 'COMPLETED', `Invalid job status: ${jobStatus}`);

    const sttResult = await getSTTResult(jobName);
    // eslint-disable-next-line prefer-destructuring
    const documentId = jobName.split('-')[0];
    // eslint-disable-next-line prefer-destructuring
    const bid = documentId.split('_')[0];

    try {
        await es.index({ // TODO: 발음 정보, 페이지 정보도 함께 저장
            id: documentId,
            index: 'stt-result',
            body: {
                bid: bid,
                jobName: sttResult.jobName,
                result: sttResult.results,
            },
        });
        callback(null, { message: 'STT result saved to Elasticsearch successfully' });
    } catch (err) {
        console.log('Error saving STT result to Elasticsearch:', JSON.stringify(err));
        callback(err, { message: 'Error saving STT result to Elasticsearch' });
    }
};

async function getSTTResult(jobName) {
    const data = await s3.getObject({
        bucket: process.env.STT_OUTPUT_BUCKET,
        key: `${jobName}.json`,
    });
    return JSON.parse(data);
}