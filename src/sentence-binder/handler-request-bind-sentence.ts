import axios from 'axios';

import { Handler } from 'aws-lambda';
import log from 'loglevel';

import AntiLudditeHandler from '../common/anti-luddite-handler';
import { Language } from '../common/model/language';
import SentenceBinder from './sentence-binder';
import AudioDownloader from './audio-downloader';
import AudioCutter from './audio-cutter';
import AudioUploader from './audio-uploader';
import CompleteSentence from './model/complete-sentence';
import { SATJob } from './model/sat-job';

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
    const {
        bid,
        folder,
        bucket,
        pageWidth,
        pageHeight,
        endpoint,
        accessToken,
    }: {
        bid: string,
        folder: string,
        bucket: string,
        pageWidth: number,
        pageHeight: number,
        endpoint: string,
        accessToken: string,
    } = event;

    try {
        const sentences = await bindSentences(bid, folder, bucket, languages[0]);
        await arrangeAudios(bid, folder, bucket, sentences);
        const jobs = generateSATJobs(sentences, pageWidth, pageHeight);
        await requestCreateAudioElements(jobs, bid, endpoint, accessToken);
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
): Promise<CompleteSentence[]> {
    const sentenceBinder = new SentenceBinder(bid, language);
    await sentenceBinder.execute();

    return sentenceBinder.getCompleteSentences();
}

async function arrangeAudios(
    bid: string,
    folder: string,
    bucket: string,
    sentences: CompleteSentence[],
) {
    const downloader = new AudioDownloader(bid, folder, bucket);
    const files = downloader.aggregateFiles(sentences);
    await downloader.downloadFiles(files);

    const audioCutter = new AudioCutter(bid, sentences);
    await audioCutter.cut();

    const uploader = new AudioUploader(bid, folder, bucket);
    await uploader.uploadFiles(sentences);
}

function generateSATJobs(
    sentences: CompleteSentence[],
    pageWidth: number,
    pageHeight: number,
): SATJob[] {
    const ACTION_CREATE = 1;
    const jobs: SATJob[] = [];
    let id = new Date().getTime();

    for (const sentence of sentences) {
        const xmls = sentence.generateXML(pageWidth, pageHeight);

        for (const xml of xmls) {
            jobs.push({
                action: ACTION_CREATE,
                page: sentence.page,
                id: id++,
                name: 'Audio',
                xml: xml,
            });
        }
    }
    return jobs;
}

async function requestCreateAudioElements(jobs: SATJob[], bid: string, endpoint: string, accessToken: string) {
    try {
        const data = JSON.stringify({
            bid: bid,
            jobs: jobs,
            accessToken: accessToken,
        });

        await axios.post(endpoint, data);
    } catch (err) {
        console.error(err);
    }
}