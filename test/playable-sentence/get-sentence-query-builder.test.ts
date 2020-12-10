import GetSentenceRequestBuilder from '../../src/playable-sentence/get-sentence-request-builder';

test('When_BuildWithNoParam_Expect_EmptyQuery', () => {
    const builder = new GetSentenceRequestBuilder({});
    const result: any = builder.build().toJSON();

    expect(result).toEqual({
        query: {
            bool: {},
        },
    });
});

test('When_BuildWithBid_Expect_IncludeBid', () => {
    const builder = new GetSentenceRequestBuilder({ bid: 'TESTBID' });
    const result: any = builder.build().toJSON();

    expect(result).toEqual({
        query: {
            bool: {
                must: {
                    term: { 'bid.keyword': 'TESTBID' },
                },
            },
        },
    });
});

test('When_BuildWithText_Expect_IncludeText', () => {
    const builder = new GetSentenceRequestBuilder({ text: 'Floppy barked and barked' });
    const result: any = builder.build().toJSON();

    expect(result).toEqual({
        query: {
            bool: {
                must: {
                    term: { 'text.keyword': 'Floppy barked and barked' },
                },
            },
        },
    });
});

test('When_BuildWithMultipleParams_Expect_IncludeAll', () => {
    const builder = new GetSentenceRequestBuilder({
        bid: 'TESTBID',
        includes: 'special',
        from: 30,
        size: 30,
    });
    const result: any = builder.build().toJSON();

    expect(result).toEqual({
        query: {
            bool: {
                must: [
                    { term: { 'bid.keyword': 'TESTBID' } },
                    { match: { text: 'special' } },
                ],
                should: {
                    match_phrase: { text: 'special' },
                },
            },
        },
        from: 30,
        size: 30,
    });
});
