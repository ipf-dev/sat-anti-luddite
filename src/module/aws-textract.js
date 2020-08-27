const aws = require('aws-sdk');

module.exports = class Textract {
    constructor() {
        this.client = new aws.Textract({
            region: process.env.TEXTRACT_REGION,
        });
    }

    async detectDocumentText({ key }) {
        const params = {
            Document: {
                S3Object: {
                    Bucket: process.env.TEXTRACT_INPUT_BUCKET,
                    Name: key,
                },
            },
        };
        return this.client.detectDocumentText(params).promise();
    }

    async startDocumentTextDetection({ key }) {
        const params = {
            DocumentLocation: {
                S3Object: {
                    Bucket: process.env.TEXTRACT_INPUT_BUCKET,
                    Name: key,
                },
            },
        };
        return this.client.startDocumentTextDetection(params).promise();
    }

    async getDocumentTextDetection({ jobId }) {
        return this.client.getDocumentTextDetection({ JobId: jobId }).promise();
    }
};