import TextAnatomy from '../../src/model/text-anatomy';

test('When_TextIsFullHeight_Expect_isFullHeightTrue', () => {
    const textAnatomy = new TextAnatomy('Grasp your Spindle and Transform');
    expect(textAnatomy.isFullHeight()).toBe(true);
});

test('When_TextContainsCapital_Expect_hasCapitalTrue', () => {
    const textAnatomy = new TextAnatomy('Anti Luddite');
    expect(textAnatomy.hasCapital()).toBe(true);
});