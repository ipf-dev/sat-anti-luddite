/* eslint-disable camelcase */
import StringUtil from '../../common/util/string-util';
import { Language } from '../../common/model/language';

export type STTResultVO = {
    start_time: number | string;
    end_time: number | string;
    alternatives: STTResultAlternative[];
}

export type STTResultAlternative = {
    confidence: number | string;
    content: string;
    contentStripped: string;
}

export default class STTResult {
    startTime: number | string;
    endTime: number | string;
    audioSequence: number;
    alternatives: STTResultAlternative[];
    language: Language;

    public constructor(result: STTResultVO, audioSequence: number, language: Language) {
        this.startTime = Number(result.start_time);
        this.endTime = Number(result.end_time);
        this.alternatives = result.alternatives;
        this.audioSequence = audioSequence;
        this.language = language;

        for (const alternative of this.alternatives) {
            alternative.confidence = Number(alternative.confidence);
            alternative.contentStripped = StringUtil.getNormalizedText(alternative.content);
        }
    }

    public isInTimeRange(audioSequence: number, start: number, end: number): boolean {
        return (audioSequence === this.audioSequence)
            && (start <= this.startTime && this.endTime <= end);
    }

    public hasWord(word: string) {
        for (const alternative of this.alternatives) {
            if (alternative.contentStripped === word) return true;
        }
        return false;
    }
}