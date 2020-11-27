import fs from 'fs';

import CompleteSentence from '../../../src/model/binder/complete-sentence';
import AudioDownloader from '../../../src/module/binder/audio-downloader';

const bid = process.env.BID || '';
const path = `test/output/complete-sentence-${bid}.json`;
const jsonString = fs.readFileSync(path, 'utf-8');
const sentences: CompleteSentence[] = JSON.parse(jsonString);
const audioDownloader = new AudioDownloader(sentences);

beforeAll(() => {
    const audioKeys: Set<string> = audioDownloader.getAudioKeys();

    for (const key of audioKeys.keys()) {
        const downloadedPath = `test/output/${key}`;

        fs.unlinkSync(downloadedPath);
    }
});

test('When_Aggregate_Audio_Keys', () => {
    const audioKeys: Set<string> = audioDownloader.getAudioKeys();

    expect(audioKeys.size).toBeGreaterThanOrEqual(1);
});

test('When_Download_Audios', () => {
    audioDownloader.downloadFiles();

    const audioKeys: Set<string> = audioDownloader.getAudioKeys();

    for (const key of audioKeys.keys()) {
        const downloadedPath = `test/output/${key}`;

        expect(fs.existsSync(downloadedPath)).toBeTruthy();
    }
});