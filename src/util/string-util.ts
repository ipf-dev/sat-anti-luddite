export default class StringUtil {
    public static stripSpecialCharacter(text: string): string {
        return text.replace(/[^\w\s]/gi, '');
    }
}