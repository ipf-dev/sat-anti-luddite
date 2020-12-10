import log from 'loglevel';
import assert from 'assert';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { HttpStatus } from '../common/model/http-status';
import ApiResponseBuilder from '../common/model/api-response';
import SentenceService from './sentence-service';

export default class SentenceController {
    private readonly sentenceService: SentenceService;

    constructor() {
        this.sentenceService = new SentenceService();
    }

    async add(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
        try {
            const params: any = event.body ? JSON.parse(event.body) : { sentence: [] };
            await this.sentenceService.add(params.sentence);
            return ApiResponseBuilder
                .success(HttpStatus.CREATED)
                .print();
        } catch (e) {
            log.error(e.stack);
            if (e instanceof assert.AssertionError) {
                return ApiResponseBuilder
                    .error(HttpStatus.BAD_REQUEST, e.message)
                    .print();
            }

            return ApiResponseBuilder
                .error(HttpStatus.INTERNAL_SERVER_ERROR, `${e.name}: ${e.message}`)
                .print();
        }
    }

    async get(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
        try {
            const param = event.queryStringParameters || {};
            const data = await this.sentenceService.get(param);
            return ApiResponseBuilder.success(HttpStatus.OK, data).print();
        } catch (e) {
            log.error(e.stack);
            if (e instanceof assert.AssertionError) {
                return ApiResponseBuilder
                    .error(HttpStatus.BAD_REQUEST, e.message)
                    .print();
            }

            return ApiResponseBuilder
                .error(HttpStatus.INTERNAL_SERVER_ERROR, `${e.name}: ${e.message}`)
                .print();
        }
    }
}
