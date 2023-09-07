import { createNumberNode } from "./nodes.js";

export function createStateUpdater() {
	let state = createNumberNode(0);

	return (updateFunction) => {
		state = updateFunction(state);
		console.log(state);
	};
}
