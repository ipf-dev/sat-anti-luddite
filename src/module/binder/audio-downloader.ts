import fs from 'fs';
import S3 from '../aws-s3';

import CompleteSentence from '../../model/binder/complete-sentence';

export default class AudioDownloader {
    constructor(
        readonly bid: string,
        readonly folder: string,
        readonly bucket: string,
    ) {
    }

    public aggregateFiles(sentences: CompleteSentence[]): Set<string> {
        const filenames = new Set<string>();

        for (const sentence of sentences) {
            const filename = sentence.getSourceFilename(this.bid);

            filenames.add(filename);
        }
        return filenames;
    }

    public async downloadFiles(filenames: Set<string>) {
        for (const filename of filenames) {
            // eslint-disable-next-line
            await this.downloadFile(filename);
        }
    }

    private async downloadFile(filename: string) {
        const path = `/tmp/output/${filename}`;
        const key = `${this.folder}/do-not-publish/${filename}`;
        const s3 = new S3();

        if (fs.existsSync(path)) fs.unlinkSync(path);

        await s3.downloadObject({
            bucket: this.bucket,
            key: key,
        }, path);
    }
}