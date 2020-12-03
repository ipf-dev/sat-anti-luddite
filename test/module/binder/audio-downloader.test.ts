import fs from 'fs';

import CompleteSentence from '../../../src/model/binder/complete-sentence';
import AudioDownloader from '../../../src/module/binder/audio-downloader';

const bid = 'TPSRT206X';
const folder = '5fc60778a1422';
const bucket = 'spindle-test-resources';
const path = `test/output/report/complete-sentence-${bid}.json`;
const json = fs.readFileSync(path, 'utf-8');
const rows = JSON.parse(json);
const sentences: CompleteSentence[] = [];
const downloader = new AudioDownloader(bid, folder, bucket);

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

beforeAll(() => {
    for (const file of downloader.aggregateFiles(sentences)) {
        const filepath = `test/output/${file}`;

        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    }
});

test('When_Aggregate_Audio_Keys', () => {
    const files = downloader.aggregateFiles(sentences);

    expect(files.size).toBeGreaterThanOrEqual(1);
});

test('When_Download_Audios', () => {
    const files = downloader.aggregateFiles(sentences);

    downloader.downloadFiles(bucket, files);

    for (const file of files) {
        const filepath = `test/output/${file}`;

        expect(fs.existsSync(filepath)).toBeTruthy();
    }
});