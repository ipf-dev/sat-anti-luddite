import axios from 'axios';

import S3 from '../../../src/common/aws/aws-s3';
import Audio from '../../../src/playable-sentence/model/audio';

test('When_BuildWithNoPronunciation_Expect_US', () => {
    const audio = Audio.build({
        url: 'https://game-assets.readingn.com/theme/MYSELF1/5/media/gameOk.mp3',
    });

    expect(audio.pronunciation).toEqual('US');
});

test('When_Prepare_Expect_UploadedToS3', async () => {
    const audio = new Audio(
        'UK',
        'https://game-assets.readingn.com/theme/MYSELF1/5/media/gameOk.mp3',
    );
    await audio.prepare(new S3(), 'test');

    expect(audio.url).toContain('s3.ap-northeast-2.amazonaws.com');
    expect((await axios.head(audio.url)).status).toEqual(200);
});
