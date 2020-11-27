import SentenceBinder from '../../../src/module/binder/sentence-binder';

const TIMEOUT = 1000 * 60;
const bid = process.env.BID || '';

test('When_Execute_SentenceBinder', async () => {
    const sentenceBinder = new SentenceBinder(bid, 'en-US');

    await sentenceBinder.execute();
}, TIMEOUT);