import assert from 'assert';

import { Block } from '../model/block';
import LineBlock from '../model/line-block';
import WordBlock from '../model/work-block';
import { DetectedTextElements } from '../model/detected-text-elements';
import TextElementDetector from './text-element-detector';

type OCRResultConstructorParam = {
    documentId: string;
    bid: string;
    page: number;
    result: Block[];
}

type OCRBodyFilterResult = {
    documentId: string;
    ocrResult: {
        bid: string;
        page: number;
        result: DetectedTextElements;
    };
}

export default class OCRResult {
    readonly #documentId: string;
    readonly #bid: string;
    readonly #page: number;
    readonly #blocks: Block[];

    public constructor(data: OCRResultConstructorParam) {
        const {
            documentId, bid, page, result: blocks,
        } = data;

        const hasPage = blocks.some((block) => block.BlockType === 'PAGE');
        const hasLine = blocks.some((block) => block.BlockType === 'LINE');
        const hasWord = blocks.some((block) => block.BlockType === 'WORD');
        assert(hasPage && hasLine && hasWord, 'Invalid argument creating OCRResult object');

        this.#documentId = documentId;
        this.#bid = bid;
        this.#page = page;
        this.#blocks = blocks;
    }

    public filter(): OCRBodyFilterResult {
        const textElements: DetectedTextElements = this.findTextElements();
        return {
            documentId: this.#documentId,
            ocrResult: {
                bid: this.#bid,
                page: this.#page,
                result: textElements,
            },
        };
    }

    private findTextElements(): DetectedTextElements {
        const lines = this.#blocks
            .filter((block) => block.BlockType === 'LINE')
            .map((block) => new LineBlock(block));
        const words = this.#blocks
            .filter((block) => block.BlockType === 'WORD')
            .map((block) => new WordBlock(block));
        const ted = new TextElementDetector(lines, words);
        return ted.execute();
    }
}