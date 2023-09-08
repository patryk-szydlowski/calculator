import { createNumberNode } from "./nodes.js";

export function createStateUpdater(onUpdate) {
	let state = {
		currentNode: createNumberNode("0"),
		previousNode: null,
	};

	return (updateFunction) => {
		state = updateFunction(state);
		onUpdate(state);
	};
}


export function updateCurrentNode(updateFunction) {
	return ({currentNode, ...state}, ...args) => ({...state, currentNode: updateFunction(currentNode, ...args)});
}