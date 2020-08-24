export type Block = {
    BlockType: 'PAGE' | 'LINE' | 'WORD';
    Confidence?: number;
    Text?: string;
    Geometry: Geometry;
    Id: string;
    Relationships?: object[]
}

export type Geometry = {
    BoundingBox: {
        Width: number;
        Height: number;
        Left: number;
        Top: number;
    };
    Polygon: {
        X: number;
        Y: number;
    }[];
}