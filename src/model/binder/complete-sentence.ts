import Geometry from '../geometry';
import StringUtil from '../../util/string-util';
import { Language } from '../language';

export default class CompleteSentence {
    public constructor(
        readonly page: number,
        readonly language: Language,
        readonly startTime: number,
        readonly endTime: number,
        readonly sttSentence: string,
        readonly audioSequence: number,
        readonly sentence: string,
        readonly geometry: Geometry[],
    ) {
    }

    public toString(): string {
        return `[sentence detail] page: ${this.page}, ocr: ${this.sentence}, stt: ${this.sttSentence}`
            + `, start: ${this.startTime}, end: ${this.endTime}, audioSequence: ${this.audioSequence}`;
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

    public getSourceFilename(bid: string): string {
        return `${bid}_${this.language.pronunciation}_${this.audioSequence}.mp3`;
    }

    public getSlicedAudioFilename(): string {
        const pronunciation = this.language.pronunciation;
        const normalized = StringUtil
            .getNormalizedText(this.sentence)
            .replace(/\s/g, '_');

        return `${pronunciation}_p${this.page}_${normalized}.mp3`;
    }
}