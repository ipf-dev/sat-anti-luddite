import assert from 'assert';

import { RawBlock } from '../model/raw-block';
import LineBlock from '../model/line-block';
import WordBlock from '../model/word-block';
import { FilteredTextElements } from '../model/filtered-text-elements';
import TextElementFilter from './text-element-filter';

export type OCRBodyFilterResult = {
    bid: string;
    page: number;
    result: FilteredTextElements;
}

type OCRResultConstructorParam = {
    documentId: string;
    bid: string;
    page: number;
    result: RawBlock[];
}

export default class OCRResult {
    private readonly documentId: string;
    private readonly bid: string;
    private readonly page: number;
    private readonly blocks: RawBlock[];
    private textElements: FilteredTextElements | undefined;

    public constructor(data: OCRResultConstructorParam) {
        const {
            documentId, bid, page, result: blocks,
        } = data;

        this.documentId = documentId;
        this.bid = bid;
        this.page = page;
        this.blocks = blocks;
        this.textElements = undefined;

        const hasPage = this.blocks.some(OCRResult.isPageBlock);
        const hasLine = this.blocks.some(OCRResult.isLineBlock);
        const hasWord = this.blocks.some(OCRResult.isWordBlock);
        assert(hasPage && hasLine && hasWord, 'Invalid argument creating OCRResult object');
    }

    public filter(): void {
        this.textElements = this.filterTextElements();
    }

    public getFilteredResult(): OCRBodyFilterResult {
        assert(this.textElements, 'Must filter before retrieve result');
        return {
            bid: this.bid,
            page: this.page,
            result: this.textElements,
        };
    }

    private filterTextElements(): FilteredTextElements {
        const lines = this.getLineBlocks()
            .map((block) => new LineBlock(block));
        const words = this.getWordBlocks()
            .map((block) => new WordBlock(block));
        const filter = new TextElementFilter(lines, words);
        filter.execute();
        return filter.getResult();
    }

    private getLineBlocks(): RawBlock[] {
        return this.blocks.filter(OCRResult.isLineBlock);
    }

    private getWordBlocks(): RawBlock[] {
        return this.blocks.filter(OCRResult.isWordBlock);
    }

    private static isPageBlock(block: RawBlock): boolean {
        return block.BlockType === 'PAGE';
    }

    private static isLineBlock(block: RawBlock): boolean {
        return block.BlockType === 'LINE';
    }

    private static isWordBlock(block: RawBlock): boolean {
        return block.BlockType === 'WORD';
    }
}