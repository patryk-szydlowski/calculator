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
	return {type: NODES.NUMBER, value};
}

export function createOperandNode(value) {
	return {type: NODES.OPERAND, value};
}

export function matchLastNode(calculation, matcher) {
	const {type, value} = calculation.at(-1);
	return matcher[type](value);
}

export function matchOperand(operand, matcher) {
	return matcher[operand];
}