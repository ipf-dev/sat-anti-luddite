import log from 'loglevel';

import S3 from '../common/aws/aws-s3';
import PlayableSentence from './model/playable-sentence';
import PlayableSentenceWithId from './model/playable-sentence-with-id';
import { GetSentenceRequest } from './model/request';
import { GetSentenceResponse } from './model/response';
import SentenceDataSource from './sentence-data-source';

export default class SentenceService {
    private readonly sentenceDataSource: SentenceDataSource;
    private readonly s3: S3;

    public constructor() {
        this.sentenceDataSource = new SentenceDataSource();
        this.s3 = new S3();
    }

    public async get(param: GetSentenceRequest): Promise<GetSentenceResponse> {
        return this.sentenceDataSource.get(param);
    }

    public async add(param: any[]): Promise<void> {
        const sentences = await this.prepareSentences(param);
        await this.uploadSentences(sentences);
    }

    private async prepareSentences(param: any[]): Promise<PlayableSentence[]> {
        return Promise.all(
            param.map(async (sentenceParam) => {
                const sentence = PlayableSentence.build(sentenceParam);
                await sentence.prepareAudio(this.s3);
                return sentence;
            }),
        );
    }

    private async uploadSentences(sentences: PlayableSentence[]): Promise<void> {
        const sentencesWithDuplicateId: PlayableSentenceWithId[] = await Promise.all(sentences.map(async (sentence) => {
            const duplicateId = await this.sentenceDataSource.findDuplicateId(sentence);
            return PlayableSentenceWithId.buildFromSentence(sentence, duplicateId);
        }));
        log.debug('SentenceService.uploadSentences', sentencesWithDuplicateId);

        await this.sentenceDataSource.upload(sentencesWithDuplicateId);
    }
}
