import { attachActionButtonListeners, attachKeyboardListener } from "./dom-hooks.js";
import { createOperationHandler } from "./handlers.js";
import { createStateUpdater } from "./state.js";

document.addEventListener("DOMContentLoaded", () => {
	const handleOperation = createOperationHandler()
	const updateState = createStateUpdater()

	attachActionButtonListeners(handleOperation, updateState);
	attachKeyboardListener(handleOperation, updateState);
});