export type STTSentence = {
    consumed: boolean;
    text: string;
    textStripped: string;
    startTime: number;
    endTime: number;
    confidence: number;
}