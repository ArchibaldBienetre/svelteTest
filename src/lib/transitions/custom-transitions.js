import { linear } from 'svelte/easing';

const NUMBER_OF_WAYPOINTS = 10;
const SCALE_OF_ZIG_ZAG_MOTION = 100;

/**
 * @param numberOfWaypoints = number of points where the zigzagging changes direction
 **/
export function getZigZagXPosition(eased, numberOfWaypoints) {

	const scaledProgress = eased * numberOfWaypoints;

	const roundedScaledProgress = Math.floor(scaledProgress);
	const legGoesUp = roundedScaledProgress % 2 === 0;

	const positionOnCurrentLeg = scaledProgress - roundedScaledProgress;

	if (legGoesUp) {
		return positionOnCurrentLeg;
	} else {
		return -1 * positionOnCurrentLeg;
	}

}

export function zigzag(node, { duration }) {
	return {
		duration,
		css: (t, u) => {
			const eased = t;
			const x = getZigZagXPosition(eased, NUMBER_OF_WAYPOINTS) * SCALE_OF_ZIG_ZAG_MOTION;
			const y = 0;
			return `transform: translateX(${x}px) translateY(${y}px);`
		}
	};
}
