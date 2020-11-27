import fs from 'fs';
import S3 from '../aws-s3';

import CompleteSentence from '../../model/binder/complete-sentence';

export default class AudioDownloader {
    public sentences: CompleteSentence[];
    public audioKeys: Set<string>;

    constructor(sentences: CompleteSentence[]) {
        this.sentences = sentences;
        this.audioKeys = this.aggregateAudioKeys(sentences);
    }

    // eslint-disable-next-line
    public aggregateAudioKeys(sentences: CompleteSentence[]): Set<string> {
        const keys = new Set<string>();

        for (const sentence of sentences) {
            keys.add(sentence.audioPath);
        }
        return keys;
    }

    public getAudioKeys(): Set<string> {
        return this.audioKeys;
    }

    public async downloadFiles() {
        const s3 = new S3();

        for (const key of this.audioKeys) {
            const bucket = process.env.STT_OUTPUT_BUCKET;
            const path = `test/output/${key}`;

            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
            if (bucket) {
                // eslint-disable-next-line
                await s3.downloadObject({ bucket, key }, path);
            }
        }
    }
}