import assert from 'assert';

import Block from './block';
import { RawBlock } from './raw-block';
import WordBlock from './word-block';

const INDICATOR_X_LIMIT = 0.15;
const INDICATOR_Y_LIMIT = 0.2;
const PARAGRAPH_LINE_HEIGHT_ACCEPTABLE_DIFF = 0.38;
const MIN_OVERLAP_PREVIOUS_BLOCK = 0.1;
const MIN_OVERLAP_NEXT_BLOCK = 0.25;
const MAX_REL_DISTANCE_Y_BTW_PARAGRAPH_LINES = 1.1;
const MAX_ABS_DISTANCE_Y_BTW_PARAGRAPH_LINES = 0.02;

export default class LineBlock extends Block {
    public constructor(block: RawBlock) {
        assert(block.BlockType === 'LINE', `Invalid 'BlockType' of block argument creating LineBlock object: ${block}`);
        super(block);
    }

    public isChapter(): boolean {
        const chapterPattern = /^chapter[ ]*[0-9]+$/i;
        return chapterPattern.test(this.text)
            && this.isInIndicatorLocation()
            && this.isConfident();
    }

    public isIndicator(): boolean {
        const indicatorPattern = /^[0-9]+$|^chapter[ ]*[0-9]+$|^page[ ]*[0-9]+$/i;
        return indicatorPattern.test(this.text)
            && this.isInIndicatorLocation()
            && this.isConfident();
    }

    private isInIndicatorLocation(): boolean {
        return this.isOutOfBound(INDICATOR_X_LIMIT, INDICATOR_Y_LIMIT);
    }

    public isNegligible(averageHeight: number): boolean {
        // console.debug({
        //     text: this.text,
        //     outOfPageBound: this.outOfPageBound(),
        //     heightOutOfBound: this.heightOutOfBound(),
        //     heightOutOfAverageBound: this.heightOutOfAverageBound(averageHeight),
        //     isNotFlatSquare: this.isNotFlatSquare(),
        //     isNotConfident: !this.isConfident(),
        // });
        return this.outOfPageBound()
            || this.heightOutOfBound()
            || this.heightOutOfAverageBound(averageHeight)
            || this.isNotFlatSquare()
            || !this.isConfident();
    }

    public hasAcceptableHeightDifference(blocks: LineBlock[]): boolean {
        const { height } = this.geometry.boundingBox;
        const averageHeight = blocks.reduce((acc, block) => acc + block.geometry.boundingBox.height, 0) / blocks.length;
        return height < averageHeight * (1 + PARAGRAPH_LINE_HEIGHT_ACCEPTABLE_DIFF)
            && height > averageHeight * (1 - PARAGRAPH_LINE_HEIGHT_ACCEPTABLE_DIFF);
    }

    public findNextLine(blocks: LineBlock[]): LineBlock | undefined {
        return blocks.find((nextLine) => this.isPreviousLineOf(nextLine));
    }

    public isParentOf(word: WordBlock): boolean {
        return this.relationships
            .some((relationship) => relationship.ids.some((id) => word.equalsId(id)));
    }

    private isPreviousLineOf(nextBlock: LineBlock): boolean {
        // console.debug({
        //     currentLine: this.text,
        //     nextLine: nextBlock.text,
        //     hasWidthOverlap: this.hasEnoughWidthOverlap(nextBlock),
        //     isLocatedAbove: this.isVerticallyLocatedAsPreviousLineOf(nextBlock),
        // });

        return this.hasEnoughWidthOverlap(nextBlock)
            && this.isVerticallyLocatedAsPreviousLineOf(nextBlock);
    }

    private hasEnoughWidthOverlap(nextBlock: LineBlock): boolean {
        const { width: pWidth, left: pLeft } = this.geometry.boundingBox;
        const { width: nWidth, left: nLeft } = nextBlock.geometry.boundingBox;
        const pRight = pLeft + pWidth;
        const nRight = nLeft + nWidth;
        const overlapRight = Math.min(pRight, nRight);
        const overlapLeft = Math.max(pLeft, nLeft);
        const overlapWidth = overlapRight - overlapLeft;
        return overlapWidth > pWidth * MIN_OVERLAP_PREVIOUS_BLOCK
            && overlapWidth > nWidth * MIN_OVERLAP_NEXT_BLOCK;
    }

    private isVerticallyLocatedAsPreviousLineOf(nextBlock: LineBlock): boolean {
        const height = (this.geometry.boundingBox.height + nextBlock.geometry.boundingBox.height) / 2;
        const pBottom = this.geometry.boundingBox.top + this.geometry.boundingBox.height;
        const nTop = nextBlock.geometry.boundingBox.top;

        // console.debug({
        //     'height': height,
        //     'pBottom': pBottom,
        //     'nTop': nTop,
        //     'nTop - pBottom': nTop - pBottom,
        //     'nHeight * MAX_DISTANCE_Y_BTW_PARAGRAPH_LINES': height * MAX_REL_DISTANCE_Y_BTW_PARAGRAPH_LINES,
        // });

        const distanceY = nTop - pBottom;
        return Math.abs(distanceY) < MAX_ABS_DISTANCE_Y_BTW_PARAGRAPH_LINES
            && distanceY < height * MAX_REL_DISTANCE_Y_BTW_PARAGRAPH_LINES;
    }
}