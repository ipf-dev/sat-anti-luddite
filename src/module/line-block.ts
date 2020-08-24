import assert from 'assert';

import { Geometry, Block } from './block';

const PADDING_X = 0.05;
const PADDING_Y = 0.05;
const MIN_HEIGHT = 0.017;
const MAX_HEIGHT = 0.055;
const MIN_HEIGHT_CMP_AVERAGE = 0.5;
const MAX_HEIGHT_CMP_AVERAGE = 1.5;
const MIN_CONFIDENCE = 75;

export default class LineBlock {
    confidence: number;
    text: string;
    geometry: Geometry;
    id: string;
    relationships: object[];

    constructor(block: Block) {
        assert(block.BlockType === 'LINE', `Invalid 'BlockType' of block argument creating LineBlock object: ${block}`);
        this.confidence = block.Confidence ===  undefined ? 0 : block.Confidence;
        this.text = block.Text === undefined ? '' : block.Text;
        this.geometry = block.Geometry;
        this.id = block.Id;
        this.relationships = block.Relationships === undefined ? [] : block.Relationships;
    }

    isChapter() {
        const chapterPattern = /^chapter[ ]*[0-9]+$/i;
        return chapterPattern.test(this.text);
    }

    isIndicator() {
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
        const height = this.geometry.BoundingBox.Height;
        return height < MIN_HEIGHT || height > MAX_HEIGHT;
    }

    heightOutOfAverageBound(averageHeight: number): boolean {
        const height = this.geometry.BoundingBox.Height;
        return height < averageHeight * MIN_HEIGHT_CMP_AVERAGE || height > averageHeight * MAX_HEIGHT_CMP_AVERAGE;
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

    notHaveEnoughContrast(): boolean {
        // TODO: 2020/08/21
        return false;
    }

    getTopDistance(block: LineBlock): number {
        return this.geometry.BoundingBox.Top - block.geometry.BoundingBox.Top;
    }
}