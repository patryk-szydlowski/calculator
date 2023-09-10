import { NODES, OPERANDS } from "./state.js";

export function renderCalculation(nodes) {
  const { renderedNodes } = nodes.reduce(
    (accumulator, node, index) => renderNode({ ...accumulator, index, node, nextNode: nodes.at(index + 1) }),
    { renderedNodes: [], skippedIndices: [] },
  );

  return renderedNodes;
}

function renderNode({ index, node, nextNode, renderedNodes, skippedIndices }) {
  if (skippedIndices.includes(index)) {
    return { renderedNodes, skippedIndices };
  }

  switch (node.type) {
    case NODES.NUMBER:
      return { renderedNodes: [...renderedNodes, renderNumberNode(node)], skippedIndices };
    case NODES.OPERAND:
      return {
        renderedNodes: [...renderedNodes, renderOperandNode(node, nextNode)],
        skippedIndices: node.value === OPERANDS.EXPONENTIATION ? [...skippedIndices, index + 1] : skippedIndices,
      };
  }
}

function renderNumberNode(node) {
  return node.value;
}

function renderOperandNode(node, nextNode) {
  switch (node.value) {
    case OPERANDS.ADDITION:
      return " \u002B ";
    case OPERANDS.SUBTRACTION:
      return " \u2212 ";
    case OPERANDS.MULTIPLICATION:
      return " \u00D7 ";
    case OPERANDS.DIVISION:
      return " \u00F7 ";
    case OPERANDS.EXPONENTIATION:
      return renderExponentiationNode(nextNode);
  }
}

function renderExponentiationNode(node) {
  const wrapper = document.createElement("sup");

  if (node?.value) {
    wrapper.append(node.value);
  }

  return wrapper;
}
