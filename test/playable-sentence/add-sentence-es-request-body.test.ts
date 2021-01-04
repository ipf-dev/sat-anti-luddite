import AddSentenceEsRequestBody from '../../src/playable-sentence/add-sentence-es-request-body';
import PlayableSentenceWithId from '../../src/playable-sentence/model/playable-sentence-with-id';

test('When_EmptySentence_Expect_EmptyResult', () => {
    const sentences: PlayableSentenceWithId[] = [
    ];
    const result = AddSentenceEsRequestBody.generate('playable-sentence', sentences);

    expect(result).toEqual([]);
});

test('When_SentencesWithoutId_Expect_IndexWithoutId', () => {
    const sentences: PlayableSentenceWithId[] = [
        new PlayableSentenceWithId('Biff looked at the dragon\'s tail.', []),
        new PlayableSentenceWithId('She took off her belt.', []),
    ];
    const result = AddSentenceEsRequestBody.generate('playable-sentence', sentences);

    expect(result.length).toEqual(4);
    expect(result).toEqual(
        expect.arrayContaining([
            { index: { _index: 'playable-sentence' } },
            { index: { _index: 'playable-sentence' } },
        ]),
    );
});

test('When_SentencesWithId_Expect_IndexWithId', () => {
    const sentences: PlayableSentenceWithId[] = [
        new PlayableSentenceWithId(
            'Biff looked at the dragon\'s tail.',
            [],
            undefined,
            undefined,
            'non-exist-document-1',
        ),
        new PlayableSentenceWithId(
            'She took off her belt.',
            [],
            undefined,
            undefined,
            'non-exist-document-2',
        ),
    ];
    const result = AddSentenceEsRequestBody.generate('playable-sentence', sentences);

    expect(result.length).toEqual(4);
    expect(result).toEqual(
        expect.arrayContaining([
            { index: { _index: 'playable-sentence', _id: 'non-exist-document-1' } },
            { index: { _index: 'playable-sentence', _id: 'non-exist-document-2' } },
        ]),
    );
});
