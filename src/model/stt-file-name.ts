import { LanguageCode } from './language-code';
import StringUtil from '../util/string-util';

export default class STTFileName {
    private readonly bid: string;
    private readonly languageCode: string;
    private readonly sequence: string;

    public constructor(fileName: string) {
        const [bid, languageCode, sequence] = fileName.split('_');
        this.bid = bid;
        this.languageCode = languageCode;
        this.sequence = StringUtil.removeLeadingZeros(sequence);
    }

    public getTranscribeLanguageCode(): LanguageCode {
        return this.languageCode === 'US' ? 'en-US' : 'en-GB';
    }

    public getTranscribeJobName(): string {
        return `${this.bid}_${this.languageCode}_${this.sequence}-${Date.now()}`;
    }
}