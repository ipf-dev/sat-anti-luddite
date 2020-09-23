import TextAnatomy from './text-anatomy';

const HEIGHT_ADJUST_PROPORTION = 0.15;

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

    public adjustHeightDependingOnText(text: string): void {
        const textAnatomy = new TextAnatomy(text);
        if (textAnatomy.isFullHeight()) return;
        const needUpperStretch = !textAnatomy.hasAscender() && !textAnatomy.hasCapital();
        const needLowerStretch = !textAnatomy.hasDescender();
        this.stretchHeight(needUpperStretch, needLowerStretch);
    }

    private stretchHeight(upper: boolean, lower: boolean): void {
        let heightAdjustProportion = 0;
        if (upper) heightAdjustProportion += HEIGHT_ADJUST_PROPORTION;
        if (lower) heightAdjustProportion += HEIGHT_ADJUST_PROPORTION;
        const newHeight = this.boundingBox.height * (1 + heightAdjustProportion);
        const heightDiff = this.boundingBox.height * heightAdjustProportion;
        this.boundingBox.height = newHeight;
        if (upper) {
            this.polygon[0].y -= heightDiff;
            this.polygon[1].y -= heightDiff;
        }
        if (lower) {
            this.polygon[2].y += heightDiff;
            this.polygon[3].y += heightDiff;
        }
    }
}