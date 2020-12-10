export default class ArrayUtil {
    public static exclude(excludedArr: any[], from: any[]) {
        return from.filter((item) => !excludedArr.includes(item));
    }

    public static removeDuplicatesByProperty(array: any[], prop: string) {
        return array.filter(
            (value, index, arr) => arr.map((mapValue) => mapValue[prop]).indexOf(value[prop]) === index,
        );
    }
}
