import SentenceBinder from '../../src/module/sentence-binder';

test('When_Execute_SentenceBinderWith_TPSRT206', async () => {
    const sentenceBinder = new SentenceBinder('TPSRT206', 'en-GB', 1, 15);

    await sentenceBinder.execute();
});