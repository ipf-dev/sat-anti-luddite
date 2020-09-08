import LineBlock from '../model/line-block';

export type ParagraphLines = {
    lines: LineBlock[];
}

export default class ParagraphLineDetector {
    readonly #unclassified: LineBlock[];

    public constructor(lines: LineBlock[]) {
        this.#unclassified = lines;
    }

    public execute(): ParagraphLines[] {
        const result: ParagraphLines[] = [];

        this.#unclassified.forEach((firstBlock) => {
            if (this.isAlreadyClassified(result, firstBlock)) return;
            const lines = [firstBlock];
            const heightFiltered = this.filterByHeight(firstBlock);
            if (heightFiltered.length === 0) return;

            let next = firstBlock.findNextLine(heightFiltered);
            if (next === undefined) return;

            while (next !== undefined) {
                const index = heightFiltered.indexOf(next);
                heightFiltered.splice(index, 1);
                lines.push(next);
                next = next.findNextLine(heightFiltered);
            }

            const paragraph: ParagraphLines = {
                lines: lines,
            };

            result.push(paragraph);
        });
        return result;
    }

    private isAlreadyClassified(result: ParagraphLines[], block: LineBlock): boolean {
        return result.some((p) => p.lines.some((b) => b === block));
    }

    private filterByHeight(firstBlock: LineBlock): LineBlock[] {
        const heightFiltered = this.#unclassified.reduce((acc, block) => {
            if (block !== firstBlock && block.hasAcceptableHeightDifference(acc)) {
                acc.push(block);
            }
            return acc;
        }, [firstBlock]);
        heightFiltered.shift();
        return heightFiltered;
    }
}