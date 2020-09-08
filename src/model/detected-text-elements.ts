import LineBlock from './line-block';
import WordBlock from './work-block';

export type DetectedTextElements = {
    indicators: TextElements;
    negligibles: TextElements;
    paragraphs: Paragraph[];
    singleLines: TextElements;
}

export type TextElements = {
    lines: LineBlock[];
    words: WordBlock[];
}

export type Paragraph = {
    lines: LineBlock[];
    words: WordBlock[];
}