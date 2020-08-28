import LineBlock from './line-block';

export default class Paragraph {
    readonly blocks: LineBlock[] = [];

    public constructor(blocks: LineBlock[]) {
        this.blocks = blocks;
    }
}