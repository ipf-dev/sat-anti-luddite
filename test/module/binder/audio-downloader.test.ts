import fs from 'fs';

import CompleteSentence, { CompleteSentenceBuilder } from '../../../src/model/binder/complete-sentence';
import AudioDownloader from '../../../src/module/binder/audio-downloader';

const bid = process.env.TEST_BID || '';
const folder = process.env.TEST_FOLDER || '';
const bucket = process.env.TEST_BUCKET || '';
const json = fs.readFileSync(`test/output/report/complete-sentence-${bid}.json`, 'utf-8');
const rows = JSON.parse(json);

const sentences: CompleteSentence[] = [];
const downloader = new AudioDownloader(bid, folder, bucket);

for (const row of rows) {
    sentences.push(new CompleteSentenceBuilder().buildFromJSON(row));
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

    downloader.downloadFiles(files);

    for (const file of files) {
        const filepath = `test/output/${file}`;

        expect(fs.existsSync(filepath)).toBeTruthy();
    }
});