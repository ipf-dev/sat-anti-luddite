import { APIGatewayProxyResult } from 'aws-lambda';

import { HttpStatus } from './http-status';

class ApiResponse {
    public readonly statusCode: HttpStatus;
    public readonly message?: string;
    public readonly data?: object;

    constructor(statusCode: HttpStatus, message?: string, data?: object) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public print(): APIGatewayProxyResult {
        return {
            statusCode: this.statusCode,
            body: this.printBody(),
        };
    }

    private printBody(): string {
        if (!this.message && !this.data) return '';
        return JSON.stringify({
            ...this.message && { message: this.message },
            ...this.data && this.data,
        });
    }
}

export default class ApiResponseBuilder {
    public static success(statusCode: HttpStatus, data?: object): ApiResponse {
        return new ApiResponse(statusCode,  undefined, data);
    }

    public static error(statusCode: HttpStatus, message: string): ApiResponse {
        return new ApiResponse(statusCode, message);
    }
}
