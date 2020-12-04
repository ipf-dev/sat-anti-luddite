import S3 from '../common/aws/aws-s3';
import CompleteSentence from './model/complete-sentence';

export default class AudioUploader {
    private static readonly CONTENT_TYPE = 'audio/mpeg';

    constructor(
        readonly bid: string,
        readonly folder: string,
        readonly bucket: string,
    ) {
    }

    public async uploadFiles(sentences: CompleteSentence[]) {
        for (const sentence of sentences) {
            // eslint-disable-next-line
            await this.uploadFile(sentence);
        }
    }

    private async uploadFile(sentence: CompleteSentence) {
        const filename = sentence.getSlicedAudioFilename();
        const path = `/tmp/output/${this.bid}/${filename}`;
        const key = `${this.folder}/resource/${filename}`;
        const s3 = new S3();

        await s3.putObject({
            bucket: this.bucket,
            key: key,
            contentType: AudioUploader.CONTENT_TYPE,
        }, path);
    }
}