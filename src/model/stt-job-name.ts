import { LanguageCode } from './language-code';

export default class STTJobName {
    private readonly documentId: string;
    private readonly bid: string;
    private readonly languageCode: string;
    private readonly sequence: number;

    public constructor(jobName: string) {
        this.documentId = jobName.split('-')[0];
        const [bid, languageCode, sequence] = this.documentId.split('_');
        this.bid = bid;
        this.languageCode = languageCode;
        this.sequence = Number(sequence);
    }

    public getDocumentId() {
        return this.documentId;
    }

    public getBid(): string {
        return this.bid;
    }

    public getTranscribeLanguageCode(): LanguageCode {
        return this.languageCode === 'US' ? 'en-US' : 'en-GB';
    }

    public getSequenceNumber(): number {
        return this.sequence;
    }
}