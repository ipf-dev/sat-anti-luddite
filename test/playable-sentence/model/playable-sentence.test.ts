import assert from 'assert';

import PlayableSentence from '../../../src/playable-sentence/model/playable-sentence';

test('When_BuildWithNoAudio_ThrowAssertionError', () => {
    const param = {
        text: 'test',
        bid: 'TEST',
        page: 5,
        audio: [],
    };

    expect(() => {
        PlayableSentence.build(param);
    }).toThrow(assert.AssertionError);
});
