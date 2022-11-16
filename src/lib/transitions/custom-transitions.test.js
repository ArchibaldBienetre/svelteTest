import { getZigZagXPosition } from '../transitions/custom-transitions';

describe('custom transitions', () => {
    describe('getZigZagXPosition', () => {
        test.each([
            [10, -20 / 100, 0],
            [10, -17.5 / 100, 0.5],
            [10, -15 / 100, 1],
            [10, -12.5 / 100, 0.5],
            [10, -10 / 100, -0],
            [10, -7.5 / 100, -0.5],
            [10, -5 / 100, -1],
            [10, -2.5 / 100, -0.5],
            [10, 0 / 100, 0],
            [10, 2.5 / 100, 0.5],
            [10, 5 / 100, 1],
            [10, 7.5 / 100, 0.5],
            [10, 10 / 100, -0],
            [10, 12.5 / 100, -0.5],
            [10, 15 / 100, -1],
            [10, 17.5 / 100, -0.5],
            [10, 20 / 100, 0],
            [10, 30 / 100, -0],
            [10, 40 / 100, 0],
            [10, 50 / 100, -0],
            [10, 60 / 100, 0],
            [10, 70 / 100, -0],
            [10, 80 / 100, 0],
            [10, 90 / 100, -0],
            [10, 100 / 100, 0],
        ])('is at the expected position at the given points (waypoints: %d, position: %d, expected: %d)', (numberOfWaypoints, easedPosition, expected) => {
            const actual = getZigZagXPosition(easedPosition, numberOfWaypoints);

            expect(actual).toEqual(expected);
        });
    });
});