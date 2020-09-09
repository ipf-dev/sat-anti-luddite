import ArrayUtil from '../../src/util/array-util';

test('Array Exclude', () => {
    const excluded = ArrayUtil.exclude([4, 5], [1, 2, 3, 4, 5]);

    expect(excluded).toEqual([1, 2, 3]);
});