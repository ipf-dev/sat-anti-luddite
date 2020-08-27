import LineBlock from './line-block';
import Paragraph from './paragraph';

export default class ParagraphDetector {
    readonly #unclassified: LineBlock[];

    constructor(lines: LineBlock[]) {
        this.#unclassified = lines;
    }

    execute(): Paragraph[] {
        const result: Paragraph[] = [];

        this.#unclassified.forEach((firstBlock) => {
            if (this.isAlreadyClassified(result, firstBlock)) return;
            const paragraphLines = [firstBlock];
            const heightFiltered = this.filterByHeight(firstBlock);
            if (heightFiltered.length === 0) return;

            let next = firstBlock.findNextLine(heightFiltered);
            if (next === undefined) return;

            while (next !== undefined) {
                const index = heightFiltered.indexOf(next);
                heightFiltered.splice(index, 1);
                paragraphLines.push(next);
                next = next.findNextLine(heightFiltered);
            }

            result.push(new Paragraph(paragraphLines));
        });
        return result;
    }

    isAlreadyClassified(result: Paragraph[], block: LineBlock): boolean {
        return result.some((p) => p.blocks.some((b) => b === block));
    }

    filterByHeight(firstBlock: LineBlock): LineBlock[] {
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