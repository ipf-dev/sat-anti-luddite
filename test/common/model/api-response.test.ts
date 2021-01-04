import ApiResponseBuilder from '../../../src/common/model/api-response';
import { HttpStatus } from '../../../src/common/model/http-status';

test('When_PrintSuccessWithNoData_Expect_EmptyBody', () => {
    const result = ApiResponseBuilder.success(HttpStatus.OK).getAPIGatewayProxyResult();

    expect(result).toEqual({
        statusCode: HttpStatus.OK,
        body: '',
    });
});

test('When_PrintSuccessWithData_Expect_BodyHasData', () => {
    const result = ApiResponseBuilder.success(HttpStatus.OK, { size: 'elephant' }).getAPIGatewayProxyResult();

    expect(result).toEqual({
        statusCode: HttpStatus.OK,
        body: '{"size":"elephant"}',
    });
});

test('When_PrintError_Expect_BodyHasMessage', () => {
    const result = ApiResponseBuilder.error(HttpStatus.BAD_REQUEST, 'invalid parameter.').getAPIGatewayProxyResult();

    expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        body: '{"message":"invalid parameter."}',
    });
});