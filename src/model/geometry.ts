import WordBlock from './word-block';

const HEIGHT_ADJUST_PROPORTION = 0.15;

type BoundingBox = {
    width: number;
    height: number;
    left: number;
    top: number;
};

type Polygon = {
    x: number;
    y: number;
}[];

export default class Geometry {
    readonly boundingBox: BoundingBox;
    readonly polygon: Polygon;

    public constructor(boundingBox: BoundingBox, polygon: Polygon) {
        this.boundingBox = boundingBox;
        this.polygon = polygon;
    }

    public static buildWithRawGeometry(geometry: any) {
        const boundingBox: BoundingBox = {
            width: geometry.BoundingBox.Width,
            height: geometry.BoundingBox.Height,
            left: geometry.BoundingBox.Left,
            top: geometry.BoundingBox.Top,
        };
        const polygon: Polygon = geometry.Polygon.map((p: any) => {
            return {
                x: p.X,
                y: p.Y,
            };
        });
        return new Geometry(boundingBox, polygon);
    }

    public static buildWithWords(words: WordBlock[]): Geometry {
        const { left } = words[0].geometry.boundingBox;
        const right = words[words.length - 1].geometry.polygon[2].x;

        const alphanumericWords = words.filter((word) => /[a-zA-Z0-9]+/.test(word.text));
        const totalCharacterCount = alphanumericWords.reduce((acc, word) => acc + word.text.length, 0);
        const totalTop = alphanumericWords.reduce((acc, word) => acc + word.geometry.getTop() * word.text.length, 0);
        const totalBottom = alphanumericWords.reduce((acc, word) => acc + word.geometry.getBottom() * word.text.length, 0);
        const top = totalTop / totalCharacterCount;
        const bottom = totalBottom / totalCharacterCount;

        const boundingBox: BoundingBox = {
            width: right - left,
            height: bottom - top,
            left: left,
            top: top,
        };
        const polygon: Polygon = [
            { x: left, y: top },
            { x: right, y: top },
            { x: right, y: bottom },
            { x: left, y: bottom },
        ];
        return new Geometry(boundingBox, polygon);
    }

    public stretchHeight(upper: boolean, lower: boolean): void {
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

    public getTop() {
        return (this.polygon[0].y + this.polygon[1].y) / 2;
    }

    public getBottom() {
        return (this.polygon[2].y + this.polygon[3].y) / 2;
    }
}