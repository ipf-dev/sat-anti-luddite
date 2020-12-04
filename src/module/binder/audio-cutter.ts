import fs from 'fs';
import log from 'loglevel';

// @ts-ignore, mp3-cutter does not provide @types/mp3-cutter
import MP3Cutter from 'mp3-cutter';

import CompleteSentence from '../../model/binder/complete-sentence';

export default class AudioCutter {
    private static readonly SILENCE_DURATION = 0.2;

    constructor(
        readonly bid: string,
        readonly sentences: CompleteSentence[],
    ) {
        fs.mkdirSync(`/tmp/output/${this.bid}`, { recursive: true });
    }

    public async cut() {
        for (const sentence of this.sentences) {
            const sourceName = sentence.getSourceFilename(this.bid);
            const sourcePath = `/tmp/output/${sourceName}`;
            const targetName = sentence.getSlicedAudioFilename();
            const targetPath = `/tmp/output/${this.bid}/${targetName}`;

            try {
                MP3Cutter.cut({
                    src: sourcePath,
                    target: targetPath,
                    start: sentence.startTime - AudioCutter.SILENCE_DURATION,
                    end: sentence.endTime + AudioCutter.SILENCE_DURATION,
                });
            } catch (err) {
                log.error(err);
            }
        }
    }
}