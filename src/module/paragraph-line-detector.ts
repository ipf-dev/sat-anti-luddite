import LineBlock from '../model/line-block';

export type ParagraphLines = {
    lines: LineBlock[];
}

export default class ParagraphLineDetector {
    private readonly result: ParagraphLines[];
    private readonly candidates: LineBlock[];
    private currentBlock: LineBlock | undefined;

    public constructor(lines: LineBlock[]) {
        this.result = [];
        this.candidates = lines;
        this.filterByHeight = this.filterByHeight.bind(this);
    }

    public execute(): ParagraphLines[] {
        this.candidates.forEach((block) => {
            this.currentBlock = block;
            if (this.isAlreadyClassified()) return;
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

            const paragraph: ParagraphLines = { lines };

            this.result.push(paragraph);
        });
        return this.result;
    }

    private isAlreadyClassified(): boolean {
        return this.result.some((p) => p.lines.some((b) => b === this.currentBlock));
    }

    private filterAllByCurrentBlockHeight(): LineBlock[] {
        const heightFiltered = this.candidates.reduce(this.filterByHeight, [this.currentBlock]);
        heightFiltered.shift();
        return heightFiltered;
    }

    private filterByHeight(acc: any[], block: LineBlock): any[] {
        if (block !== this.currentBlock && block.hasAcceptableHeightDifference(acc)) {
            acc.push(block);
        }
        return acc;
    }
}