import SentenceAnalyzer from '../../../src/module/binder/sentence-analyzer';

// test('When_CheckSTTConcatenated_come back called biff', () => {
//     const similarity = SentenceAnalyzer.getSubSentenceSimilarity(
//         'floppy ran out of the wood comeback called biff',
//         'come back called biff',
//     );
//
//     expect(similarity).toBeGreaterThanOrEqual(0.8);
// });

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

// test('When_CheckSTTConcatenated_come back called biff', () => {
//     const concatenated = SentenceAnalyzer.isSTTConcatenated(
//         'floppy ran out of the wood comeback called biff',
//         'come back called biff',
//     );
//
//     expect(concatenated).toBe(true);
// });

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