import assert from 'assert';

import { Block } from './block';
import Geometry from './geometry';
import Relationship from './relationship';
import WordBlock from './work-block';
import MathUtil from '../util/math-util';

const PADDING_X = 0.067;
const PADDING_Y = 0.05;
const INDICATOR_X_LIMIT = 0.15;
const INDICATOR_Y_LIMIT = 0.2;
const MIN_HEIGHT = 0.015;
const MAX_HEIGHT = 0.09;
const MIN_HEIGHT_CMP_AVERAGE = 0.5;
const MAX_HEIGHT_CMP_AVERAGE = 2;
const MIN_CONFIDENCE = 75;
const ACCEPTABLE_SIDE_SLOPE_IN_DEGREE = 2;

const PARAGRAPH_LINE_HEIGHT_ACCEPTABLE_DIFF = 0.38;
const MIN_OVERLAP_PREVIOUS_BLOCK = 0.1;
const MIN_OVERLAP_NEXT_BLOCK = 0.25;
const MAX_REL_DISTANCE_Y_BTW_PARAGRAPH_LINES = 1.1;
const MAX_ABS_DISTANCE_Y_BTW_PARAGRAPH_LINES = 0.02;

export default class LineBlock {
    readonly confidence: number;
    readonly text: string;
    readonly geometry: Geometry;
    readonly id: string;
    readonly relationships: Relationship[];

    public constructor(block: Block) {
        assert(block.BlockType === 'LINE', `Invalid 'BlockType' of block argument creating LineBlock object: ${block}`);
        this.confidence = block.Confidence ===  undefined ? 0 : block.Confidence;
        this.text = block.Text === undefined ? '' : block.Text;
        this.geometry = new Geometry(block.Geometry);
        this.id = block.Id;
        this.relationships = block.Relationships
            ? block.Relationships.map((rel) => new Relationship(rel))
            : [];
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

    private isOutOfBound(x: number, y: number): boolean {
        const {
            left, width, top, height,
        } = this.geometry.boundingBox;
        const rightDistance = 1 - (left + width);
        const bottomDistance = 1 - (top + height);
        return left < x
            || rightDistance < y
            || top < x
            || bottomDistance < y;
    }

    public isNegligible(averageHeight: number): boolean {
        console.debug({
            text: this.text,
            outOfPageBound: this.outOfPageBound(),
            heightOutOfBound: this.heightOutOfBound(),
            heightOutOfAverageBound: this.heightOutOfAverageBound(averageHeight),
            isNotFlatSquare: this.isNotFlatSquare(),
            isNotConfident: !this.isConfident(),
        });
        return this.outOfPageBound()
            || this.heightOutOfBound()
            || this.heightOutOfAverageBound(averageHeight)
            || this.isNotFlatSquare()
            || !this.isConfident();
    }

    private outOfPageBound(): boolean {
        return this.isOutOfBound(PADDING_X, PADDING_Y);
    }

    private heightOutOfBound(): boolean {
        const { height } = this.geometry.boundingBox;
        return height < MIN_HEIGHT || height > MAX_HEIGHT;
    }

    private heightOutOfAverageBound(averageHeight: number): boolean {
        const { height } = this.geometry.boundingBox;
        const heightCmpAverage = height / averageHeight;
        return heightCmpAverage < MIN_HEIGHT_CMP_AVERAGE || heightCmpAverage > MAX_HEIGHT_CMP_AVERAGE;
    }

    private isNotFlatSquare(): boolean {
        const isSquare = this.geometry.polygon.length === 4;
        const isFlat = this.getUpperSideSlope() < ACCEPTABLE_SIDE_SLOPE_IN_DEGREE
            && this.getLowerSideSlope() < ACCEPTABLE_SIDE_SLOPE_IN_DEGREE;
        // console.debug({
        //     text: this.text,
        //     upperSideSlope: this.getUpperSideSlope(),
        //     lowerSideSlope: this.getLowerSideSlope(),
        // });
        return !isSquare || !isFlat;
    }

    private getUpperSideSlope(): number {
        return this.getSideSlope(this.geometry.polygon[0].y, this.geometry.polygon[1].y);
    }

    private getLowerSideSlope(): number {
        return this.getSideSlope(this.geometry.polygon[2].y, this.geometry.polygon[3].y);
    }

    private getSideSlope(y1: number, y2: number) {
        const h = MathUtil.diff(y1, y2);
        const w = this.geometry.boundingBox.width;
        return MathUtil.getBaseAngleOfRightAngledTriangle(w, h);
    }

    private isConfident(): boolean {
        return this.confidence > MIN_CONFIDENCE;
    }

    public getTopDistance(block: LineBlock): number {
        return this.geometry.boundingBox.top - block.geometry.boundingBox.top;
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
            .some((relationship) => relationship.ids.some((id) => id === word.id));
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