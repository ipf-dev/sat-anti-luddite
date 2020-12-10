import {
    Handler, Context, APIGatewayProxyEvent, APIGatewayProxyResult,
} from 'aws-lambda';

import AntiLudditeHandler from '../common/anti-luddite-handler';
import SentenceController from './sentence-controller';

AntiLudditeHandler.init();

const sentenceController = new SentenceController();

export const add: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    return sentenceController.add(event, context);
};

export const get: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    return sentenceController.get(event, context);
};
