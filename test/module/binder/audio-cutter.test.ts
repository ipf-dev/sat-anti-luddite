import fs from 'fs';

import CompleteSentence from '../../../src/model/binder/complete-sentence';
import AudioCutter from '../../../src/module/binder/audio-cutter';

const bid = process.env.BID || '';
const path = `test/output/complete-sentence-${bid}.json`;
const jsonString = fs.readFileSync(path, 'utf-8');
const sentences: CompleteSentence[] = JSON.parse(jsonString);
const audioSlicer = new AudioCutter(bid, sentences);

test('When_Cut_Audio_Per_Sentences', () => {
    audioSlicer.cut();

    for (const sentence of sentences) {
        expect(fs.existsSync(`test/output/${bid}/${AudioCutter.getFilename(sentence)}`)).toBeTruthy();
    }
});