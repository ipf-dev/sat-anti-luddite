import { APIGatewayProxyEvent } from 'aws-lambda';

export default class Authorizer {
    public static authorize(event: APIGatewayProxyEvent) {
        const key = event.headers['x-api-key'] || event.headers['X-API-Key'];
        if (key !== process.env.PLAYABLE_SENTENCE_API_KEY) {
            throw new Error('Unauthorized');
        }
    }
}
