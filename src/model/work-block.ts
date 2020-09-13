import assert from 'assert';

import { Block } from './block';
import Geometry from './geometry';


export default class WordBlock {
    readonly confidence: number;
    readonly text: string;
    readonly geometry: Geometry;
    readonly id: string;

    public constructor(block: Block) {
        assert(block.BlockType === 'WORD', `Invalid 'BlockType' of block argument creating WordBlock object: ${block}`);
        this.confidence = block.Confidence ===  undefined ? 0 : block.Confidence;
        this.text = block.Text === undefined ? '' : block.Text;
        this.geometry = new Geometry(block.Geometry);
        this.id = block.Id;
    }

    public isConfidenceHigherThan(confidence: number): boolean {
        return this.confidence !== undefined && this.confidence > confidence;
    }
}