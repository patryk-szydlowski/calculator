import { OPERATIONS } from "./operations.js";
import { createNumberNode, createOperandNode, matchNode, matchOperand, NODES, OPERANDS } from "./nodes.js";
import { updateCurrentNode } from "./state.js";

export function createOperationHandler() {
	return (operation, value) => (state) => OPERATION_HANDLERS[operation]?.(state, value);
}

const OPERATION_HANDLERS = {
	[OPERATIONS.DIGIT_PLACEMENT]: updateCurrentNode(handleDigitNodePlacement),
	[OPERATIONS.DOT_PLACEMENT]: updateCurrentNode(handleDotNodePlacement),
	[OPERATIONS.ADDITION]: updateCurrentNode(handleOperandNodePlacement(OPERANDS.ADDITION)),
	[OPERATIONS.SUBTRACTION]: updateCurrentNode(handleOperandNodePlacement(OPERANDS.SUBTRACTION)),
	[OPERATIONS.MULTIPLICATION]: updateCurrentNode(handleOperandNodePlacement(OPERANDS.MULTIPLICATION)),
	[OPERATIONS.DIVISION]: updateCurrentNode(handleOperandNodePlacement(OPERANDS.DIVISION)),
	[OPERATIONS.EXPONENTIATION]: updateCurrentNode(handleOperandNodePlacement(OPERANDS.EXPONENTIATION)),
	[OPERATIONS.DELETION]: updateCurrentNode(handleNodeDeletion(true)),
	[OPERATIONS.CALCULATION]: handleCalculation,
};

function handleDigitNodePlacement(parentNode, digit) {
	return matchNode(parentNode, {
		[NODES.NUMBER]: (node) => node.value === "0"
				? createNumberNode(digit)
				: createNumberNode(node.value + digit),
		[NODES.OPERAND]: (node) => node.right
				? createOperandNode(node.operand, node.left, handleDigitNodePlacement(node.right, digit))
				: createOperandNode(node.operand, node.left, createNumberNode(digit)),
	});
}

function handleOperandNodePlacement(operand) {
	return (parentNode) => matchNode(parentNode, {
		[NODES.NUMBER]: (node) => createOperandNode(operand, createNumberNode(node.value), null),
		[NODES.OPERAND]: (node) => node.right
				? createOperandNode(operand, createOperandNode(node.operand, node.left, node.right), null)
				: createOperandNode(operand, node.left, node.right),
	});
}

function handleDotNodePlacement(parentNode) {
	return matchNode(parentNode, {
		[NODES.NUMBER]: (node) => node.value.includes(".")
				? createNumberNode(node.value)
				: createNumberNode(node.value + "."),
		[NODES.OPERAND]: (node) => node.right
				? createOperandNode(node.operand, node.left, handleDotNodePlacement(node.right))
				: createOperandNode(node.operand, node.left, createNumberNode(".")),
	});
}

function handleNodeDeletion(rootNode) {
	return (parentNode) => matchNode(parentNode, {
		[NODES.NUMBER]: (node) => node.value.length === 1
				? rootNode ? createNumberNode("0") : null
				: createNumberNode(node.value.slice(0, -1)),
		[NODES.OPERAND]: (node) => node.right
				? createOperandNode(node.operand, node.left, handleNodeDeletion(false)(node.right))
				: node.left,
	});
}

function handleCalculation({currentNode, previousNode}) {
	const calculation = handleNodeCalculation(currentNode);

	return calculation
			? {currentNode: createNumberNode(String(calculation)), previousNode: currentNode}
			: {currentNode, previousNode};
}

function handleNodeCalculation(parentNode) {
	return matchNode(parentNode, {
		[NODES.NUMBER]: (node) => Number(node.value),
		[NODES.OPERAND]: (node) => !node.right
				? null
				: matchOperand(node.operand, {
					[OPERANDS.ADDITION]: handleNodeCalculation(node.left) + handleNodeCalculation(node.right),
					[OPERANDS.SUBTRACTION]: handleNodeCalculation(node.left) - handleNodeCalculation(node.right),
					[OPERANDS.MULTIPLICATION]: handleNodeCalculation(node.left) * handleNodeCalculation(node.right),
					[OPERANDS.DIVISION]: handleNodeCalculation(node.left) / handleNodeCalculation(node.right),
					[OPERANDS.EXPONENTIATION]: handleNodeCalculation(node.left) ** handleNodeCalculation(node.right),
				}),
	});
}
