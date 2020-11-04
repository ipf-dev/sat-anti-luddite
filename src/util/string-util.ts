export default class StringUtil {
    public static removeLeadingZeros(string: string): string {
        return string.replace(/^([0]+)([0-9]+)$/i, '$2');
    }
}