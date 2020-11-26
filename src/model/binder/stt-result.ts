/* eslint-disable camelcase */
import StringUtil from '../../util/string-util';

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
    alternatives: STTResultAlternative[];

    public constructor(result: STTResultVO) {
        this.startTime = Number(result.start_time);
        this.endTime = Number(result.end_time);
        this.alternatives = result.alternatives;

        for (const alternative of this.alternatives) {
            alternative.confidence = Number(alternative.confidence);
            alternative.contentStripped = StringUtil.getNormalizedText(alternative.content);
        }
    }
}