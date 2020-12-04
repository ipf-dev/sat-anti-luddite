import fs from 'fs';

import AWS from 'aws-sdk';
import * as S3Client from 'aws-sdk/clients/s3';
import {
    Body, ListObjectsV2Request, ObjectList, TagSet, ClientConfiguration, ContentType,
} from 'aws-sdk/clients/s3';

export type S3Object = {
    bucket: string;
    key: string;
};
export type S3Directory = {
    bucket: string;
    prefix: string;
}

type GetObjectParam = S3Object;
type GetObjectTaggingParam = S3Object;
type PutObjectParam = {
    contentType: ContentType
} & S3Object;

export default class S3 {
    private client: S3Client;

    public constructor(opts?: ClientConfiguration) {
        const defaultOption: ClientConfiguration = {
            region: 'ap-northeast-2',
        };
        this.client = new AWS.S3({ ...defaultOption, ...opts });
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

    public async listObjectsMax1000({ bucket, prefix }: S3Directory): Promise<ObjectList> {
        const params: ListObjectsV2Request = {
            Bucket: bucket,
            Delimiter: '/',
            Prefix: `${prefix}/`,
        };
        const objects = await this.client.listObjectsV2(params).promise();
        return objects.Contents || [];
    }

    public downloadObject({ bucket, key }: S3Object, path: string): Promise<void> {
        return new Promise((resolve) => {
            const writeStream = fs.createWriteStream(path);
            const readStream = this.client.getObject({
                Bucket: bucket,
                Key: key,
            }).createReadStream();

            readStream.pipe(writeStream).on('finish', () => {
                resolve();
            });
        });
    }

    public async putObject({ bucket, key, contentType }: PutObjectParam, path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.putObject({
                Bucket: bucket,
                Key: key,
                ContentType: contentType,
                Body: fs.readFileSync(path),
            }, (err, data) => {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    public static getFileNameFromKey(key: string): string {
        const paths = key.split('/');
        const objectName = paths[paths.length - 1];
        return objectName.replace(/^(.*)(\.[\S]+)$/, '$1');
    }
}