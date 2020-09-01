import assert from 'assert';

import { Block } from '../model/block';
import LineBlock from '../model/line-block';
import { TextElements } from '../model/text-elements';
import TextElementDetector from './text-element-detector';

export default class OCRResult {
    readonly #blocks: Block[];

    public constructor(blocks: Block[]) {
        const hasPage = blocks.some((block) => block.BlockType === 'PAGE');
        const hasLine = blocks.some((block) => block.BlockType === 'LINE');
        const hasWord = blocks.some((block) => block.BlockType === 'WORD');
        assert(hasPage && hasLine && hasWord, 'Invalid argument creating OCRResult object');

        this.#blocks = blocks;
    }

    public findTextElements(): TextElements {
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
}