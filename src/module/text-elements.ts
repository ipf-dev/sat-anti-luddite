import { LineBlock } from './block';

export class TextElements {
    #unclassified: Array<LineBlock>;
    #indicators: Array<LineBlock>;
    #neglictables: Array<LineBlock>;
    #paragraphs: Array<LineBlock>;
    #singleLines: Array<LineBlock>;

    constructor(lines: LineBlock[]) {
        this.#unclassified = lines;
        this.#indicators = [];
        this.#neglictables = [];
        this.#paragraphs = [];
        this.#singleLines = [];
    }

    classify() {
        this.findIndicators();
        this.findNeglictables();
        this.findParagraphs();
        this.findSingleLines();
    }

    findIndicators(lines: LineBlock[]): void {
        const indicatorPattern = /^[0-9]+$|^chapter[ ]*[0-9]+$|^page[ ]*[0-9]+$/i;
        const chapterPattern = /^chapter[ ]*[0-9]+$/i;
        const firstBlock = lines[0];
        const lastBlock = lines[lines.length - 1];
        const candidates = [];

        if (chapterPattern.test(firstBlock.Text)) {
            this.#indicators.push(firstBlock);
            const secondBlock = lines[1];
            const thirdBlock = lines[2];
            const chapterNameDistance = secondBlock.Geometry.BoundingBox.Top - firstBlock.Geometry.BoundingBox.Top;
            const bodyDistance = thirdBlock.Geometry.BoundingBox.Top - secondBlock.Geometry.BoundingBox.Top;
            const averageHeight = this.getAverageHeight(lines);
            if (secondBlock.Geometry.BoundingBox.Height > averageHeight && chapterNameDistance < bodyDistance) {
                this.#indicators.push(secondBlock);
            }
            candidates.push(lastBlock);
        } else {
            candidates.push(firstBlock);
            candidates.push(lastBlock);
        }

        candidates.forEach((block) => {
            if (indicatorPattern.test(block.Text)) {
                this.#indicators.push(block);
            }
        });
    }

    getAverageHeight(lines: LineBlock[]) {
        let height = 0;
        lines.forEach((block: LineBlock) => {
            height += block.Geometry.BoundingBox.Height;
        });
        return height / lines.length;
    }

    findNeglictables() {

    }

    findParagraphs() {

    }

    findSingleLines() {

    }
}