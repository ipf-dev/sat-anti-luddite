import fs from 'fs';

import CompleteSentence, { CompleteSentenceBuilder } from '../../src/sentence-binder/model/complete-sentence';
import AudioUploader from '../../src/sentence-binder/audio-uploader';

const bid = process.env.TEST_BID || '';
const folder = process.env.TEST_FOLDER || '';
const bucket = process.env.TEST_BUCKET || '';
const json = fs.readFileSync(`test/output/report/complete-sentence-${bid}.json`, 'utf-8');
const rows = JSON.parse(json);

const sentences: CompleteSentence[] = [];

for (const row of rows) {
    sentences.push(new CompleteSentenceBuilder().buildFromJSON(row));
}

test('When_Upload_Audios', async () => {
    const uploader = new AudioUploader(bid, folder, bucket);

    await uploader.uploadFiles(sentences);
}, 1000 * 15);