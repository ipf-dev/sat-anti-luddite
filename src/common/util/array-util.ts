type ObjectArray  = {
    [index: string]: any;
}[];

export default class ArrayUtil {
    public static exclude(excludedArr: any[], from: any[]) {
        return from.filter((item) => !excludedArr.includes(item));
    }

    public static removeDuplicatesByProperty(array: ObjectArray, prop: string): any[] {
        const propValues = array.map((item) => item[prop]);
        return array.filter(
            (item: any, index) => propValues.indexOf(item[prop]) === index,
        );
    }
}
