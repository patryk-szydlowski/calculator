import { matchLastNode, matchOperand, NODES, OPERANDS } from "./nodes.js";

export function renderNode(nodes) {
	return nodes.map(node => node.value).join(" ")
}

function renderNumberNode(node) {
	return [node.value];
}

function renderOperandNode(node) {
	return matchOperand(node.operand, {
		[OPERANDS.ADDITION]: renderFormattedOperandNode(node, "\u002B"),
		[OPERANDS.SUBTRACTION]: renderFormattedOperandNode(node, "\u2212"),
		[OPERANDS.MULTIPLICATION]: renderFormattedOperandNode(node, "\u00D7"),
		[OPERANDS.DIVISION]: renderFormattedOperandNode(node, "\u00F7"),
		[OPERANDS.EXPONENTIATION]: renderExponentiationOperandNode(node),
	});
}

function renderFormattedOperandNode(node, formattedOperand) {
	return [...renderNode(node.left), " ", formattedOperand, " ", ...renderNode(node.right)];
}

function renderExponentiationOperandNode(node) {
	const wrapper = document.createElement("sup");
	wrapper.append(...renderNode(node.right));
	return [...renderNode(node.left), wrapper];
}