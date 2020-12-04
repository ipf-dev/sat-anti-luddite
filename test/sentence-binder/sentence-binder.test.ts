import SentenceBinder from '../../src/sentence-binder/sentence-binder';

const TIMEOUT = 1000 * 60;
const bid = 'TPSRT206X';

test('When_Execute_SentenceBinder', async () => {
    const sentenceBinder = new SentenceBinder(bid, {
        code: 'en-GB',
        pronunciation: 'UK',
    });

    await sentenceBinder.execute();
}, TIMEOUT);