import LineBlock from './line-block';

export type TextElements = {
    indicators: LineBlock[];
    neglectables: LineBlock[];
    paragraphs: Paragraph[];
    singleLines: LineBlock[];
}

export type Paragraph = {
    lines: LineBlock[];
}