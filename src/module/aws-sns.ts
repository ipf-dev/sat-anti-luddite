import AWS from 'aws-sdk';
import * as SNSClient from 'aws-sdk/clients/sns';
import log from 'loglevel';

type PublishParam = {
    arn: string;
    message: any;
};

export default class SNS {
    private client: SNSClient;

    public constructor() {
        AWS.config.update({
            region: 'ap-northeast-2',
        });
        this.client = new AWS.SNS();
    }

    public publish({ arn, message }: PublishParam) {
        const messageString = typeof message === 'string'
            ? message
            : JSON.stringify(message);
        const publishParams: SNSClient.PublishInput = {
            TopicArn: arn,
            Message: messageString,
        };
        log.info(`publish-event: "${messageString}" to "${arn}"\n`);
        return this.client.publish(publishParams).promise();
    }
}