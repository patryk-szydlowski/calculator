export const NODES = {
	NUMBER: "number",
	OPERAND: "operand",
};

export const OPERANDS = {
	ADDITION: "+",
	SUBTRACTION: "-",
	MULTIPLICATION: "*",
	DIVISION: "/",
	EXPONENTIATION: "^",
};

export function createNumberNode(value) {
	return {type: NODES.NUMBER, value: value};
}

export function createOperandNode(operand, left, right) {
	return {type: NODES.OPERAND, operand, left, right};
}

export function matchNode(node, matcher) {
	return matcher[node.type](node);
}