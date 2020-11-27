import fs from 'fs';
// @ts-ignore
import MP3Cutter from 'mp3-cutter';

import CompleteSentence from '../../model/binder/complete-sentence';
import StringUtil from '../../util/string-util';

export default class AudioCutter {
    private static readonly SILENCE_DURATION = 0.2;

    constructor(
        readonly bid: string,
        readonly sentences: CompleteSentence[],
    ) {
        fs.mkdirSync(`test/output/${this.bid}`, { recursive: true });
    }

    public async cut() {
        for (const sentence of this.sentences) {
            const path = `test/output/${sentence.audioPath}`;

            MP3Cutter.cut({
                src: path,
                target: `test/output/${this.bid}/${AudioCutter.getFilename(sentence)}`,
                start: sentence.startTime - AudioCutter.SILENCE_DURATION,
                end: sentence.endTime + AudioCutter.SILENCE_DURATION,
            });
        }
    }

    public static getFilename(sentence: CompleteSentence) {
        const normalizedSentence = StringUtil.getNormalizedText(sentence.sentence).replace(' ', '_');

        return `p${sentence.page}_${normalizedSentence}.mp3`;
    }
}