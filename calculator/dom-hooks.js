import { OPERATIONS } from "./operations.js";

const OPERATION_KEYS = {
	"0": OPERATIONS.DIGIT_PLACEMENT,
	"1": OPERATIONS.DIGIT_PLACEMENT,
	"2": OPERATIONS.DIGIT_PLACEMENT,
	"3": OPERATIONS.DIGIT_PLACEMENT,
	"4": OPERATIONS.DIGIT_PLACEMENT,
	"5": OPERATIONS.DIGIT_PLACEMENT,
	"6": OPERATIONS.DIGIT_PLACEMENT,
	"7": OPERATIONS.DIGIT_PLACEMENT,
	"8": OPERATIONS.DIGIT_PLACEMENT,
	"9": OPERATIONS.DIGIT_PLACEMENT,
	".": OPERATIONS.DOT_PLACEMENT,
	"+": OPERATIONS.ADDITION,
	"-": OPERATIONS.SUBTRACTION,
	"*": OPERATIONS.MULTIPLICATION,
	"/": OPERATIONS.DIVISION,
	"^": OPERATIONS.EXPONENTIATION,
	"Backspace": OPERATIONS.DELETION,
	"Enter": OPERATIONS.CALCULATION,
};

function isValidOperation(operation) {
	return Object.values(OPERATIONS).includes(operation);
}


export function attachActionButtonListeners(handleOperation, updateState) {
	document.querySelectorAll(".calculator-action").forEach(actionElement => {
		const operation = actionElement.getAttribute("data-operation");
		const value = actionElement.innerText;

		if (isValidOperation(operation)) {
			actionElement.addEventListener("click", () => {
				updateState(handleOperation(operation, value));
			});
		}
	});
}

export function attachKeyboardListener(handleOperation, updateState) {
	document.addEventListener("keydown", event => {
		const operation = OPERATION_KEYS[event.key];
		const value = event.key;

		if (isValidOperation(operation)) {
			updateState(handleOperation(operation, value));
		}
	});
}

export function attachOutputRenderer(renderNode) {
	const currentOutput = document.querySelector(".calculator-current-output");
	const previousOutput = document.querySelector(".calculator-previous-output");

	return ({currentNode, previousNode}) => {
		currentOutput.replaceChildren(...renderNode(currentNode));
		previousOutput.replaceChildren(...renderNode(previousNode));
	};
}