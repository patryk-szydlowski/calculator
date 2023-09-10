import { OPERATIONS } from "./operations.js";
import { createNumberNode, createOperandNode, NODES, OPERANDS, updateCurrentCalculation } from "./state.js";

export function handleOperation(operation, value) {
  return (state) => OPERATION_HANDLERS[operation]?.(state, value);
}

const OPERATION_HANDLERS = {
  [OPERATIONS.DIGIT_PLACEMENT]: updateCurrentCalculation(handleDigitNodePlacement),
  [OPERATIONS.DOT_PLACEMENT]: updateCurrentCalculation(handleDotNodePlacement),
  [OPERATIONS.ADDITION]: updateCurrentCalculation(handleOperandNodePlacement(OPERANDS.ADDITION)),
  [OPERATIONS.SUBTRACTION]: updateCurrentCalculation(handleOperandNodePlacement(OPERANDS.SUBTRACTION)),
  [OPERATIONS.MULTIPLICATION]: updateCurrentCalculation(handleOperandNodePlacement(OPERANDS.MULTIPLICATION)),
  [OPERATIONS.DIVISION]: updateCurrentCalculation(handleOperandNodePlacement(OPERANDS.DIVISION)),
  [OPERATIONS.EXPONENTIATION]: updateCurrentCalculation(handleOperandNodePlacement(OPERANDS.EXPONENTIATION)),
  [OPERATIONS.DELETION]: updateCurrentCalculation(handleNodeDeletion),
  [OPERATIONS.CALCULATION]: handleCalculation,
};

function handleDigitNodePlacement([node, ...previousNodes], digit) {
  switch (node.type) {
    case NODES.NUMBER:
      return node.value === "0"
        ? [createNumberNode(digit), ...previousNodes]
        : [createNumberNode(node.value + digit), ...previousNodes];
    case NODES.OPERAND:
      return [createNumberNode(digit), node, ...previousNodes];
  }
}

function handleOperandNodePlacement(operand) {
  return ([node, ...previousNodes]) => {
    switch (node.type) {
      case NODES.NUMBER:
        return [createOperandNode(operand), node, ...previousNodes];
      case NODES.OPERAND:
        return [createOperandNode(operand), ...previousNodes];
    }
  };
}

function handleDotNodePlacement([node, ...previousNodes]) {
  switch (node.type) {
    case NODES.NUMBER:
      return node.value.includes(".")
        ? [node, ...previousNodes]
        : [createNumberNode(node.value + "."), ...previousNodes];
    case NODES.OPERAND:
      return [createNumberNode("."), node, ...previousNodes];
  }
}

function handleNodeDeletion([node, ...previousNodes]) {
  switch (node.type) {
    case NODES.NUMBER:
      return node.value.length > 1
        ? [createNumberNode(node.value.slice(0, -1)), ...previousNodes]
        : previousNodes.length > 1
        ? previousNodes
        : [createNumberNode("0")];
    case NODES.OPERAND:
      return previousNodes;
  }
}

function handleCalculation({ current, previous }) {
  return !isInvalidCalculation(current)
    ? { current: [createNumberNode(String(evaluateCalculation(current)))], previous: current }
    : { current, previous };
}

function isInvalidCalculation([node]) {
  return node.type === NODES.OPERAND || node.value === "-" || node.value === ".";
}

function evaluateCalculation(current) {
  return eval(current.map(getNodeValue).join(" "));
}

function getNodeValue(node) {
  switch (node.type) {
    case NODES.NUMBER:
      return node.value;
    case NODES.OPERAND:
      return node.value === OPERANDS.EXPONENTIATION ? "**" : node.value;
  }
}
