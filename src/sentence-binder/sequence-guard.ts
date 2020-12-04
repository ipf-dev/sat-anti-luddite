import CompleteSentence from './model/complete-sentence';

export default class SequenceGuard {
    private readonly filtered: CompleteSentence[];

    public constructor(
        readonly sentences: CompleteSentence[],
    ) {
        this.filtered = [];
    }

    public getFilteredSentence(): CompleteSentence[] {
        this.filterAdvancedSentence();
        this.filterBehindSentence();

        return this.filtered;
    }

    private filterAdvancedSentence() {
        for (const sentence of this.sentences) {
            const previous = this.getSentencesFromPreviousPage(sentence.page);

            if (previous.length >= 2
                && sentence.isPrevious(previous[0])
                && sentence.isPrevious(previous[1])) {
                this.filtered.push(sentence);
            }
        }
    }

    private filterBehindSentence() {
        for (const sentence of this.sentences) {
            const next = this.getSentencesFromNextPage(sentence.page);

            if (next.length >= 2
                && sentence.isNext(next[0])
                && sentence.isNext(next[1])) {
                this.filtered.push(sentence);
            }
        }
    }

    private getSentencesFromPreviousPage(page: number): CompleteSentence[] {
        const previous: CompleteSentence[] = [];

        for (const sentence of this.sentences) {
            if (sentence.page >= page) continue;

            if (previous.length < 2) {
                previous.push(sentence);
            } else if (sentence.isNext(previous[0]) && sentence.isNext(previous[1])) {
                const replaceIdx = previous[0].isPrevious(previous[1]) ? 0 : 1;

                previous[replaceIdx] = sentence;
            } else if (sentence.isNext(previous[0])) {
                previous[0] = sentence;
            } else if (sentence.isNext(previous[1])) {
                previous[1] = sentence;
            }
        }
        return previous;
    }

    private getSentencesFromNextPage(page: number): CompleteSentence[] {
        const next: CompleteSentence[] = [];

        for (const sentence of this.sentences) {
            if (sentence.page <= page) continue;

            if (next.length < 2) {
                next.push(sentence);
            } else if (sentence.isPrevious(next[0]) && sentence.isPrevious(next[1])) {
                const replaceIdx = next[0].isNext(next[1]) ? 0 : 1;

                next[replaceIdx] = sentence;
            } else if (sentence.isPrevious(next[0])) {
                next[0] = sentence;
            } else if (sentence.isPrevious(next[1])) {
                next[1] = sentence;
            }
        }
        return next;
    }
}