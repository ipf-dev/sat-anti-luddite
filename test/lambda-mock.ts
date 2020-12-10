const mockedContext = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: jest.fn(() => 30),
    done: jest.fn((error?: Error, result?: any) => {}),
    fail: jest.fn((error: Error | string) => {}),
    succeed: jest.fn((messageOrObject: any) => {}),
};

async function invoke(lambda: Function, param: any): Promise<any> {
    return lambda(param, mockedContext, () => {});
}

export default invoke;
