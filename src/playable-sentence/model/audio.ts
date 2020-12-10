import fs from 'fs';

import S3 from '../../common/aws/aws-s3';
import FileUtil from '../../common/util/file-util';

export default class Audio {
    constructor(
        public pronunciation: 'UK' | 'US',
        public url: string,
    ) {
        fs.mkdirSync('/tmp/output', { recursive: true });
    }

    public static build(audio: any): Audio {
        return new Audio(
            audio.pronunciation || 'US',
            audio.url,
        );
    }

    public async prepare(s3: S3, uuid: string): Promise<void> {
        const filename = `${uuid}-${this.pronunciation}.mp3`;
        const path = `/tmp/output/${filename}`;

        await FileUtil.download(this.url, path);
        await this.upload(s3, filename, path);
        fs.unlinkSync(path);
    }

    private async upload(s3: S3, filename: string, path: string) {
        const bucket = process.env.PLAYABLE_SENTENCE_BUCKET || '';
        await s3.putObject({
            bucket: bucket,
            key: filename,
            contentType: 'audio/mpeg',
            acl: 'public-read',
        }, path);
        this.url = `https://${bucket}.s3.ap-northeast-2.amazonaws.com/${filename}`;
    }
}
