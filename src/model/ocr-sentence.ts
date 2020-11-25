import Geometry from './geometry';

export type OCRSentence = {
    consumed: boolean;
    text: string;
    textStripped: string;
    confidence: number;
    readonly geometry: Geometry[];
}