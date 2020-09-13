export default class Geometry {
    readonly boundingBox: {
        width: number;
        height: number;
        left: number;
        top: number;
    };

    readonly polygon: {
        x: number;
        y: number;
    }[];

    public constructor(geometry: any) {
        this.boundingBox = {
            width: geometry.BoundingBox.Width,
            height: geometry.BoundingBox.Height,
            left: geometry.BoundingBox.Left,
            top: geometry.BoundingBox.Top,
        };
        this.polygon = geometry.Polygon.map((polygon: any) => {
            return {
                x: polygon.X,
                y: polygon.Y,
            };
        });
    }
}