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
        const result = this.client.detectDocumentText(params).promise();
        return result;
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
        const result = await this.client.startDocumentTextDetection(params).promise();
        return result;
    }

    async getDocumentTextDetection({ jobId }) {
        const result = await this.client.getDocumentTextDetection({ JobId: jobId }).promise();
        return result;
    }
};