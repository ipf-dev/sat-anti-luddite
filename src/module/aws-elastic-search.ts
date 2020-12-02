import AWS from 'aws-sdk';
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';

const AWSConnector = require('aws-elasticsearch-connector');

type IndexParam = {
    index: string;
    body: object;
    id: string | undefined;
};

type SearchParam = {
    index: string;
    query: object;
    size?: number;
    // eslint-disable-next-line camelcase
    filter_path?: string[];
};

type DeleteParam = {
    index: string;
    query: object;
};

type GetParam = {
    index: string;
    id: string;
};

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

    public async search({ index, query, size, filter_path }: SearchParam): Promise<ApiResponse> {
        const params: RequestParams.Search = {
            index: index,
            body: {
                query: query,
            },
            size: size,
            filter_path: filter_path,
        };

        return this.client.search(params);
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
}

