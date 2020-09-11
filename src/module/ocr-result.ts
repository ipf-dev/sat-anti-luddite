import assert from 'assert';

import { Block } from '../model/block';
import LineBlock from '../model/line-block';
import WordBlock from '../model/work-block';
import { FilteredTextElements } from '../model/filtered-text-elements';
import TextElementFilter from './text-element-filter';

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
        result: FilteredTextElements;
    };
}

export default class OCRResult {
    private readonly documentId: string;
    private readonly bid: string;
    private readonly page: number;
    private readonly blocks: Block[];
    private textElements: FilteredTextElements | undefined;

    public constructor(data: OCRResultConstructorParam) {
        const {
            documentId, bid, page, result: blocks,
        } = data;

        const hasPage = blocks.some(OCRResult.isPageBlock);
        const hasLine = blocks.some(OCRResult.isLineBlock);
        const hasWord = blocks.some(OCRResult.isWordBlock);
        assert(hasPage && hasLine && hasWord, 'Invalid argument creating OCRResult object');

        this.documentId = documentId;
        this.bid = bid;
        this.page = page;
        this.blocks = blocks;
        this.textElements = undefined;
    }

    public filter(): void {
        this.textElements = this.filterTextElements();
    }

    public getFilteredResult(): OCRBodyFilterResult {
        assert(this.textElements, 'Must filter before retrieve result');
        return {
            documentId: this.documentId,
            ocrResult: {
                bid: this.bid,
                page: this.page,
                result: this.textElements,
            },
        };
    }

    private filterTextElements(): FilteredTextElements {
        const lines = this.getLineBlocks()
            .map((block) => new LineBlock(block));
        const words = this.getWordBlocks()
            .map((block) => new WordBlock(block));
        const filter = new TextElementFilter(lines, words);
        return filter.execute();
    }

    private getLineBlocks(): Block[] {
        return this.blocks.filter(OCRResult.isLineBlock);
    }

    private getWordBlocks(): Block[] {
        return this.blocks.filter(OCRResult.isWordBlock);
    }

    private static isPageBlock(block: Block): boolean {
        return block.BlockType === 'PAGE';
    }

    private static isLineBlock(block: Block): boolean {
        return block.BlockType === 'LINE';
    }

    private static isWordBlock(block: Block): boolean {
        return block.BlockType === 'WORD';
    }
}