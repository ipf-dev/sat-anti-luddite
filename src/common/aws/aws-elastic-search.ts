import AWS from 'aws-sdk';
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';

import {
    IndexParam, GetParam, DeleteParam, SearchParam,
} from './aws-elastic-search-param';

const AWSConnector = require('aws-elasticsearch-connector');

export default class ElasticSearch {
    private client: Client;

    public constructor() {
        AWS.config.update({
            region: 'ap-northeast-2',
        });

        const params = this.getClientInitParam();
        this.client = new Client(params);
    }

    protected getClientInitParam() {
        return {
            ...AWSConnector(AWS.config),
            node: process.env.ELASTIC_SEARCH_HOST,
        };
    }

    public async index({ index, body, id }: IndexParam): Promise<ApiResponse> {
        const params: RequestParams.Index = {
            index: index,
            op_type: 'index',
            timeout: '15000ms',
            body: body,
        };
        if (id !== undefined) params.id = id;
        return this.client.index(params);
    }

    public async search({
        index, query, sort, size, filterPath,
    }: SearchParam): Promise<ApiResponse> {
        const params: RequestParams.Search = {
            index: index,
            body: {
                query, sort,
            },
            size: size,
            filter_path: filterPath,
        };

        return this.client.search(params);
    }

    public async searchWithBody(index: string, body: object): Promise<ApiResponse> {
        return this.client.search({
            index: index,
            body: body,
        });
    }

    public async get({ index, id }: GetParam): Promise<ApiResponse> {
        const params: RequestParams.Get = {
            index: index,
            id: id,
        };

        return this.client.get(params);
    }

    public async delete({ index, query }: DeleteParam): Promise<ApiResponse> {
        const params: RequestParams.DeleteByQuery = {
            index: index,
            body: {
                query,
            },
        };

        return this.client.delete_by_query(params);
    }

    public async bulk(index: string, body: any[]): Promise<Record<string, any>> {
        const { body: result } = await this.client.bulk({
            index,
            body,
        });

        return result;
    }
}
