import { OCRSentence } from './ocr-sentence';

export type OCRResult = {
    readonly page: number;
    sentences: OCRSentence[];
}