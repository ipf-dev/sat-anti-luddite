import SentenceBinder from '../../../src/module/binder/sentence-binder';

const TIMEOUT = 1000 * 60;

test('When_Execute_SentenceBinderWith_TPSRT206', async () => {
    const sentenceBinder = new SentenceBinder('TPSRT206', 'en-GB', 1, 15);

    await sentenceBinder.execute();
}, TIMEOUT);