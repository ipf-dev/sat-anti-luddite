import SentenceDataSource from '../../src/playable-sentence/sentence-data-source';
import PlayableSentence from '../../src/playable-sentence/model/playable-sentence';

test('When_Get_Expect_HaveResult', async () => {
    const dataSource = new SentenceDataSource();
    const result = await dataSource.get({ size: 2, includes: 'strong' });

    expect(result.total).toBeGreaterThanOrEqual(0);
    expect(result.sentence).toEqual(
        expect.arrayContaining([]),
    );
});

test('When_FindDuplicateId_Expect_HaveResult', async () => {
    const dataSource = new SentenceDataSource();
    const sentence = new PlayableSentence(
        'They were on a beach, but it was very different from most beaches.',
        [],
        'TPSRI35',
        5,
    );
    const result = await dataSource.findDuplicateId(sentence);

    expect(typeof result === 'string' || typeof result === 'undefined').toBeTruthy();
});
