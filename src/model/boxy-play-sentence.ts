import Geometry from './geometry';
import { OCRSentence } from './ocr-sentence';

export default class BoxyPlaySentence {
    public readonly sentence: string;
    public readonly geometry: Geometry[];

    public constructor(
        readonly page: number,
        readonly startTime: number,
        readonly endTime: number,
        readonly sttSentence: string,
        ocrSentence: OCRSentence,
    ) {
        this.sentence = ocrSentence.text;
        this.geometry = ocrSentence.geometry;
    }
}