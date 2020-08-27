import assert from 'assert';

import { Geometry, Block } from './block';

const PADDING_X = 0.05;
const PADDING_Y = 0.05;
const MIN_HEIGHT = 0.017;
const MAX_HEIGHT = 0.055;
const MIN_HEIGHT_CMP_AVERAGE = 0.5;
const MAX_HEIGHT_CMP_AVERAGE = 1.5;
const MIN_CONFIDENCE = 75;

const PARAGRAPH_LINE_HEIGHT_ACCEPTABLE_DIFF = 0.17;
const MIN_OVERLAP_PREVIOUS_BLOCK = 0.25;
const MIN_OVERLAP_NEXT_BLOCK = 0.65;
const MAX_DISTANCE_Y_BTW_PARAGRAPH_LINES = 0.5;

export default class LineBlock {
    readonly confidence: number;
    readonly text: string;
    readonly geometry: Geometry;
    readonly id: string;
    readonly relationships: object[];
    readonly height: number;

    constructor(block: Block) {
        assert(block.BlockType === 'LINE', `Invalid 'BlockType' of block argument creating LineBlock object: ${block}`);
        this.confidence = block.Confidence ===  undefined ? 0 : block.Confidence;
        this.text = block.Text === undefined ? '' : block.Text;
        this.geometry = block.Geometry;
        this.height = block.Geometry.BoundingBox.Height;
        this.id = block.Id;
        this.relationships = block.Relationships === undefined ? [] : block.Relationships;
    }

    isChapter(): boolean {
        const chapterPattern = /^chapter[ ]*[0-9]+$/i;
        return chapterPattern.test(this.text);
    }

    isIndicator(): boolean {
        const indicatorPattern = /^[0-9]+$|^chapter[ ]*[0-9]+$|^page[ ]*[0-9]+$/i;
        return indicatorPattern.test(this.text);
    }

    outOfPageBound(): boolean {
        const {
            Left: left,
            Width: width,
            Top: top,
            Height: height,
        } = this.geometry.BoundingBox;
        const paddingLeft = left;
        const paddingRight = 1 - (left + width);
        const paddingTop = top;
        const paddingBottom = 1 - (top + height);
        return paddingLeft < PADDING_X
            || paddingRight < PADDING_X
            || paddingTop < PADDING_Y
            || paddingBottom < PADDING_Y;
    }

    heightOutOfBound(): boolean {
        return this.height < MIN_HEIGHT || this.height > MAX_HEIGHT;
    }

    heightOutOfAverageBound(averageHeight: number): boolean {
        return this.height < averageHeight * MIN_HEIGHT_CMP_AVERAGE || this.height > averageHeight * MAX_HEIGHT_CMP_AVERAGE;
    }

    isNotFlatSquare(): boolean {
        const isSquare = this.geometry.Polygon.length === 4;
        const isFlat = this.geometry.Polygon[0].Y === this.geometry.Polygon[1].Y
            && this.geometry.Polygon[2].Y === this.geometry.Polygon[3].Y;
        return !isSquare || !isFlat;
    }

    isNotConfident(): boolean {
        return this.confidence < MIN_CONFIDENCE;
    }

    getTopDistance(block: LineBlock): number {
        return this.geometry.BoundingBox.Top - block.geometry.BoundingBox.Top;
    }

    hasAcceptableHeightDifference(blocks: LineBlock[]): boolean {
        const averageHeight = blocks.reduce((acc, block) => acc + block.height, 0) / blocks.length;
        return this.height < averageHeight * (1 + PARAGRAPH_LINE_HEIGHT_ACCEPTABLE_DIFF)
            && this.height > averageHeight * (1 - PARAGRAPH_LINE_HEIGHT_ACCEPTABLE_DIFF);
    }

    findNextLine(blocks: LineBlock[]): LineBlock | undefined {
        return blocks.find((nextLine) => this.isPreviousLineOf(nextLine));
    }

    isPreviousLineOf(nextBlock: LineBlock): boolean {
        return this.hasWidthOverlap(nextBlock)
            && this.isLocatedAbove(nextBlock);
    }

    hasWidthOverlap(nextBlock: LineBlock): boolean {
        const { Width: pWidth, Left: pLeft } = this.geometry.BoundingBox;
        const { Width: nWidth, Left: nLeft } = nextBlock.geometry.BoundingBox;
        const pRight = pLeft + pWidth;
        const nRight = nLeft + nWidth;
        const overlapRight = Math.min(pRight, nRight);
        const overlapLeft = Math.max(pLeft, nLeft);
        const overlapWidth = overlapRight - overlapLeft;
        return overlapWidth > pWidth * MIN_OVERLAP_PREVIOUS_BLOCK
            && overlapWidth > nWidth * MIN_OVERLAP_NEXT_BLOCK;
    }

    isLocatedAbove(nextBlock: LineBlock): boolean {
        const pBottom = this.geometry.BoundingBox.Top + this.geometry.BoundingBox.Height;
        const nTop = nextBlock.geometry.BoundingBox.Top;
        return nTop - pBottom > 0 && nTop - pBottom < this.height * MAX_DISTANCE_Y_BTW_PARAGRAPH_LINES;
    }
}