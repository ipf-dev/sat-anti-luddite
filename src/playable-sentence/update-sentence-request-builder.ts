import PlayableSentenceWithId from './model/playable-sentence-with-id';

export default class UpdateSentenceRequestBuilder {
    constructor(
        private readonly index: string,
        private readonly sentences: PlayableSentenceWithId[],
    ) {
    }

    public build(): any[] {
        return this.sentences.flatMap((sentence) => {
            const action = {
                index: {
                    _index: this.index,
                    ...sentence.id && { _id: sentence.id },
                },
            };
            return [action, sentence];
        });
    }
}
