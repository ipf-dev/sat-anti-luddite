import OCRSentence, { OCRSentenceVO } from './ocr-sentence';
import StringUtil from '../../util/string-util';

export default class OCRPageResult {
    public readonly page: number;
    public readonly sentences: OCRSentence[] = [];

    public constructor(page: number, sentences: OCRSentenceVO[]) {
        this.page = Number(page);

        for (const sentence of sentences) {
            const text = StringUtil.stripSpecialCharacter(sentence.text);

            if (text && text.trim().length > 2) {
                this.sentences.push(new OCRSentence(sentence));
            }
        }
        this.defragmentation();
    }

    // While tokenizing sentence, some verbal text are split to multiple sentences.
    // e.g. "Oh no!", said Chip. > ["Oh no!", said Chip.]
    private defragmentation() {
        const lastIndex = this.sentences.length - 1;

        for (let i = 0; i < lastIndex; i++) {
            if (this.sentences[i].shouldConcatenate(this.sentences[i + 1])) {
                this.sentences[i].concatenate(this.sentences[i + 1]);
                this.sentences[i + 1].consumed = true;
            }
        }
    }
}