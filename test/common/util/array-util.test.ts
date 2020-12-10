import ArrayUtil from '../../../src/common/util/array-util';

test('Array Exclude', () => {
    const excluded = ArrayUtil.exclude([4, 5], [1, 2, 3, 4, 5]);

    expect(excluded).toEqual([1, 2, 3]);
});

test('When_RemoveDuplicates_Expect_HaveUniqueMembers', () => {
    const array = [{ name: 'SW Development Team', people: 12 }, { name: 'SQA Team', people: 2 }, { name: 'SW Development Team', people: 30 }];
    const result = ArrayUtil.removeDuplicatesByProperty(array, 'name');

    expect(result).toHaveLength(2);
    expect(result).toEqual([{ name: 'SW Development Team', people: 12 }, { name: 'SQA Team', people: 2 }]);
});
