import { Geometry, BoundingBox } from '../../common/model/geometry';
import StringUtil from '../../common/util/string-util';
import { Language } from '../../common/model/language';

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

    public generateXML(pageWidth: number, pageHeight: number): string[] {
        const filename = this.getSlicedAudioFilename();
        const pronunciation = this.language.pronunciation;
        const xml: string[] = [];

        if (this.geometry && this.geometry.length > 0) {
            const group = this.getGroupId();

            for (const geometry of this.geometry) {
                const {
                    left, top, width, height,
                } = this.getRect(pageWidth, pageHeight, geometry.boundingBox);

                // noinspection HtmlUnknownAttribute
                xml.push(`<Audio Rect="${left},${top},${width},${height}" Icon="0" autoplay="" invisible="" dimming="" group="${group}">
                              <File Path="${filename}" Language="${pronunciation}"/>
                          </Audio>`);
            }
        }
        return xml;
    }

    private getGroupId(): string | number {
        if (this.geometry.length > 1) {
            return Math.ceil(Math.random() * 1000);
        }
        return '';
    }

    private getRect(
        pageWidth: number,
        pageHeight: number,
        box: BoundingBox,
    ): { left: number, top: number, width: number, height: number } {
        return {
            left: Math.floor(pageWidth * box.left),
            top: Math.floor(pageHeight * box.top),
            width: Math.floor(pageWidth * box.width),
            height: Math.floor(pageHeight * box.height),
        };
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