export type Geometry = {
    readonly boundingBox: BoundingBox;
    readonly polygon: Polygon;
}

export type BoundingBox = {
    width: number;
    height: number;
    left: number;
    top: number;
};

type Polygon = {
    x: number;
    y: number;
}[];