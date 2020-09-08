import assert from 'assert';

import { Block } from '../model/block';
import LineBlock from '../model/line-block';
import { TextElements } from '../model/text-elements';
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
        result: {
            lines: TextElements;
            words: Block[];
        }
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
        const textElements: TextElements = this.findTextElements();
        return {
            documentId: this.#documentId,
            ocrResult: {
                bid: this.#bid,
                page: this.#page,
                result: {
                    lines: textElements,
                    words: this.getWords(),
                },
            },
        };
    }

    private findTextElements(): TextElements {
        const lines = this.#blocks
            .filter((block) => block.BlockType === 'LINE')
            .map((block) => new LineBlock(block));
        const averageHeight = this.getAverageWordHeight();
        const ted = new TextElementDetector(lines, averageHeight);
        return ted.execute();
    }

    private getAverageWordHeight(): number {
        const words = this.#blocks
            .filter((block) => block.BlockType === 'WORD' && block.Confidence !== undefined && block.Confidence > 50);
        const totalHeight = words
            .reduce((acc, block) => acc + block.Geometry.BoundingBox.Height, 0);
        return totalHeight / words.length;
    }

    public getWords(): Block[] {
        return this.#blocks.filter((block) => block.BlockType === 'WORD');
    }
}