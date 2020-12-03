import { Handler } from 'aws-lambda';
import log from 'loglevel';

import AntiLudditeHandler from './anti-luddite-handler';
import { Language } from './model/language';
import SentenceBinder from './module/binder/sentence-binder';
import AudioDownloader from './module/binder/audio-downloader';
import AudioCutter from './module/binder/audio-cutter';

AntiLudditeHandler.init();

const languages: Language[] = [
    {
        code: 'en-GB',
        pronunciation: 'UK',
    }, {
        code: 'en-US',
        pronunciation: 'US',
    },
];

/* eslint-disable  import/prefer-default-export, no-await-in-loop */
export const handler: Handler = async (event, context, callback) => {
    const { bid, folder, bucket }: {
        bid: string,
        folder: string,
        bucket: string,
    } = event;

    try {
        await bindSentences(bid, folder, bucket, languages[0]);
    } catch (e) {
        log.error(e);
    }
    callback(null/* */);
};

async function bindSentences(
    bid: string,
    folder: string,
    bucket: string,
    language: Language,
) {
    const sentenceBinder = new SentenceBinder(bid, language);
    await sentenceBinder.execute();
    const sentences = sentenceBinder.getCompleteSentences();

    const downloader = new AudioDownloader(bid, folder, bucket);
    const files = downloader.aggregateFiles(sentences);
    await downloader.downloadFiles(bucket, files);

    const audioCutter = new AudioCutter(bid, sentences);
    await audioCutter.cut();
}