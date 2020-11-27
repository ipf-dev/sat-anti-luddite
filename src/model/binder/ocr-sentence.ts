import Geometry from '../geometry';
import StringUtil from '../../util/string-util';
import SentenceAnalyzer from '../../module/binder/sentence-analyzer';

export type OCRSentenceVO = {
    readonly text: string,
    readonly confidence: number,
    readonly geometry: Geometry[],
};

export default class OCRSentence {
    public text: string;
    public confidence: number;
    public geometry: Geometry[];
    public consumed: boolean = false;
    public textStripped: string;
    public tokens: string[];

    public constructor(sentence: OCRSentenceVO) {
        this.text = sentence.text;
        this.confidence = sentence.confidence;
        this.geometry = sentence.geometry;

        this.textStripped = StringUtil.getNormalizedText(sentence.text);
        this.tokens = this.textStripped.split(' ');
    }

    public shouldConcatenate(reference: OCRSentence) {
        return (this.text.startsWith('"') && reference.textStripped.startsWith('said'))
            || (this.text.startsWith('"') && reference.textStripped.startsWith('say'))
            || (this.text.startsWith('"') && reference.textStripped.startsWith('says'))
            || (this.text.startsWith('"') && reference.textStripped.startsWith('call'))
            || (this.text.startsWith('"') && reference.textStripped.startsWith('called'));
    }

    public concatenate(sentence: OCRSentence) {
        this.text = `${this.text} ${sentence.text}`;
        this.textStripped = `${this.textStripped} ${sentence.textStripped}`;
        this.confidence = (this.confidence + sentence.confidence) / 2;

        this.tokens.push(...sentence.tokens);
        this.geometry.push(...sentence.geometry);
    }

    public getSimilarity(textStripped: string) {
        return SentenceAnalyzer.getSimilarity(textStripped, this.textStripped);
    }
}