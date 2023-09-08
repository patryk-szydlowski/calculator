import { createNumberNode } from "./nodes.js";

export function createStateUpdater() {
	let state = {
		currentNode: createNumberNode("0"),
		previousNode: null,
	};

	return (updateFunction) => {
		state = updateFunction(state);
		console.log(state);
	};
}


export function updateCurrentNode(updateFunction) {
	return ({currentNode, ...state}, ...args) => ({...state, currentNode: updateFunction(currentNode, ...args)});
}