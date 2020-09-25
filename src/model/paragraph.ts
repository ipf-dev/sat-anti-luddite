import LineBlock from './line-block';
import WordBlock from './word-block';

export default class Paragraph {
    lines: LineBlock[];
    words: WordBlock[];

    public constructor(lines: LineBlock[], words: WordBlock[]) {
        this.lines = lines;
        this.words = words;
    }
}