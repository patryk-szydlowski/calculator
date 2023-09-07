import { OPERATIONS } from "./operations.js";
import { createNumberNode, createOperandNode, matchNode, NODES, OPERANDS } from "./nodes.js";
import { updateCurrentNode } from "./state.js";

export function createOperationHandler() {
	return (operation, value) => (state) => OPERATION_HANDLERS[operation]?.(state, value);
}

const OPERATION_HANDLERS = {
	[OPERATIONS.DIGIT_PLACEMENT]: updateCurrentNode(handleDigitNode),
	[OPERATIONS.DOT_PLACEMENT]: handleDotNode,
	[OPERATIONS.ADDITION]: updateCurrentNode(handleOperandNode(OPERANDS.ADDITION)),
	[OPERATIONS.SUBTRACTION]: updateCurrentNode(handleOperandNode(OPERANDS.SUBTRACTION)),
	[OPERATIONS.MULTIPLICATION]: updateCurrentNode(handleOperandNode(OPERANDS.MULTIPLICATION)),
	[OPERATIONS.DIVISION]: updateCurrentNode(handleOperandNode(OPERANDS.DIVISION)),
	[OPERATIONS.EXPONENTIATION]: updateCurrentNode(handleOperandNode(OPERANDS.EXPONENTIATION)),
	[OPERATIONS.CALCULATION]: handleCalculation,
	[OPERATIONS.RESET]: handleReset,
};

function handleDigitNode(parentNode, digit) {
	return matchNode(parentNode, {
		[NODES.NUMBER]: (node) => node.value === "0"
				? createNumberNode(digit)
				: createNumberNode(node.value + digit),
		[NODES.OPERAND]: (node) => node.right
				? createOperandNode(node.operand, node.left, handleDigitNode(digit)(node.right))
				: createOperandNode(node.operand, node.left, createNumberNode(digit)),
	});
}

function handleOperandNode(operand) {
	return (parentNode) => matchNode(parentNode, {
		[NODES.NUMBER]: (node) => createOperandNode(operand, createNumberNode(node.value), null),
		[NODES.OPERAND]: (node) => node.right
				? createOperandNode(operand, createOperandNode(node.operand, node.left, node.right), null)
				: createOperandNode(operand, node.left, node.right),
	});
}

function handleDotNode(state) {
	return state;
}

function handleCalculation(state) {
	return state;
}

function handleReset(state) {
	return state;
}
