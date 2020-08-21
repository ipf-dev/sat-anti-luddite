import { LineBlock, Geometry } from './block';

const PADDING_X = 0.05;
const PADDING_Y = 0.10;
const MIN_HEIGHT = 0.017;
const MAX_HEIGHT = 0.055;
const MIN_HEIGHT_CMP_AVERAGE = 0.5;
const MAX_HEIGHT_CMP_AVERAGE = 1.5;
const MIN_CONFIDENCE = 75;

export default class TextElement implements LineBlock {
    BlockType: 'LINE' = 'LINE';
    Confidence: number;
    Text: string;
    Geometry: Geometry;
    Id: string;
    Relationships: object[];

    constructor(lineBlock: LineBlock) {
        this.Confidence = lineBlock.Confidence;
        this.Text = lineBlock.Text;
        this.Geometry = lineBlock.Geometry;
        this.Id = lineBlock.Id;
        this.Relationships = lineBlock.Relationships;
    }

    outOfPageBound(): boolean {
        const {
            Left: left,
            Width: width,
            Top: top,
            Height: height,
        } = this.Geometry.BoundingBox;
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
        const height = this.Geometry.BoundingBox.Height;
        return height < MIN_HEIGHT || height > MAX_HEIGHT;
    }

    heightOutOfAverageBound(averageHeight: number): boolean {
        const height = this.Geometry.BoundingBox.Height;
        return height < averageHeight * MIN_HEIGHT_CMP_AVERAGE || height > averageHeight * MAX_HEIGHT_CMP_AVERAGE;
    }

    isNotFlatSquare(): boolean {
        const isSquare = this.Geometry.Polygon.length === 4;
        const isFlat = this.Geometry.Polygon[0].Y === this.Geometry.Polygon[1].Y
            && this.Geometry.Polygon[2].Y === this.Geometry.Polygon[3].Y;
        return !isSquare || !isFlat;
    }

    isNotConfident(): boolean {
        return this.Confidence < MIN_CONFIDENCE;
    }

    notHaveEnoughContrast(): boolean {
        // TODO: 2020/08/21
        return false;
    }

    getDistanceY(element: TextElement): number {
        return this.Geometry.BoundingBox.Top - element.Geometry.BoundingBox.Top;
    }
}