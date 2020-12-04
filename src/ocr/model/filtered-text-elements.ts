import LineBlock from './line-block';
import WordBlock from './word-block';
import Paragraph from './paragraph';

export type FilteredTextElements = {
    indicators: TextElements;
    negligibles: TextElements;
    paragraphs: Paragraph[];
    singleLines: TextElements;
}

export type TextElements = {
    lines: LineBlock[];
    words: WordBlock[];
}