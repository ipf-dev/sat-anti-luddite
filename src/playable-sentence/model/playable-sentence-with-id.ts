import Audio from './audio';
import PlayableSentence from './playable-sentence';

export default class PlayableSentenceWithId {
    constructor(
        public readonly text: string,
        public audio: Audio[],
        public readonly bid?: string,
        public readonly page?: number,
        public id?: string,
    ) {
    }

    public static buildFromSentence(sentence: PlayableSentence, id?: string) {
        return new PlayableSentenceWithId(
            sentence.text, sentence.audio, sentence.bid, sentence.page,
            id,
        );
    }
}
