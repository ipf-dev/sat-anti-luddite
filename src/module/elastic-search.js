const AWS = require('aws-sdk');
const { Client } = require('@elastic/elasticsearch');
const AWSConnector = require('aws-elasticsearch-connector');

module.exports = class ElasticSearch {
    constructor() {
        AWS.config.update({
            region: 'ap-northeast-2',
        });

        this.client = new Client({
            ...AWSConnector(AWS.config),
            node: process.env.ELASTIC_SEARCH_HOST,
        });
    }

    index({ id, index, body }) {
        const params = {
            index: index,
            op_type: 'index',
            timeout: '15000ms',
            body: body,
        };
        if (id !== undefined) params.id = id;
        return this.client.index(params);
    }
};