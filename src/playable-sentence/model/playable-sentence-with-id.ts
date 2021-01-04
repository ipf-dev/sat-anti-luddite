import Audio from './audio';
import PlayableSentence from './playable-sentence';

export default class PlayableSentenceWithId {
    constructor(
        public readonly text: string,
        public audio: Audio[],
        public readonly bid?: string,
        public readonly page?: number,
        public id?: string | null,
    ) {
    }

    public static buildFromSentence(sentence: PlayableSentence, id?: string | null) {
        return new PlayableSentenceWithId(
            sentence.text, sentence.audio, sentence.bid, sentence.page,
            id,
        );
    }
}
