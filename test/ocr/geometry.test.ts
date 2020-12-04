import Geometry from '../../src/ocr/geometry';

const HEIGHT_ADJUST_PROPORTION = 0.15;
const rawGeometry = {
    BoundingBox: {
        Width: 0.09568709135055542,
        Height: 0.03922896832227707,
        Left: 0.7578330636024475,
        Top: 0.7719973921775818,
    },
    Polygon: [
        {
            X: 0.7578330636024475,
            Y: 0.7719973921775818,
        },
        {
            X: 0.8535201549530029,
            Y: 0.7719973921775818,
        },
        {
            X: 0.8535201549530029,
            Y: 0.8112263679504395,
        },
        {
            X: 0.7578330636024475,
            Y: 0.8112263679504395,
        },
    ],
};

test('When_StretchHeightFalse_Expect_NoGeometryChange', () => {
    const geometry = Geometry.buildWithRawGeometry(rawGeometry);
    geometry.stretchHeight(false, false);
    expect(geometry.boundingBox.height).toBe(rawGeometry.BoundingBox.Height);
    expect(geometry.polygon[0].y).toBe(rawGeometry.Polygon[0].Y);
    expect(geometry.polygon[1].y).toBe(rawGeometry.Polygon[1].Y);
    expect(geometry.polygon[2].y).toBe(rawGeometry.Polygon[2].Y);
    expect(geometry.polygon[3].y).toBe(rawGeometry.Polygon[3].Y);
});

test('When_StretchUpperHeight_Expect_UpperAdjustment', () => {
    const geometry = Geometry.buildWithRawGeometry(rawGeometry);
    geometry.stretchHeight(true, false);
    expect(geometry.boundingBox.height).toBe(rawGeometry.BoundingBox.Height * (1 + HEIGHT_ADJUST_PROPORTION));
    expect(geometry.polygon[0].y).toBe(rawGeometry.Polygon[0].Y - rawGeometry.BoundingBox.Height * HEIGHT_ADJUST_PROPORTION);
    expect(geometry.polygon[1].y).toBe(rawGeometry.Polygon[1].Y - rawGeometry.BoundingBox.Height * HEIGHT_ADJUST_PROPORTION);
    expect(geometry.polygon[2].y).toBe(rawGeometry.Polygon[2].Y);
    expect(geometry.polygon[3].y).toBe(rawGeometry.Polygon[3].Y);
});