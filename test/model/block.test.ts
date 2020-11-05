import { RawBlock } from '../../src/model/raw-block';
import Block from '../../src/model/block';

const HEIGHT_ADJUST_PROPORTION = 0.15;
const rawBlock: RawBlock = {
    BlockType: 'WORD',
    Confidence: 71.9177017211914,
    Text: 'a',
    Geometry: {
        BoundingBox: {
            Width: 0.008509140461683273,
            Height: 0.01095305010676384,
            Left: 0.851206362247467,
            Top: 0.0938008725643158,
        },
        Polygon: [
            { X: 0.851206362247467, Y: 0.0938008725643158 },
            { X: 0.8597155213356018, Y: 0.0938008725643158 },
            { X: 0.8597155213356018, Y: 0.10475391894578934 },
            { X: 0.851206362247467, Y: 0.10475391894578934 },
        ],
    },
    Id: '592521b8-895a-46d5-a85b-fc49170c9a7a',
};

test('When_TextFullHeight_Expect_NoAdjustment', () => {
    rawBlock.Text = 'They';
    const block = new Block(rawBlock);
    expect(block.geometry.boundingBox.height).toBe(rawBlock.Geometry.BoundingBox.Height);
    expect(block.geometry.polygon[0].y).toBe(rawBlock.Geometry.Polygon[0].Y);
    expect(block.geometry.polygon[1].y).toBe(rawBlock.Geometry.Polygon[1].Y);
    expect(block.geometry.polygon[2].y).toBe(rawBlock.Geometry.Polygon[2].Y);
    expect(block.geometry.polygon[3].y).toBe(rawBlock.Geometry.Polygon[3].Y);
});

test('When_TextWithoutAscender_Expect_UpperAdjustment', () => {
    rawBlock.Text = 'you are';
    const block = new Block(rawBlock);
    expect(block.geometry.boundingBox.height).toBe(rawBlock.Geometry.BoundingBox.Height * (1 + HEIGHT_ADJUST_PROPORTION));
    expect(block.geometry.polygon[0].y).toBe(rawBlock.Geometry.Polygon[0].Y - rawBlock.Geometry.BoundingBox.Height * HEIGHT_ADJUST_PROPORTION);
    expect(block.geometry.polygon[1].y).toBe(rawBlock.Geometry.Polygon[1].Y - rawBlock.Geometry.BoundingBox.Height * HEIGHT_ADJUST_PROPORTION);
});
