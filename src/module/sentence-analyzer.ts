import StringSimilarity from 'string-similarity';
import { OCRSentence } from '../model/ocr-sentence';

export default class SentenceAnalyzer {
    private static readonly MIN_SUB_SENTENCE_SIMILARITY = 0.8;

    // OCR Text is more accurate.
    public static getSimilarity(sttText: string, ocrText: string): number {
        const revised = SentenceAnalyzer.replaceFrequentMisSpelledProperNoun(sttText);
        const orgSimilarity = StringSimilarity.compareTwoStrings(ocrText, sttText);
        const revisedSimilarity = StringSimilarity.compareTwoStrings(ocrText, revised);

        return Math.max(orgSimilarity, revisedSimilarity);
    }

    // The sentences are often concatenated from the STT Result due to the missing punctuation.
    public static isSTTConcatenated(sttText: string, ocrText: string) {
        const revised = SentenceAnalyzer.replaceFrequentMisSpelledProperNoun(sttText);
        const maxSimilarity = Math.max(
            SentenceAnalyzer.getSubSentenceSimilarity(sttText, ocrText),
            SentenceAnalyzer.getSubSentenceSimilarity(revised, ocrText),
        );

        return maxSimilarity >= SentenceAnalyzer.MIN_SUB_SENTENCE_SIMILARITY;
    }

    public static getSubSentenceSimilarity(sttText: string, ocrText: string): number {
        const sttWords = sttText.split(' ');
        const ocrWords = ocrText.split(' ');
        let maxSimilarity = 0;

        for (const ocrWord of ocrWords) {
            if (sttWords.includes(ocrWord)) {
                const ocrIndex = ocrWords.indexOf(ocrWord);
                const sttIndex = sttWords.indexOf(ocrWord);

                if ((sttIndex - ocrIndex >= 0) && (sttIndex - ocrIndex + ocrWords.length <= sttWords.length)) {
                    const start = sttIndex - ocrIndex;
                    const end = start + ocrWords.length;
                    const similarity = SentenceAnalyzer.getStringArraySimilarity(ocrWords, sttWords.slice(start, end));

                    maxSimilarity = Math.max(maxSimilarity, similarity);
                }
            }
        }
        return maxSimilarity;
    }

    public static getSubSentence(sttText: string, ocrText: string): string[] {
        const sttWords = sttText.split(' ');
        const ocrWords = ocrText.split(' ');
        let maxSimilarity = 0;
        let subSentenceWords: string[] = [];

        for (const ocrWord of ocrWords) {
            if (sttWords.includes(ocrWord)) {
                const ocrIndex = ocrWords.indexOf(ocrWord);
                const sttIndex = sttWords.indexOf(ocrWord);

                if ((sttIndex - ocrIndex >= 0) && (sttIndex - ocrIndex + ocrWords.length <= sttWords.length)) {
                    const start = sttIndex - ocrIndex;
                    const end = start + ocrWords.length;
                    const similarity = SentenceAnalyzer.getStringArraySimilarity(ocrWords, sttWords.slice(start, end));

                    if (maxSimilarity < similarity) {
                        maxSimilarity = similarity;
                        subSentenceWords = sttWords.slice(start, end);
                    }
                }
            }
        }
        return subSentenceWords;
    }

    public static getStringArraySimilarity(a: string[], b: string[]) {
        let accumulativeSimilarity = 0;

        for (let i = 0; i < a.length; i++) {
            accumulativeSimilarity += StringSimilarity.compareTwoStrings(a[i], b[i]);
        }
        return accumulativeSimilarity / a.length;
    }

    public static replaceFrequentMisSpelledProperNoun(text: string) {
        return text.toLowerCase()
            .replace('beth', 'biff')
            .replace('beef', 'biff')
            .replace('bits', 'biff')

            .replace('keeper', 'kipper')
            .replace('kiper', 'kipper')

            .replace('flopping', 'floppy')

            .replace('tip', 'chip')
            .replace('ship', 'chip');
    }

    public static shouldConcatenate(a: OCRSentence, b: OCRSentence) {
        return (a.text.startsWith('"') && b.textStripped.startsWith('said'))
            || (a.text.startsWith('"') && b.textStripped.startsWith('called'));
    }
}