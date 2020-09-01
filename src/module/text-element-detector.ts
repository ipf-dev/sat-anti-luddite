import LineBlock from '../model/line-block';
import ParagraphDetector from './paragraph-detector';
import { Paragraph, TextElements } from '../model/text-elements';

export default class TextElementDetector {
    #unclassified: LineBlock[];
    readonly #averageHeight: number = 0;
    readonly #indicators: LineBlock[];
    readonly #neglectables: LineBlock[];
    readonly #paragraphs: Paragraph[];
    #singleLines: LineBlock[];

    public constructor(lines: LineBlock[], averageHeight: number) {
        this.#unclassified = lines;
        this.#averageHeight = averageHeight;
        this.#indicators = [];
        this.#neglectables = [];
        this.#paragraphs = [];
        this.#singleLines = [];
    }

    public execute(): TextElements {
        this.findIndicators();
        this.findNeglectables();
        this.findParagraphs();
        this.findSingleLines();
        return {
            indicators: this.#indicators,
            neglectables: this.#neglectables,
            paragraphs: this.#paragraphs,
            singleLines: this.#singleLines,
        };
    }

    private findIndicators(): void { // TODO #unclassified 로부터 제거하는 로직을 마지막으로 옮기기
        const firstBlock = this.#unclassified[0];
        const secondBlock = this.#unclassified[1];
        const thirdBlock = this.#unclassified[2];
        const lastBlock = this.#unclassified[this.#unclassified.length - 1];
        const candidates: LineBlock[] = [];

        if (firstBlock.isChapter()) {
            this.classifyTextElementByIndex(this.#indicators, 0);
            const chapterNameDistance = secondBlock.getTopDistance(firstBlock);
            const bodyDistance = thirdBlock.getTopDistance(secondBlock);
            if (secondBlock.geometry.BoundingBox.Height > this.#averageHeight && chapterNameDistance < bodyDistance) {
                this.classifyTextElementByElement(this.#indicators, secondBlock);
            }
            candidates.push(lastBlock);
        } else {
            candidates.push(firstBlock);
            candidates.push(lastBlock);
        }

        candidates.forEach((block) => {
            if (block.isIndicator()) {
                this.classifyTextElementByElement(this.#indicators, block);
            }
        });
    }

    private findNeglectables(): void {
        const neglectables: LineBlock[] = this.#unclassified
            .filter((block: LineBlock) => block.outOfPageBound()
                || block.heightOutOfBound()
                || block.heightOutOfAverageBound(this.#averageHeight)
                || block.isNotFlatSquare()
                || block.isNotConfident());

        neglectables.forEach((block) => {
            this.classifyTextElementByElement(this.#neglectables, block);
        });
    }

    private findParagraphs(): void {
        const pd = new ParagraphDetector(this.#unclassified);
        const paragraphs: Paragraph[] = pd.execute();

        paragraphs.forEach((paragraph) => {
            paragraph.lines.forEach((line) => {
                this.classifyTextElementByElement([], line); // FIXME: 2020/08/21 resultArray 필요없을 때 처리
            });
            this.#paragraphs.push(paragraph);
        });
    }

    private findSingleLines(): void {
        this.#singleLines = this.#unclassified;
        this.#unclassified = [];
    }

    private classifyTextElementByElement(resultArray: LineBlock[], element: LineBlock): void {
        const index = this.#unclassified.indexOf(element);
        if (index > -1) {
            this.#unclassified.splice(index, 1);
            resultArray.push(element);
        }
    }

    private classifyTextElementByIndex(resultArray: LineBlock[], index: number): void {
        const element = this.#unclassified[index];
        this.#unclassified.splice(index, 1);
        resultArray.push(element);
    }
}