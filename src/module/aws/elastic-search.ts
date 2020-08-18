import AWS from 'aws-sdk';
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';

const AWSConnector = require('aws-elasticsearch-connector');

export class ElasticSearch {
    client: Client;

    constructor() {
        AWS.config.update({
            region: 'ap-northeast-2',
        });

        const params = this.getClientInitParam();
        this.client = new Client(params);
    }

    getClientInitParam() {
        return {
            ...AWSConnector(AWS.config),
            node: process.env.ELASTIC_SEARCH_HOST,
        };
    }

    async index(index: string, body: object, id: string | undefined): Promise<ApiResponse> {
        const params: RequestParams.Index = {
            index: index,
            op_type: 'index',
            timeout: '15000ms',
            body: body,
        };
        if (id !== undefined) params.id = id;
        return this.client.index(params);
    }

    async search(index: string, query: object): Promise<ApiResponse> {
        const params: RequestParams.Search = {
            index: index,
            body: {
              query: query
            }
          };

        return this.client.search(params);
    }

    async get(index: string, id: string): Promise<ApiResponse> {
        const params: RequestParams.Get = {
            index: index,
            id: id
        };

        return this.client.get(params);
    }
};

