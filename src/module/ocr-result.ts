import assert from 'assert';

import { TextElements } from './text-elements';
import { Block, PageBlock, LineBlock, WordBlock } from './block';

export class OCRResult {
    #pages: PageBlock[];
    #lines: LineBlock[];
    #words: WordBlock[];
    #elems: TextElements;

    constructor(ocrResult: ReadonlyArray<Block>) {
        this.#pages = [];
        this.#lines = [];
        this.#words = [];

        ocrResult.forEach((block) => {
            switch(block.BlockType) {
                case 'PAGE': this.#pages.push(block as PageBlock);
                break;
                case 'LINE': this.#lines.push(block as LineBlock);
                break;
                case 'WORD': this.#words.push(block as WordBlock);
                break;
            }
        });

        assert(!this.isEmpty(), 'OCR Result is empty');
        this.#elems = new TextElements(this.#lines);
    }

    isEmpty(): boolean {
        return this.#pages.length < 1 && this.#lines.length < 1;
    }

    classify(): void {
        this.#elems.classify();
    }
}