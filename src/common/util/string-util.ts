export default class StringUtil {
    public static readonly REMOVE_MULTIPLE_SPACING = /\s\s+/g;

    public static stripSpecialCharacter(text: string): string {
        return text.replace(/[^\w\s]/gi, '');
    }

    public static removeLeadingZeros(string: string): string {
        return string.replace(/^([0]+)([0-9]+)$/i, '$2');
    }

    public static getNormalizedText(text: string): string {
        return StringUtil.stripSpecialCharacter(text)
            .toLowerCase()
            .replace(StringUtil.REMOVE_MULTIPLE_SPACING, ' ')
            .trim();
    }
}