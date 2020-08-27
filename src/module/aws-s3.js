const awsSdk = require('aws-sdk');

module.exports = class S3 {
    constructor() {
        this.client = new awsSdk.S3();
    }

    async getObject({ bucket, key }) {
        const object = await this.client.getObject({
            Bucket: bucket,
            Key: key,
        }).promise();
        return object.Body;
    }

    async getObjectTagging({ bucket, key }) {
        const tags = await this.client.getObjectTagging({
            Bucket: bucket,
            Key: key,
        }).promise();
        return tags.TagSet;
    }
};