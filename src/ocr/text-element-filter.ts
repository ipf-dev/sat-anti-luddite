import ArrayUtil from '../common/util/array-util';
import LineBlock from './line-block';
import WordBlock from './word-block';
import Paragraph from './paragraph';
import {
    TextElements, FilteredTextElements,
} from './filtered-text-elements';
import ParagraphDetector from './paragraph-detector';

export default class TextElementFilter {
    private unclassifiedLines: LineBlock[];
    private unclassifiedWords: WordBlock[];
    private readonly averageHeight: number = 0;
    private readonly indicators: TextElements;
    private readonly negligibles: TextElements;
    private readonly paragraphs: Paragraph[];
    private readonly singleLines: TextElements;

    public constructor(lines: LineBlock[], words: WordBlock[]) {
        this.unclassifiedLines = lines;
        this.unclassifiedWords = words;
        this.averageHeight = this.getAverageWordHeight();
        this.indicators = { lines: [], words: [] };
        this.negligibles = { lines: [], words: [] };
        this.paragraphs = [];
        this.singleLines = { lines: [], words: [] };
    }

    private getAverageWordHeight(): number {
        const confidentWords = this.unclassifiedWords
            .filter((block) => block.isConfident() && !block.heightOutOfBound());
        const totalHeight = confidentWords
            .reduce((acc, block) => acc + block.getHeight() * block.text.length, 0);
        const totalCharacterCount = confidentWords
            .reduce((acc, block) => acc + block.text.length, 0);
        return totalHeight / totalCharacterCount;
    }

    public execute(): void {
        this.findIndicators();
        this.findNegligibles();
        this.findParagraphs();
        this.findSingleLines();
    }

    private findIndicators(): void {
        this.findIndicatorLines();
        this.findIndicatorWords();
    }

    private findIndicatorLines(): void {
        const firstBlock = this.unclassifiedLines[0];
        const secondBlock = this.unclassifiedLines[1];
        const thirdBlock = this.unclassifiedLines[2];
        const lastBlock = this.unclassifiedLines[this.unclassifiedLines.length - 1];
        const candidates: LineBlock[] = [];

        if (firstBlock.isChapter()) {
            this.indicators.lines.push(firstBlock);
            const chapterNameDistance = secondBlock.getTopDistance(firstBlock);
            const bodyDistance = thirdBlock.getTopDistance(secondBlock);
            if (secondBlock.isHeightInRange(this.averageHeight, 1) && chapterNameDistance < bodyDistance) { // TODO: 2020/09/08 함수 추출
                this.indicators.lines.push(secondBlock);
            }
            candidates.push(lastBlock);
        } else {
            candidates.push(firstBlock);
            candidates.push(lastBlock);
        }

        candidates.forEach((block) => {
            if (block.isIndicator()) this.indicators.lines.push(block);
        });

        this.removeLinesFromUnclassified(this.indicators.lines);
    }

    private findIndicatorWords(): void {
        const words = this.findChildrenOfLinesFromUnclassified(this.indicators.lines);
        this.indicators.words = words;
        this.removeWordsFromUnclassified(words);
    }

    private findNegligibles(): void {
        this.findNegligiblesLines();
        this.findNegligiblesWords();
    }

    private findNegligiblesLines(): void {
        const neglectables: LineBlock[] = this.unclassifiedLines
            .filter((block: LineBlock) => block.isNegligible(this.averageHeight));

        this.removeLinesFromUnclassified(neglectables);
        this.negligibles.lines = neglectables;
    }

    private findNegligiblesWords(): void {
        const words = this.findChildrenOfLinesFromUnclassified(this.negligibles.lines);
        this.negligibles.words = words;
        this.removeWordsFromUnclassified(words);
    }

    private findParagraphs(): void {
        const detector = new ParagraphDetector(this.unclassifiedLines, this.unclassifiedWords);
        detector.execute();
        const paragraphs: Paragraph[] = detector.getResult();
        paragraphs.forEach((paragraph) => {
            this.removeLinesFromUnclassified(paragraph.lines);
            this.removeWordsFromUnclassified(paragraph.words);
            this.paragraphs.push(paragraph);
        });
    }

    private findSingleLines(): void {
        this.findSingleLineLines();
        this.findSingleLineWords();
    }

    private findSingleLineLines(): void {
        this.singleLines.lines = this.unclassifiedLines;
        this.unclassifiedLines = [];
    }

    private findSingleLineWords(): void {
        this.singleLines.words = this.unclassifiedWords;
        this.unclassifiedWords = [];
    }

    private removeLinesFromUnclassified(lines: LineBlock[]) {
        this.unclassifiedLines = ArrayUtil.exclude(lines, this.unclassifiedLines);
    }

    private findChildrenOfLinesFromUnclassified(lines: LineBlock[]): WordBlock[] {
        let words: WordBlock[] = [];
        lines.forEach((line) => {
            words = words.concat(this.unclassifiedWords.filter((word) => line.isParentOf(word)));
        });
        return words;
    }

    private removeWordsFromUnclassified(words: WordBlock[]): void {
        this.unclassifiedWords = ArrayUtil.exclude(words, this.unclassifiedWords);
    }

    public getResult(): FilteredTextElements {
        return {
            indicators: this.indicators,
            negligibles: this.negligibles,
            paragraphs: this.paragraphs,
            singleLines: this.singleLines,
        };
    }
}