import { createNumberNode } from "./nodes.js";

export function createStateUpdater(onUpdate) {
	let state = {
		current: [createNumberNode("0")],
		previous: [],
	};

	return (updateFunction) => {
		state = updateFunction(state);
		console.log(state.current);
		onUpdate(state);
	};
}


export function updateCurrentCalculation(updateFunction) {
	return ({current, ...state}, ...args) => {
		const reversedCalculation = current.toReversed();
		const updatedReversedCalculation = updateFunction(reversedCalculation, ...args);
		const updatedCalculation = updatedReversedCalculation.toReversed();

		return {...state, current: updatedCalculation};
	};
}