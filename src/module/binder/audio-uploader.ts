import S3 from '../aws-s3';
import CompleteSentence from '../../model/binder/complete-sentence';

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
        const path = `test/output/${this.bid}/${filename}`;
        const key = `${this.folder}/resource/${filename}`;
        const s3 = new S3();

        await s3.putObject({
            bucket: this.bucket,
            key: key,
            contentType: AudioUploader.CONTENT_TYPE,
        }, path);
    }
}