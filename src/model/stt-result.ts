/* eslint-disable camelcase */
export type STTResult = {
    start_time: number | string;
    end_time: number | string;
    alternatives: STTResultAlternative[];
}

export type STTResultAlternative = {
    confidence: number | string;
    content: string;
    contentStripped: string;
}