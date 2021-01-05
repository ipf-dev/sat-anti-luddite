import log from 'loglevel';
import assert from 'assert';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { HttpStatus } from '../common/model/http-status';
import ApiResponseBuilder from '../common/model/api-response';
import SentenceService from './sentence-service';
import Authorizer, { AuthorizationError } from './authorizer';

export default class SentenceController {
    private readonly sentenceService: SentenceService;

    constructor() {
        this.sentenceService = new SentenceService();
    }

    async add(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
        try {
            Authorizer.authorize(event);

            if (event.body) {
                const params: any = JSON.parse(event.body);
                await this.sentenceService.add(params.sentence);
            }

            return ApiResponseBuilder
                .success(HttpStatus.CREATED)
                .getAPIGatewayProxyResult();
        } catch (e) {
            return SentenceController.handleError(e);
        }
    }

    async get(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
        try {
            Authorizer.authorize(event);
            const param = event.queryStringParameters || {};
            const data = await this.sentenceService.get(param);
            return ApiResponseBuilder.success(HttpStatus.OK, data).getAPIGatewayProxyResult();
        } catch (e) {
            return SentenceController.handleError(e);
        }
    }

    private static handleError(e: Error) {
        log.error(e.stack);
        if (e instanceof AuthorizationError) {
            return ApiResponseBuilder
                .error(HttpStatus.UNAUTHORIZED, e.message)
                .getAPIGatewayProxyResult();
        }

        if (e instanceof assert.AssertionError) {
            return ApiResponseBuilder
                .error(HttpStatus.BAD_REQUEST, e.message)
                .getAPIGatewayProxyResult();
        }

        return ApiResponseBuilder
            .error(HttpStatus.INTERNAL_SERVER_ERROR, `${e.name}: ${e.message}`)
            .getAPIGatewayProxyResult();
    }
}
