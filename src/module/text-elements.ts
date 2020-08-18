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

    findIndicators() {

    }

    findNeglictables() {

    }

    findParagraphs() {

    }

    findSingleLines() {

    }
}