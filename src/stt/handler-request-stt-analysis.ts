import { Handler } from 'aws-lambda';
import log from 'loglevel';

import AntiLudditeHandler from '../common/anti-luddite-handler';
import Transcribe from '../common/aws/aws-transcribe';
import ElasticSearch from '../common/aws/aws-elastic-search';
import { LanguageCode } from '../common/model/language-code';

AntiLudditeHandler.init();
const transcribe = new Transcribe();
const es = new ElasticSearch();

const pronounceCodeMap = {
    'en-GB': 'UK',
    'en-US': 'US',
};

/* eslint-disable  import/prefer-default-export, no-await-in-loop */
export const handler: Handler = async (event, context, callback) => {
    const {
        bucket, bid, languageCode, audios,
    }: {
        bucket: string,
        bid: string,
        languageCode: LanguageCode,
        audios: { sequence:number, s3Key: string }[],
    } = event;
    const pronounce = pronounceCodeMap[languageCode];

    await clearPreviousHistory(bid, languageCode);

    try {
        for (const audio of audios) {
            const id = `${bid}_${pronounce}_${audio.sequence}`;
            await startTranscribeJob(id, languageCode, bucket, audio);
            await saveMetadata(id, bid, languageCode, bucket, audio);
        }
        callback(null, { message: 'Start transcription job successfully' });
    } catch (err) {
        log.error('Error starting transcription job:', JSON.stringify(err));
        callback(err, { message: 'Error starting transcription job' });
    }
};

async function clearPreviousHistory(bid: string, languageCode: string) {
    const query = {
        bool: {
            must: [
                { match: { bid } },
                {
                    match: {
                        languageCode: {
                            query: languageCode,
                            operator: 'and',
                        },
                    },
                },
            ],
        },
    };

    await es.delete({ index: 'stt-result', query: query });
    await es.delete({ index: 'stt-sentence', query: query });
}

async function startTranscribeJob(
    id: string,
    languageCode: LanguageCode,
    bucket: string,
    audio: { s3Key: string },
) {
    await transcribe.startTranscriptionJob({
        jobName: `${id}-${Date.now()}`,
        bucket: bucket,
        key: audio.s3Key,
        languageCode: languageCode,
    });
}

async function saveMetadata(
    id: string,
    bid: string,
    languageCode: LanguageCode,
    bucket: string,
    audio: { sequence: number, s3Key: string },
): Promise<void> {
    const index = 'stt-result';
    const body = {
        bid: bid,
        languageCode: languageCode,
        sequence: audio.sequence,
        s3: {
            bucket: bucket,
            key: audio.s3Key,
        },
    };
    await es.index({ index, body, id });
}
