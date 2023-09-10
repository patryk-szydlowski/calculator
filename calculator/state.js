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

export function createStateUpdater(onUpdate) {
	let state = {
		current: [createNumberNode("0")],
		previous: [],
	};

	return (updateFunction) => {
		state = updateFunction(state);
		onUpdate(state);
	};
}


export function updateCurrentCalculation(updateFunction) {
	return ({current, ...state}, ...args) => {
		const reversedCalculation = current.toReversed();
		const updatedReversedCalculation = updateFunction(reversedCalculation, ...args);
		const updatedCalculation = updatedReversedCalculation.toReversed();

		return {...state, current: updatedCalculation};
	};
}