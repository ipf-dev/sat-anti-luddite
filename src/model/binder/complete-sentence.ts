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


    /**
     *  Audio XML Example
     *  <Audio Rect="165,24,101,101" Icon="1,10" autoplay="on" invisible="on" dimming="on" group="4">
     *      <File Path="combined.mp3" Language="US" Start="00:05.005" End="00:06.006"/>
     *      <File Path="combined.mp3" Language="GB" Start="00:07.007" End="00:08.008"/>
     *      <Subtitle Path="sample_script.vtt" Language="en-us"/>
     *      <Subtitle Path="sample_script_with_text_styling.vtt" Language="en-uk"/>
     *  </Audio>
     */
    public generateXML(): string {
        return '';
    }
}

export class CompleteSentenceBuilder {
    public buildFromJSON(row: any): CompleteSentence {
        return new CompleteSentence(
            row.page,
            row.language,
            row.startTime,
            row.endTime,
            row.sttSentence,
            row.audioSequence,
            row.sentence,
            row.geometry,
        );
    }
}