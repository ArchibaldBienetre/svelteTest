import { linear } from 'svelte/easing';

const NUMBER_OF_WAYPOINTS = 10;
const SCALE_OF_ZIG_ZAG_MOTION = 100;

/**
 * @param easedPosition = value between 0 and 1 (but should tolerate other values)
 * @param numberOfWaypoints = number of points where the zigzagging changes direction
 **/
export function getZigZagXPosition(easedPosition, numberOfWaypoints) {

	// "* numberOfWayPoints * 2X", so that we will have an even number and the movement stops at "0" position
	const scaleFactor = numberOfWaypoints * 2;
	const scaledProgress = easedPosition * scaleFactor;

	const roundedScaledProgress = Math.floor(scaledProgress);
	// add a full interval to get a positive remainder
	const remainder = (roundedScaledProgress + numberOfWaypoints * scaleFactor) % 4;
	const legGoesUpPositive = remainder === 0;
	const legGoesDownPositive = remainder === 1;
	const legGoesDownNegative = remainder === 2;
	const legGoesUpNegative = remainder === 3;

	const positionOnCurrentLeg = scaledProgress - roundedScaledProgress;

	console.debug(`Remainder: ${remainder}`);
	console.debug(`Scaled progress: ${scaledProgress}`);
	console.debug(`Rounded scaled progress: ${roundedScaledProgress}`);
	console.debug(`Position on current leg: ${positionOnCurrentLeg}`);

	let v;
	if (legGoesUpPositive) {
		console.debug("leg goes up positive")
		return positionOnCurrentLeg;
	} else if (legGoesDownPositive) {
		console.debug("leg goes down positive")
		return (1 - positionOnCurrentLeg);
	} else if (legGoesDownNegative) {
		console.debug("leg goes down negative")
		return (-1 * positionOnCurrentLeg);
	} else if (legGoesUpNegative) {
		console.debug("leg goes up negative")
		return (-1 + positionOnCurrentLeg);
	}
	throw "error calculating zigzag transition";
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
