import LineBlock from './line-block';

export default class Paragraph {
    readonly blocks: LineBlock[] = [];

    constructor(blocks: LineBlock[]) {
        this.blocks = blocks;
    }
}