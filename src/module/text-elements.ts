import assert from 'assert';

import { LineBlock } from './block';
import TextElement from './text-element';

export default class TextElements {
    readonly #unclassified: TextElement[];
    readonly #averageHeight: number = 0;
    readonly #indicators: TextElement[];
    readonly #neglectables: TextElement[];
    readonly #paragraphs: TextElement[];
    readonly #singleLines: TextElement[];

    constructor(lines: LineBlock[]) {
        this.#unclassified = Array.from(lines, (line) => new TextElement(line));
        this.#averageHeight = this.getAverageHeight();
        this.#indicators = [];
        this.#neglectables = [];
        this.#paragraphs = [];
        this.#singleLines = [];
    }

    getAverageHeight(): number {
        assert(this.#unclassified.length > 0, '');
        let height = 0;
        this.#unclassified.forEach((block: LineBlock) => {
            height += block.Geometry.BoundingBox.Height;
        });
        return height / this.#unclassified.length;
    }

    classify(): void {
        this.findIndicators();
        this.findNeglectable();
        this.findParagraphs();
        this.findSingleLines();
    }

    findIndicators(): void {
        const indicatorPattern = /^[0-9]+$|^chapter[ ]*[0-9]+$|^page[ ]*[0-9]+$/i;
        const chapterPattern = /^chapter[ ]*[0-9]+$/i;
        const firstBlock = this.#unclassified[0];
        const secondBlock = this.#unclassified[1];
        const thirdBlock = this.#unclassified[2];
        const lastBlock = this.#unclassified[this.#unclassified.length - 1];
        const candidates: TextElement[] = [];

        if (chapterPattern.test(firstBlock.Text)) {
            this.classifyTextElementByIndex(this.#indicators, 0);
            const chapterNameDistance = secondBlock.getDistanceY(firstBlock);
            const bodyDistance = thirdBlock.getDistanceY(secondBlock);
            if (secondBlock.Geometry.BoundingBox.Height > this.#averageHeight && chapterNameDistance < bodyDistance) {
                this.classifyTextElementByElement(this.#indicators, secondBlock);
            }
            candidates.push(lastBlock);
        } else {
            candidates.push(firstBlock);
            candidates.push(lastBlock);
        }

        candidates.forEach((element) => {
            if (indicatorPattern.test(element.Text)) {
                this.classifyTextElementByElement(this.#indicators, element);
            }
        });
    }

    findNeglectable(): void {

    }

    findParagraphs(): void {

    }

    findSingleLines(): void {

    }

    classifyTextElementByElement(resultArray: TextElement[], element: TextElement): void {
        const index = this.#unclassified.indexOf(element);
        if (index > -1) {
            this.#unclassified.splice(index, 1);
            resultArray.push(element);
        }
    }

    classifyTextElementByIndex(resultArray: TextElement[], index: number): void {
        const element = this.#unclassified[index];
        this.#unclassified.splice(index, 1);
        resultArray.push(element);
    }

    getIndicators(): LineBlock[] {
        return this.#indicators;
    }
}