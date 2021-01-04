import PlayableSentenceWithId from './model/playable-sentence-with-id';

export default class AddSentenceEsRequestBody {
    public static generate(
        index: string,
        sentences: PlayableSentenceWithId[],
    ): any[] {
        return sentences.flatMap((sentence) => {
            const action = {
                index: {
                    _index: index,
                    ...sentence.id && { _id: sentence.id },
                },
            };
            return [action, sentence];
        });
    }
}
