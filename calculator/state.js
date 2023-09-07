import { createNumberNode } from "./nodes.js";

export function createStateUpdater() {
	let state = {currentNode: createNumberNode(0)};

	return (updateFunction) => {
		console.log("before:", state);
		state = updateFunction(state);
		console.log("after:", state);
	};
}


export function updateCurrentNode(updateFunction) {
	return ({currentNode}, ...args) => ({currentNode: updateFunction(currentNode, ...args)});
}