import MathUtil from '../../../src/common/util/math-util';

test('When_GetBaseAngleOfEquilateralTriangle_Expect_45', () => {
    const result = MathUtil.getBaseAngleOfRightAngledTriangle(3, 3);
    expect(result).toEqual(45);
});

test('When_GetBaseAngleOfTriangle_Expect_30', () => {
    const result = MathUtil.getBaseAngleOfRightAngledTriangle(Math.sqrt(3), 1);
    expect(Math.round(result)).toEqual(30);
});
