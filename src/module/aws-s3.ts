import AWS from 'aws-sdk';
import * as S3Client from 'aws-sdk/clients/s3';
import { Body, TagSet } from 'aws-sdk/clients/s3';

export type S3Object = {
    bucket: string;
    key: string;
};
type GetObjectParam = S3Object;
type GetObjectTaggingParam = S3Object;

export default class S3 {
    private client: S3Client;

    public constructor() {
        this.client = new AWS.S3();
    }

    public async getObject({ bucket, key }: GetObjectParam): Promise<Body|undefined> {
        const object = await this.client.getObject({
            Bucket: bucket,
            Key: key,
        }).promise();
        return object.Body;
    }

    public async getObjectTagging({ bucket, key }: GetObjectTaggingParam): Promise<TagSet> {
        const tags = await this.client.getObjectTagging({
            Bucket: bucket,
            Key: key,
        }).promise();
        return tags.TagSet;
    }
}