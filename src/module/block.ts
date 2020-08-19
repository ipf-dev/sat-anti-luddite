export interface Block {
    BlockType: string;
    Confidence?: number;
    Text?: string;
    Geometry: {
        BoundingBox: {
            Width: number;
            Height: number;
            Left: number;
            Top: number;
        };
        Polygon: {
            X: number;
            Y: number;
        }[]
    };
    Id: string;
    Relationships?: object[]
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