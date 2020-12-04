import StringSimilarity from 'string-similarity';

test('Diff in Special Character', () => {
    const similarity = StringSimilarity.compareTwoStrings(
        'Something was glowing.',
        'Something was glowing',
    );

    expect(similarity).toBeGreaterThan(0.95);
});

test('Diff in Special Character', () => {
    const similarity = StringSimilarity.compareTwoStrings(
        'Kipper went into Chip\'s room. Chip read the story.',
        'Kipper went into chips room',
    );

    expect(similarity).toBeGreaterThan(0.6);
});

test('Common miss-recognition', () => {
    const similarity = StringSimilarity.compareTwoStrings(
        'beef pulled floppy',
        'biff pulled floppy',
    );

    expect(similarity).toBeGreaterThanOrEqual(0.8);
});

test('Comeback, Come back', () => {
    const similarity = StringSimilarity.compareTwoStrings(
        'comeback',
        'back',
    );

    expect(similarity).toBeGreaterThanOrEqual(0.6);
});