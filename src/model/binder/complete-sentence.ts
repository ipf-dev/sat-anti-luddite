import Geometry from '../geometry';
import OCRSentence from './ocr-sentence';

export default class CompleteSentence {
    public readonly sentence: string;
    public readonly geometry: Geometry[];

    public constructor(
        readonly page: number,
        readonly similarity: number,
        readonly startTime: number,
        readonly endTime: number,
        readonly sttSentence: string,
        readonly audioPath: string,
        readonly audioSequence: number,
        ocrSentence: OCRSentence,
    ) {
        this.sentence = ocrSentence.text;
        this.geometry = ocrSentence.geometry;
    }

    public toString(): string {
        return `[sentence detail] page: ${this.page}, similarity: ${this.similarity}`
            + `, ocr: ${this.sentence}, stt: ${this.sttSentence}, start: ${this.startTime}, end: ${this.endTime}, `
            + `audio: ${this.audioPath}, audioSequence: ${this.audioSequence}`;
    }

    public isPrevious(reference: CompleteSentence): boolean {
        return ((this.audioSequence < reference.audioSequence)
            || (this.audioSequence === reference.audioSequence && this.startTime < reference.startTime));
    }

    public isNext(reference: CompleteSentence): boolean {
        return ((this.audioSequence > reference.audioSequence)
            || (this.audioSequence === reference.audioSequence && this.startTime > reference.startTime));
    }
}