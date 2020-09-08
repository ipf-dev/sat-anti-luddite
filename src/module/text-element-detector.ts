import LineBlock from '../model/line-block';
import WordBlock from '../model/work-block';
import {
    Paragraph, TextElements, DetectedTextElements,
} from '../model/detected-text-elements';
import ParagraphLineDetector, { ParagraphLines } from './paragraph-line-detector';

export default class TextElementDetector {
    #unclassifiedLines: LineBlock[];
    #unclassifiedWords: WordBlock[];
    readonly #averageHeight: number = 0;
    readonly #indicators: TextElements;
    readonly #negligibles: TextElements;
    readonly #paragraphs: Paragraph[];
    readonly #singleLines: TextElements;

    public constructor(lines: LineBlock[], words: WordBlock[]) {
        this.#unclassifiedLines = lines;
        this.#unclassifiedWords = words;
        this.#averageHeight = this.getAverageWordHeight();
        this.#indicators = { lines: [], words: [] };
        this.#negligibles = { lines: [], words: [] };
        this.#paragraphs = [];
        this.#singleLines = { lines: [], words: [] };
    }

    public execute(): DetectedTextElements {
        this.findIndicators();
        this.findNegligibles();
        this.findParagraphs();
        this.findSingleLines();
        return {
            indicators: this.#indicators,
            negligibles: this.#negligibles,
            paragraphs: this.#paragraphs,
            singleLines: this.#singleLines,
        };
    }

    private getAverageWordHeight(): number {
        const confidentWords = this.#unclassifiedWords
            .filter((block) => block.isConfidenceHigherThan(50));
        const totalHeight = confidentWords
            .reduce((acc, block) => acc + block.geometry.BoundingBox.Height, 0);
        return totalHeight / confidentWords.length;
    }

    private findIndicators(): void {
        this.findIndicatorLines();
        this.findIndicatorWords();
    }

    private findIndicatorLines(): void {
        const firstBlock = this.#unclassifiedLines[0];
        const secondBlock = this.#unclassifiedLines[1];
        const thirdBlock = this.#unclassifiedLines[2];
        const lastBlock = this.#unclassifiedLines[this.#unclassifiedLines.length - 1];
        const candidates: LineBlock[] = [];

        if (firstBlock.isChapter()) {
            this.#indicators.lines.push(firstBlock);
            const chapterNameDistance = secondBlock.getTopDistance(firstBlock);
            const bodyDistance = thirdBlock.getTopDistance(secondBlock);
            if (secondBlock.geometry.BoundingBox.Height > this.#averageHeight && chapterNameDistance < bodyDistance) { // TODO: 2020/09/08 함수 추출
                this.#indicators.lines.push(secondBlock);
            }
            candidates.push(lastBlock);
        } else {
            candidates.push(firstBlock);
            candidates.push(lastBlock);
        }

        candidates.forEach((block) => {
            if (block.isIndicator()) this.#indicators.lines.push(block);
        });

        this.removeLinesFromUnclassified(this.#indicators.lines);
    }

    private findIndicatorWords(): void {
        const words = this.findChildrenOfLinesFromUnclassified(this.#indicators.lines);
        this.#indicators.words = words;
        this.removeWordsFromUnclassified(words);
    }

    private findNegligibles(): void {
        this.findNegligiblesLines();
        this.findNegligiblesWords();
    }

    private findNegligiblesLines(): void {
        const neglectables: LineBlock[] = this.#unclassifiedLines
            .filter((block: LineBlock) => block.outOfPageBound()
                || block.heightOutOfBound()
                || block.heightOutOfAverageBound(this.#averageHeight)
                || block.isNotFlatSquare()
                || block.isNotConfident());

        this.removeLinesFromUnclassified(neglectables);
        this.#negligibles.lines = neglectables;
    }

    private findNegligiblesWords(): void {
        const words = this.findChildrenOfLinesFromUnclassified(this.#negligibles.lines);
        this.#negligibles.words = words;
        this.removeWordsFromUnclassified(words);
    }

    private findParagraphs(): void {
        this.findParagraphLines();
        this.findParagraphWords();
    }

    private findParagraphLines(): void {
        const pld = new ParagraphLineDetector(this.#unclassifiedLines);
        const paragraphs: ParagraphLines[] = pld.execute();

        paragraphs.forEach((paragraph) => {
            this.removeLinesFromUnclassified(paragraph.lines);
            this.#paragraphs.push({
                lines: paragraph.lines,
                words: [],
            });
        });
    }

    private findParagraphWords(): void {
        this.#paragraphs.forEach((paragraph, index) => {
            const words = this.findChildrenOfLinesFromUnclassified(paragraph.lines);
            this.#paragraphs[index].words = words;
            this.removeWordsFromUnclassified(words);
        });
    }

    private findSingleLines(): void {
        this.findSingleLineLines();
        this.findSingleLineWords();
    }

    private findSingleLineLines(): void {
        this.#singleLines.lines = this.#unclassifiedLines;
        this.#unclassifiedLines = [];
    }

    private findSingleLineWords(): void {
        this.#singleLines.words = this.#unclassifiedWords;
        this.#unclassifiedWords = [];
    }

    private removeLinesFromUnclassified(lines: LineBlock[]) {
        TextElementDetector.removeArray1FromArray2(lines, this.#unclassifiedLines);
    }

    private findChildrenOfLinesFromUnclassified(lines: LineBlock[]): WordBlock[] {
        let words: WordBlock[] = [];
        lines.forEach((line) => {
            words = words.concat(this.#unclassifiedWords.filter((word) => line.isParentOf(word)));
        });
        return words;
    }

    private removeWordsFromUnclassified(words: WordBlock[]): void {
        TextElementDetector.removeArray1FromArray2(words, this.#unclassifiedWords);
    }

    private static removeArray1FromArray2(arr1: any[], arr2: any[]) {
        arr1.forEach((value) => {
            const index = arr2.indexOf(value);
            if (index > -1) arr2.splice(index, 1);
        });
    }
}