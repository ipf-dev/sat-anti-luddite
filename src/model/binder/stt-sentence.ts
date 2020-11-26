import StringUtil from '../../util/string-util';

export type STTSentenceVO = {
    text: string;
    startTime: number;
    endTime: number;
    confidence: number;
}

export default class STTSentence {
    public consumed: boolean = false;
    public text: string;
    public textStripped: string;
    public startTime: number;
    public endTime: number;
    public confidence: number;
    public audioPath: string;
    public audioSequence: number;

    public constructor(result: STTSentenceVO, audioPath: string, audioSequence: number) {
        this.startTime = Number(result.startTime);
        this.endTime = Number(result.endTime);
        this.confidence = Number(result.confidence);
        this.text = result.text;
        this.textStripped = StringUtil.getNormalizedText(result.text);
        this.audioPath = audioPath;
        this.audioSequence = audioSequence;
    }
}