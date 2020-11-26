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
        const sttWords = verbalText.split(' ');
        const ocrWords = drawnText.split(' ');
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