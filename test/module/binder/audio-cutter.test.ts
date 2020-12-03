import fs from 'fs';

import CompleteSentence from '../../../src/model/binder/complete-sentence';
import AudioCutter from '../../../src/module/binder/audio-cutter';

const bid = 'TPSRT206X';
const path = `test/output/report/complete-sentence-${bid}.json`;
const json = fs.readFileSync(path, 'utf-8');
const rows = JSON.parse(json);
const sentences: CompleteSentence[] = [];

const cutter = new AudioCutter(bid, sentences);

for (const row of rows) {
    sentences.push(new CompleteSentence(
        row.page,
        row.language,
        row.startTime,
        row.endTime,
        row.sttSentence,
        row.audioSequence,
        row.sentence,
        row.geometry,
    ));
}

test('When_Cut_Audio_Per_Sentences', () => {
    cutter.cut();

    for (const sentence of sentences) {
        const filename = sentence.getSlicedAudioFilename();
        const filepath = `test/output/${bid}/${filename}`;

        expect(fs.existsSync(filepath)).toBeTruthy();
    }
});