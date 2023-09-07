import { OPERATIONS } from "./operations.js";
import { createNumberNode, createOperandNode, matchNode, NODES, OPERANDS } from "./nodes.js";

export function createOperationHandler() {
	return (operation, value) => (state) => OPERATION_HANDLERS[operation]?.(state, value);
}

const OPERATION_HANDLERS = {
	[OPERATIONS.DIGIT_PLACEMENT]: handleDigitPlacement,
	[OPERATIONS.DOT_PLACEMENT]: handleDotPlacement,
	[OPERATIONS.ADDITION]: handleOperand(OPERANDS.ADDITION),
	[OPERATIONS.SUBTRACTION]: handleOperand(OPERANDS.SUBTRACTION),
	[OPERATIONS.MULTIPLICATION]: handleOperand(OPERANDS.MULTIPLICATION),
	[OPERATIONS.DIVISION]: handleOperand(OPERANDS.DIVISION),
	[OPERATIONS.EXPONENTIATION]: handleOperand(OPERANDS.EXPONENTIATION),
	[OPERATIONS.CALCULATION]: handleCalculation,
	[OPERATIONS.RESET]: handleReset,
};

function handleOperand(operand) {
	return (state) => matchNode(state, {
		[NODES.NUMBER]: (node) => createOperandNode(operand, createNumberNode(node.value), null),
		[NODES.OPERAND]: (node) => node.right
				? createOperandNode(operand, createOperandNode(node.operand, node.left, node.right), null)
				: createOperandNode(operand, node.left, node.right),
	});
}

function handleDigitPlacement(state, digit) {
	return matchNode(state, {
		[NODES.NUMBER]: ({value}) => createNumberNode(value + digit),
		[NODES.OPERAND]: ({operand, left, right}) => right
				? createOperandNode(operand, left, handleDigitPlacement(right, digit))
				: createOperandNode(operand, left, createNumberNode(digit)),
	});
}

function handleDotPlacement(state) {
	return state;
}

function handleCalculation(state) {
	return state;
}

function handleReset(state) {
	return state;
}
