import { Handler } from 'aws-lambda';
import log from 'loglevel';

import AntiLudditeHandler from './anti-luddite-handler';
import Transcribe from './module/aws-transcribe';
import { LanguageCode } from './model/language-code';
import ElasticSearch from './module/aws-elastic-search';

AntiLudditeHandler.init();
const transcribe = new Transcribe();

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

    await clearPreviousHistory(bid);

    try {
        for (const audio of audios) {
            await startTranscribeJob(bid, languageCode, bucket, audio);
        }
        callback(null, { message: 'Start transcription job successfully' });
    } catch (err) {
        log.error('Error starting transcription job:', JSON.stringify(err));
        callback(err, { message: 'Error starting transcription job' });
    }
};

async function startTranscribeJob(
    bid: string,
    languageCode: LanguageCode,
    bucket: string,
    audio: { sequence: number, s3Key: string },
) {
    const pronounce = pronounceCodeMap[languageCode];
    const transcribeJobName = `${bid}_${pronounce}_${audio.sequence}-${Date.now()}`;

    await transcribe.startTranscriptionJob({
        jobName: transcribeJobName,
        bucket: bucket,
        key: audio.s3Key,
        languageCode: languageCode,
    });
}

async function clearPreviousHistory(bid: string) {
    const es = new ElasticSearch();
    const query = {
        match: { bid },
    };

    await es.delete({ index: 'stt-result', query: query });
    await es.delete({ index: 'stt-sentence', query: query });
}