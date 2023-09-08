import { createNumberNode } from "./nodes.js";

export function createStateUpdater() {
	let state = {currentNode: createNumberNode("0")};

	return (updateFunction) => {
		state = updateFunction(state);
		console.log(state.currentNode);
	};
}


export function updateCurrentNode(updateFunction) {
	return ({currentNode}, ...args) => ({currentNode: updateFunction(currentNode, ...args)});
}