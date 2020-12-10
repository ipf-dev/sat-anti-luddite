import PlayableSentence from '../../../src/playable-sentence/model/playable-sentence';
import PlayableSentenceWithId from '../../../src/playable-sentence/model/playable-sentence-with-id';

test('When_BuildFromSentenceWithoutId_Expect_Instance', () => {
    const sentence = new PlayableSentence(
        'They were on a beach, but it was very different from most beaches.',
        [],
        'TPSRI35',
        5,
    );
    const sentenceWithId = PlayableSentenceWithId.buildFromSentence(sentence);

    expect(sentenceWithId).toBeInstanceOf(PlayableSentenceWithId);
});

test('When_BuildFromSentenceWithId_Expect_Instance', () => {
    const sentence = new PlayableSentence(
        'They were on a beach, but it was very different from most beaches.',
        [],
        'TPSRI35',
        5,
    );
    const sentenceWithId = PlayableSentenceWithId.buildFromSentence(sentence, 'test-id');

    expect(sentenceWithId).toBeInstanceOf(PlayableSentenceWithId);
});
