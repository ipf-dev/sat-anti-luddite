export default class StringUtil {
    public static stripSpecialCharacter(text: string): string {
        return text.replace(/[^\w\s]/gi, '');
    }

    public static removeLeadingZeros(string: string): string {
        return string.replace(/^([0]+)([0-9]+)$/i, '$2');
    }
}