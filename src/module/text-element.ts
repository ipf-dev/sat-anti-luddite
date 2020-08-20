import { LineBlock, Geometry } from './block';

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

    getDistanceY(element: TextElement): number {
        return this.Geometry.BoundingBox.Top - element.Geometry.BoundingBox.Top;
    }
}