import assert from 'assert';

import TextElements from './text-elements';
import {
    Block, PageBlock, LineBlock, WordBlock
} from './block';

export default class OCRResult {
    readonly #pages: PageBlock[];
    readonly #lines: LineBlock[];
    readonly #words: WordBlock[];
    readonly #elements: TextElements = new TextElements();

    constructor(ocrResult: Block[]) {
        this.#pages = [];
        this.#lines = [];
        this.#words = [];

        ocrResult.forEach((block) => {
            switch (block.BlockType) {
            case 'PAGE': this.#pages.push(block as PageBlock);
                break;
            case 'LINE': this.#lines.push(block as LineBlock);
                break;
            case 'WORD': this.#words.push(block as WordBlock);
                break;
            }
        });

        assert(!this.isEmpty(), 'OCR Result is empty');
    }

    isEmpty(): boolean {
        return this.#pages.length < 1 && this.#lines.length < 1;
    }

    classifyTextElements(): void {
        this.#elements.classify(this.#lines);
    }

    getIndicators(): LineBlock[] {
        return this.#elements.getIndicators();
    }
}