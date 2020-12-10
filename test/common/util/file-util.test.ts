import fs from 'fs';

import FileUtil from '../../../src/common/util/file-util';

test('When_DownloadMp3_Expect_FileExists', async () => {
    const path = '/tmp/output/file-util-test.mp3';
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    } else {
        fs.mkdirSync('/tmp/output', { recursive: true });
    }

    await FileUtil.download('https://s3.ap-northeast-2.amazonaws.com/tapas-meta-contents/audios/TPSNR06_doghouse.mp3', path);

    expect(fs.existsSync(path)).toBeTruthy();
});

test('When_DownloadJpg_Expect_FileExists', async () => {
    fs.mkdirSync('/tmp/output', { recursive: true });
    const path = '/tmp/output/file-util-test.jpg';
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    } else {
        fs.mkdirSync('/tmp/output', { recursive: true });
    }

    await FileUtil.download('http://bit.ly/2mTM3nY', path);

    expect(fs.existsSync(path)).toBeTruthy();
});
