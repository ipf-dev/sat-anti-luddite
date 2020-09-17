export default class MathUtil {
    public static diff(a: number, b: number): number {
        return Math.abs(a - b);
    }

    public static getBaseAngleOfRightAngledTriangle(base: number, perpendicular: number): number {
        const angleInRadians = Math.atan(perpendicular / base);
        return this.radiansToDegrees(angleInRadians);
    }

    public static radiansToDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }
}