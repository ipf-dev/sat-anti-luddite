export interface Block {
    BlockType: string;
    Confidence?: number;
    Text?: string;
    Geometry: Geometry;
    Id: string;
    Relationships?: object[]
}

export interface Geometry {
    BoundingBox: BoundingBox;
    Polygon: Coordinate[]
}

export interface BoundingBox {
    Width: number;
    Height: number;
    Left: number;
    Top: number;
}

export interface Coordinate {
    X: number;
    Y: number;
}

export interface PageBlock extends Block {
    BlockType: 'PAGE';
    Relationships: object[]
}

export interface LineBlock extends Block {
    BlockType: 'LINE';
    Confidence: number;
    Text: string;
    Relationships: object[]
}

export interface WordBlock extends Block {
    BlockType: 'WORD';
    Confidence: number;
    Text: string;
}