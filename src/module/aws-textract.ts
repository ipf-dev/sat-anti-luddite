import AWS from 'aws-sdk';
import * as TextractClient from 'aws-sdk/clients/textract';
import {
    DetectDocumentTextResponse,
    GetDocumentTextDetectionResponse,
    StartDocumentTextDetectionResponse,
} from 'aws-sdk/clients/textract';

type S3Object = {
    bucket: string;
    key: string;
};
type DetectDocumentTextParam = S3Object;
type StartDocumentTextDetectionParam = S3Object;

export default class Textract {
    #client: TextractClient;

    public constructor() {
        this.#client = new AWS.Textract({
            region: process.env.TEXTRACT_REGION,
        });
    }

    public async detectDocumentText({ key, bucket }: DetectDocumentTextParam): Promise<DetectDocumentTextResponse> {
        const params = {
            Document: {
                S3Object: {
                    Bucket: bucket,
                    Name: key,
                },
            },
        };
        return this.#client.detectDocumentText(params).promise();
    }

    public async startDocumentTextDetection({ key, bucket }: StartDocumentTextDetectionParam): Promise<StartDocumentTextDetectionResponse> {
        const params = {
            DocumentLocation: {
                S3Object: {
                    Bucket: bucket,
                    Name: key,
                },
            },
        };
        return this.#client.startDocumentTextDetection(params).promise();
    }

    public async getDocumentTextDetection({ jobId }: { jobId: string }): Promise<GetDocumentTextDetectionResponse> {
        return this.#client.getDocumentTextDetection({ JobId: jobId }).promise();
    }
}