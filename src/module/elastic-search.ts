const AWS = require('aws-sdk');
const { Client } = require('@elastic/elasticsearch');
const AWSConnector = require('aws-elasticsearch-connector');

interface IndexParam {
    id?: string,
    index: string,
    op_type: 'index' | 'create',
    timeout: string,
    body: object,
}

module.exports = class ElasticSearch {
    client: any;

    constructor() {
        AWS.config.update({
            region: 'ap-northeast-2',
        });

        this.client = new Client({
            ...AWSConnector(AWS.config),
            node: process.env.ELASTIC_SEARCH_HOST,
        });
    }

    async index(index: string, body: object, id: string | undefined): Promise<object> {
        const params: IndexParam = {
            index: index,
            op_type: 'index',
            timeout: '15000ms',
            body: body,
        };
        if (id !== undefined) params.id = id;
        return this.client.index(params);
    }
};

