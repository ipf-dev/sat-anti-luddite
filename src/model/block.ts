import { RawBlock } from './raw-block';
import Geometry from './geometry';
import Relationship from './relationship';
import MathUtil from '../util/math-util';

type BlockType = 'PAGE' | 'LINE' | 'WORD';

const MIN_CONFIDENCE = 75;
const PADDING_X = 0.067;
const PADDING_Y = 0.05;
const MIN_HEIGHT = 0.015;
const MAX_HEIGHT = 0.09;
const MIN_HEIGHT_CMP_AVERAGE = 0.5;
const MAX_HEIGHT_CMP_AVERAGE = 2;
const ACCEPTABLE_SIDE_SLOPE_IN_DEGREE = 2;

export default class Block {
    private readonly id: string;
    private readonly type: BlockType;
    private readonly confidence: number;
    protected readonly text: string;
    protected readonly geometry: Geometry;
    readonly relationships: Relationship[];

    constructor(block: RawBlock) {
        this.id = block.Id;
        this.type = block.BlockType;
        this.confidence = block.Confidence ===  undefined ? 0 : block.Confidence;
        this.text = block.Text === undefined ? '' : block.Text;
        this.geometry = new Geometry(block.Geometry);
        this.geometry.adjustHeightDependingOnText(this.text);
        this.relationships = block.Relationships
            ? block.Relationships.map((rel: any) => new Relationship(rel))
            : [];
    }

    public isConfident(): boolean {
        return this.confidence > MIN_CONFIDENCE;
    }

    public getHeight(): number {
        return this.geometry.boundingBox.height;
    }

    public getTopDistance(block: Block): number {
        return this.geometry.boundingBox.top - block.geometry.boundingBox.top;
    }

    public equalsId(id: string): boolean {
        return this.id === id;
    }

    protected outOfPageBound(): boolean {
        return this.isOutOfBound(PADDING_X, PADDING_Y);
    }

    protected isOutOfBound(x: number, y: number): boolean {
        const {
            left, width, top, height,
        } = this.geometry.boundingBox;
        const rightDistance = 1 - (left + width);
        const bottomDistance = 1 - (top + height);
        return left < x
            || rightDistance < y
            || top < x
            || bottomDistance < y;
    }

    public heightOutOfBound(): boolean {
        return !this.isHeightInRange(MIN_HEIGHT, MAX_HEIGHT);
    }

    public isHeightInRange(min: number, max: number): boolean {
        const { height } = this.geometry.boundingBox;
        return height >= min && height <= max;
    }

    protected heightOutOfAverageBound(averageHeight: number): boolean {
        const min = averageHeight * MIN_HEIGHT_CMP_AVERAGE;
        const max = averageHeight * MAX_HEIGHT_CMP_AVERAGE;
        return !this.isHeightInRange(min, max);
    }

    protected isNotFlatSquare(): boolean {
        const isSquare = this.geometry.polygon.length === 4;
        const isFlat = this.getUpperSideSlope() < ACCEPTABLE_SIDE_SLOPE_IN_DEGREE
            && this.getLowerSideSlope() < ACCEPTABLE_SIDE_SLOPE_IN_DEGREE;
        // console.debug({
        //     text: this.text,
        //     upperSideSlope: this.getUpperSideSlope(),
        //     lowerSideSlope: this.getLowerSideSlope(),
        // });
        return !isSquare || !isFlat;
    }

    private getUpperSideSlope(): number {
        return this.getSideSlope(this.geometry.polygon[0].y, this.geometry.polygon[1].y);
    }

    private getLowerSideSlope(): number {
        return this.getSideSlope(this.geometry.polygon[2].y, this.geometry.polygon[3].y);
    }

    private getSideSlope(y1: number, y2: number) {
        const h = MathUtil.diff(y1, y2);
        const w = this.geometry.boundingBox.width;
        return MathUtil.getBaseAngleOfRightAngledTriangle(w, h);
    }
}