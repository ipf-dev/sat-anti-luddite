import fs from 'fs';

import S3 from '../../../src/common/aws/aws-s3';

const path = '/tmp/output/TPSRT206_UK_01.mp3';

test('When_HavePath_Expect_ExcludePath', async () => {
    const result = S3.getFileNameFromKey('path/to/the/file/find-me.mp3');
    expect(result).toEqual('find-me');
});

test('When_ContainDotsInFileName_Expect_IncludeDotsInFileName', async () => {
    const result = S3.getFileNameFromKey('fav.m45in.icon.css');
    expect(result).toEqual('fav.m45in.icon');
});

test('When_DownloadFileFromS3', async () => {
    const s3 = new S3();
    const bucket = process.env.STT_OUTPUT_BUCKET;
    const key = 'source/TPSRT206_UK_1.mp3';

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
    if (bucket) {
        await s3.downloadObject({ bucket, key }, path);
    }
    expect(fs.existsSync(path)).toBeTruthy();
});

test('When_UploadFileToS3', async () => {
    const s3 = new S3();
    const bucket = process.env.TEST_BUCKET || '';
    const key = '5fc60778a1422/test/test.mp3';

    await s3.putObject({
        bucket: bucket,
        key: key,
        contentType: 'audio/mpeg',
    }, path);
});