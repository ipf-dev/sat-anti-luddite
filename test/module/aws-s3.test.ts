import S3 from '../../src/module/aws-s3';

test('When_HavePath_Expect_ExcludePath', async () => {
    const result = S3.getFileNameFromKey('path/to/the/file/find-me.mp3');
    expect(result).toEqual('find-me');
});

test('When_ContainDotsInFileName_Expect_IncludeDotsInFileName', async () => {
    const result = S3.getFileNameFromKey('fav.m45in.icon.css');
    expect(result).toEqual('fav.m45in.icon');
});