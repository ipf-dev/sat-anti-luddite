import assert from 'assert';
import Block from './block';
import { RawBlock } from './raw-block';

export default class WordBlock extends Block {
    public constructor(block: RawBlock) {
        assert(block.BlockType === 'WORD', `Invalid 'BlockType' of block argument creating WordBlock object: ${block}`);
        super(block);
    }
}