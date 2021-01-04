import GetSentenceEsRequestBody from '../../src/playable-sentence/get-sentence-es-request-body';

test('When_BuildWithNoParam_Expect_EmptyQuery', () => {
    const result: any = GetSentenceEsRequestBody.generate({});

    expect(result).toEqual({
        query: {
            bool: {},
        },
    });
});

test('When_BuildWithBid_Expect_IncludeBid', () => {
    const result: any = GetSentenceEsRequestBody.generate({ bid: 'TESTBID' });

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
    const result: any = GetSentenceEsRequestBody.generate({ text: 'Floppy barked and barked' });

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
    const result: any = GetSentenceEsRequestBody.generate({
        bid: 'TESTBID',
        includes: 'special',
        from: 30,
        size: 30,
    });

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
