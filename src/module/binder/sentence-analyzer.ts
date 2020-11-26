import StringSimilarity from 'string-similarity';

export default class SentenceAnalyzer {
    private static readonly MIN_SUB_SENTENCE_SIMILARITY = 0.8;

    public static getSimilarity(verbalText: string, drawnText: string): number {
        const revised = this.replaceFrequentMisSpelledProperNoun(verbalText);

        return Math.max(
            StringSimilarity.compareTwoStrings(drawnText, verbalText),
            StringSimilarity.compareTwoStrings(drawnText, revised),
        );
    }

    public static getPartiallyMatchedWords(verbalText: string, drawnText: string) {
        return SentenceAnalyzer.getSimilarPartialSentence(verbalText, drawnText);
    }

    // The sentences from the audio resource are often concatenated due to the missing punctuation.
    public static isPartiallyMatched(verbalText: string, drawnText: string) {
        const revised = SentenceAnalyzer.replaceFrequentMisSpelledProperNoun(verbalText);
        const maxSimilarity = Math.max(
            SentenceAnalyzer.getSubSentenceSimilarity(verbalText, drawnText),
            SentenceAnalyzer.getSubSentenceSimilarity(revised, drawnText),
        );

        return maxSimilarity >= SentenceAnalyzer.MIN_SUB_SENTENCE_SIMILARITY;
    }

    public static getSubSentenceSimilarity(verbalText: string, drawnText: string): number {
        const verbalWords = verbalText.split(' ');
        const drawnWords = drawnText.split(' ');
        let maxSimilarity = 0;

        for (const drawnWord of drawnWords) {
            if (verbalWords.includes(drawnWord)) {
                const drawnIndex = drawnWords.indexOf(drawnWord);
                const verbalIndex = verbalWords.indexOf(drawnWord);

                if ((verbalIndex - drawnIndex >= 0) && (verbalIndex - drawnIndex + drawnWords.length <= verbalWords.length)) {
                    const start = verbalIndex - drawnIndex;
                    const end = start + drawnWords.length;
                    const similarity = SentenceAnalyzer.getStringArraySimilarity(drawnWords, verbalWords.slice(start, end));

                    maxSimilarity = Math.max(maxSimilarity, similarity);
                }
            }
        }
        return maxSimilarity;
    }

    public static getSimilarPartialSentence(verbalText: string, drawnText: string): string[][] {
        const verbalWords = verbalText.split(' ');
        const drawnWords = drawnText.split(' ');
        const words: string[][] = [];   // 0: matched, 1: remained
        let maxSimilarity = 0;

        for (const drawnWord of drawnWords) {
            if (verbalWords.includes(drawnWord)) {
                const drawnIndex = drawnWords.indexOf(drawnWord);
                const verbalIndex = verbalWords.indexOf(drawnWord);

                if ((verbalIndex - drawnIndex >= 0) && (verbalIndex - drawnIndex + drawnWords.length <= verbalWords.length)) {
                    const start = verbalIndex - drawnIndex;
                    const end = start + drawnWords.length;
                    const similarity = SentenceAnalyzer.getStringArraySimilarity(drawnWords, verbalWords.slice(start, end));

                    if (similarity > SentenceAnalyzer.MIN_SUB_SENTENCE_SIMILARITY && similarity > maxSimilarity) {
                        const remainFront = start;
                        const remainLast = verbalWords.length - end;
                        const remainStart = (remainFront > remainLast) ? 0 : end;
                        const remainEnd = (remainFront > remainLast) ? start : verbalWords.length;

                        words.push(verbalWords.slice(start, end));
                        words.push(verbalWords.slice(remainStart, remainEnd));
                        maxSimilarity = similarity;
                    }
                }
            }
        }
        return words;
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
            .replace('bits', 'biff\'s')

            .replace('keeper', 'kipper')
            .replace('kiper', 'kipper')

            .replace('flopping', 'floppy')

            .replace('tip', 'chip')
            .replace('ship', 'chip');
    }
}