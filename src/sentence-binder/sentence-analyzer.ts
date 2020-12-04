import StringSimilarity from 'string-similarity';

export default class SentenceAnalyzer {
    private static readonly MIN_SUB_SENTENCE_SIMILARITY = 0.8;

    public static getSimilarity(verbalText: string, writtenText: string): number {
        const verbalRevised = this.replaceFrequentMisSpelledProperNoun(verbalText);

        return Math.max(
            StringSimilarity.compareTwoStrings(writtenText, verbalText),
            StringSimilarity.compareTwoStrings(writtenText, verbalRevised),
        );
    }

    public static getPartiallyMatchedWords(verbalText: string, writtenText: string): string[][] {
        return SentenceAnalyzer.getSimilarPartialSentence(verbalText, writtenText);
    }

    public static getSimilarPartialSentence(verbalText: string, writtenText: string): string[][] {
        const verbalWords = verbalText.split(' ');
        const writtenWords = writtenText.split(' ');
        const words: string[][] = [];   // 0: matched, 1: remained
        let maxSimilarity = 0;

        for (const writtenWord of writtenWords) {
            if (verbalWords.includes(writtenWord)) {
                const writtenIndex = writtenWords.indexOf(writtenWord);
                const verbalIndex = verbalWords.indexOf(writtenWord);

                if ((verbalIndex - writtenIndex >= 0) && (verbalIndex - writtenIndex + writtenWords.length <= verbalWords.length)) {
                    const start = verbalIndex - writtenIndex;
                    const end = start + writtenWords.length;
                    const similarity = SentenceAnalyzer.getStringArraySimilarity(writtenWords, verbalWords.slice(start, end));

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

    // The sentences from the audio resource are often concatenated due to the missing punctuation.
    public static isPartiallyMatched(verbalText: string, writtenText: string): boolean {
        const verbalRevised = SentenceAnalyzer.replaceFrequentMisSpelledProperNoun(verbalText);
        const maxSimilarity = Math.max(
            SentenceAnalyzer.getSubSentenceSimilarity(verbalText, writtenText),
            SentenceAnalyzer.getSubSentenceSimilarity(verbalRevised, writtenText),
        );

        return maxSimilarity >= SentenceAnalyzer.MIN_SUB_SENTENCE_SIMILARITY;
    }

    public static getSubSentenceSimilarity(verbalText: string, writtenText: string): number {
        const verbalWords = verbalText.split(' ');
        const writtenWords = writtenText.split(' ');
        let maxSimilarity = 0;

        for (let i = 0; i < writtenWords.length; i++) {
            if (verbalWords.includes(writtenWords[i])) {
                const verbalIndex = verbalWords.indexOf(writtenWords[i]);

                if ((verbalIndex - i >= 0) && (verbalIndex - i + writtenWords.length <= verbalWords.length)) {
                    const start = verbalIndex - i;
                    const end = start + writtenWords.length;
                    const similarity = SentenceAnalyzer.getStringArraySimilarity(writtenWords, verbalWords.slice(start, end));

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