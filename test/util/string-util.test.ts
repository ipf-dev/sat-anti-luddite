import StringUtil from '../../src/util/string-util';

test('When_RemoveLeadingZeros00450_Expect_450', () => {
    const result = StringUtil.removeLeadingZeros('00450');
    expect(result).toEqual('450');
});
