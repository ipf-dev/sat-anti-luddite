import StringUtil from '../../src/util/string-util';

test('When_stripSpecialCharacterFromString', () => {
    const result = StringUtil.stripSpecialCharacter('Something was glowing.');
    expect(result).toEqual('Something was glowing');
});

test('When_stripSpecialCharacterFromString', () => {
    const result = StringUtil.stripSpecialCharacter('Kipper went into Chip\'s room. Chip read the story.');
    expect(result).toEqual('Kipper went into Chips room Chip read the story');
});

test('When_stripSpecialCharacterFromString', () => {
    const result = StringUtil.stripSpecialCharacter('2000 and 11.');
    expect(result).toEqual('2000 and 11');
});

test('When_stripSpecialCharacterFromString', () => {
    const result = StringUtil.stripSpecialCharacter('She didn\'t like dragons.');
    expect(result).toEqual('She didnt like dragons');
});

test('When_stripSpecialCharacterFromString', () => {
    const result = StringUtil.stripSpecialCharacter('What what? Come on, she said.');
    expect(result).toEqual('What what Come on she said');
});