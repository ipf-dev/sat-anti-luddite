import Geometry from '../geometry';

export default class CompleteSentence {
    public constructor(
        readonly page: number,
        readonly startTime: number,
        readonly endTime: number,
        readonly sttSentence: string,
        readonly audioPath: string,
        readonly audioSequence: number,
        readonly sentence: string,
        readonly geometry: Geometry[],
    ) {
        //
    }

    public toString(): string {
        return `[sentence detail] page: ${this.page}, ocr: ${this.sentence}, stt: ${this.sttSentence}`
            + `, start: ${this.startTime}, end: ${this.endTime}, audio: ${this.audioPath}, audioSequence: ${this.audioSequence}`;
    }

    public toMinifyString(): string {
        return `[sentence detail] page: ${this.page}, ocr: ${this.sentence}, stt: ${this.sttSentence}`;
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