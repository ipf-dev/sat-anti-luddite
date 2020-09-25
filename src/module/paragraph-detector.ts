import LineBlock from '../model/line-block';
import WordBlock from '../model/word-block';
import Paragraph from '../model/paragraph';

export default class ParagraphDetector {
    private readonly result: Paragraph[];
    private readonly lines: LineBlock[];
    private readonly words: WordBlock[];
    private currentBlock: LineBlock | undefined;

    public constructor(lines: LineBlock[], words: WordBlock[]) {
        this.result = [];
        this.lines = lines;
        this.words = words;
        this.filterByHeight = this.filterByHeight.bind(this);
    }

    public execute(): void {
        this.lines.forEach((block) => {
            this.currentBlock = block;
            if (this.isAlreadyInParagraph()) return;
            const lines = [this.currentBlock];
            const heightFiltered = this.filterAllByCurrentBlockHeight();
            if (heightFiltered.length === 0) return;

            let next = this.currentBlock.findNextLine(heightFiltered);
            if (next === undefined) return;

            while (next !== undefined) {
                const index = heightFiltered.indexOf(next);
                heightFiltered.splice(index, 1);
                lines.push(next);
                next = next.findNextLine(heightFiltered);
            }

            const words: WordBlock[] = this.findChildren(lines);
            const paragraph = new Paragraph(lines, words);
            this.result.push(paragraph);
        });
    }

    public getResult(): Paragraph[] {
        return this.result;
    }

    private isAlreadyInParagraph(): boolean {
        return this.result.some((p) => p.lines.some((b) => b === this.currentBlock));
    }

    private filterAllByCurrentBlockHeight(): LineBlock[] {
        const heightFiltered = this.lines.reduce(this.filterByHeight, [this.currentBlock]);
        heightFiltered.shift();
        return heightFiltered;
    }

    private filterByHeight(acc: any[], block: LineBlock): any[] {
        if (block !== this.currentBlock && block.hasAcceptableHeightDifference(acc)) {
            acc.push(block);
        }
        return acc;
    }

    private findChildren(lines: LineBlock[]): WordBlock[] {
        let result: WordBlock[] = [];
        lines.forEach((line) => {
            result = result.concat(this.words.filter((word) => line.isParentOf(word)));
        });
        return result;
    }
}