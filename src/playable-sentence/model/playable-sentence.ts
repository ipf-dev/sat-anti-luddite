import shortUUID from 'short-uuid';
import assert from 'assert';

import S3 from '../../common/aws/aws-s3';
import ArrayUtil from '../../common/util/array-util';
import Audio from './audio';

export default class PlayableSentence {
    public constructor(
        public readonly text: string,
        public audio: Audio[],
        public readonly bid?: string,
        public readonly page?: number,
    ) {
    }

    public static build(sentence: any): PlayableSentence {
        let audios: Audio[] = sentence.audio.map((a: any) => Audio.build(a));
        audios = ArrayUtil.removeDuplicatesByProperty(audios, 'pronunciation');
        assert(audios.length > 0, 'Sentence must contain at least one audio.');

        return new PlayableSentence(
            sentence.text,
            audios,
            sentence.bid,
            sentence.page,
        );
    }

    public async prepareAudio(s3: S3): Promise<void> {
        const uuid = shortUUID.generate();
        this.audio = await Promise.all(this.audio.map(async (audio) => {
            await audio.prepare(s3, uuid);
            return audio;
        }));
    }
}
