import SentenceAnalyzer from '../../src/sentence-binder/sentence-analyzer';

test('When_CheckSTTConcatenated_chip read the story', () => {
    const similarity = SentenceAnalyzer.getSubSentenceSimilarity(
        'kipper went into chips room chip read the storey',
        'chip read the story',
    );

    expect(similarity).toBeGreaterThanOrEqual(0.8);
});

test('When_CheckSTTConcatenated_come back they called', () => {
    const similarity = SentenceAnalyzer.getSubSentenceSimilarity(
        'floppy ran out of the wood comeback called biff',
        'come back they called',
    );

    expect(similarity).toBeLessThan(0.8);
});

test('When_CheckSTTConcatenated_kipper read room', () => {
    const similarity = SentenceAnalyzer.getSubSentenceSimilarity(
        'kipper went into chips room chip read the storey',
        'kipper read room',
    );

    expect(similarity).toBeLessThan(0.8);
});

test('When_CheckSTTConcatenated_chip read the story', () => {
    const concatenated = SentenceAnalyzer.isPartiallyMatched(
        'kipper went into chips room chip read the storey',
        'chip read the story',
    );

    expect(concatenated).toBe(true);
});

test('When_CheckSTTConcatenated_come back they called', () => {
    const concatenated = SentenceAnalyzer.isPartiallyMatched(
        'floppy ran out of the wood comeback called biff',
        'come back they called',
    );

    expect(concatenated).toBe(false);
});

test('When_CheckSTTConcatenated_kipper read room', () => {
    const concatenated = SentenceAnalyzer.isPartiallyMatched(
        'kipper went into chips room chip read the storey',
        'kipper read room',
    );

    expect(concatenated).toBe(false);
});

test('Split Partially Matched Sentence at front', () => {
    const split = SentenceAnalyzer.getPartiallyMatchedWords(
        'kipper went into chips room chip read the storey',
        'kipper went into chips room',
    );

    expect(split.length).toBe(2);
    expect(split[0].join(' ')).toBe('kipper went into chips room');
    expect(split[1].join(' ')).toBe('chip read the storey');
});

test('Split Partially Matched Sentence at last', () => {
    const split = SentenceAnalyzer.getPartiallyMatchedWords(
        'kipper went into chips room chip read the storey',
        'chip read the story',
    );

    expect(split.length).toBe(2);
    expect(split[0].join(' ')).toBe('chip read the storey');
    expect(split[1].join(' ')).toBe('kipper went into chips room');
});