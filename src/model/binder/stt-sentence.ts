import StringUtil from '../../util/string-util';
import SentenceAnalyzer from '../../module/binder/sentence-analyzer';
import STTResult from './stt-result';

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

    public isPartiallyMatched(textStripped: string): boolean {
        return SentenceAnalyzer.isPartiallyMatched(this.textStripped, textStripped);
    }

    public splitMatched(partialText: string, sttResult: STTResult[]): STTSentence[] {
        const [matched, remain] = SentenceAnalyzer.getPartiallyMatchedWords(this.textStripped, partialText);
        const subSentences: STTSentence[] = [];

        if (matched && matched.length >= 2) {
            subSentences.push(this.buildSubSentence(matched, sttResult));
        }
        if (remain && remain.length >= 2) {
            subSentences.push(this.buildSubSentence(remain, sttResult));
        }
        return subSentences;
    }

    public buildSubSentence(words: string[], sttResult: STTResult[]): STTSentence {
        const [startTime, endTime] = this.getTimeRange(words, sttResult);

        return new STTSentence({
            text: words.join(' '),
            startTime: startTime,
            endTime: endTime,
            confidence: this.confidence,
        }, this.audioPath, this.audioSequence);
    }

    public getTimeRange(words: string[], sttResult: STTResult[]): number[] {
        const timeRange: number[] = new Array(2);
        const firstWord = words[0];
        const lastWord = words[words.length - 1];

        for (const stt of sttResult) {
            if (stt.isInTimeRange(this.audioSequence, this.startTime, this.endTime)) {
                if (stt.hasWord(firstWord)) {
                    timeRange[0] = Number(stt.startTime);
                } else if (stt.hasWord(lastWord)) {
                    timeRange[1] = Number(stt.endTime);
                }
            }
        }
        return timeRange;
    }

    public isPrevious(sequence: number, startTime: number): boolean {
        return ((this.audioSequence < sequence)
            || (this.audioSequence === sequence && this.startTime < startTime));
    }

    public isNext(sequence: number, startTime: number): boolean {
        return ((this.audioSequence > sequence)
            || (this.audioSequence === sequence && this.startTime > startTime));
    }
}