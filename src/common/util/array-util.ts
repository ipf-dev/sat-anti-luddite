export default class ArrayUtil {
    public static exclude(excludedArr: any[], from: any[]) {
        return from.filter((item) => !excludedArr.includes(item));
    }
}
