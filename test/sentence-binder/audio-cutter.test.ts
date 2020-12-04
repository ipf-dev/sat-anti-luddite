import fs from 'fs';

import CompleteSentence, { CompleteSentenceBuilder } from '../../src/sentence-binder/model/complete-sentence';
import AudioCutter from '../../src/sentence-binder/audio-cutter';

const bid = process.env.TEST_BID || '';
const json = fs.readFileSync(`/tmp/output/report/complete-sentence-${bid}.json`, 'utf-8');
const rows = JSON.parse(json);

const sentences: CompleteSentence[] = [];
const cutter = new AudioCutter(bid, sentences);

for (const row of rows) {
    sentences.push(new CompleteSentenceBuilder().buildFromJSON(row));
}

test('When_Cut_Audio_Per_Sentences', () => {
    cutter.cut();

    for (const sentence of sentences) {
        const filename = sentence.getSlicedAudioFilename();
        const filepath = `test/output/${bid}/${filename}`;

        expect(fs.existsSync(filepath)).toBeTruthy();
    }
});