import { attachActionButtonListeners, attachKeyboardListener, attachOutputRenderer } from "./dom-hooks.js";
import { handleOperation } from "./handlers.js";
import { createStateUpdater } from "./state.js";
import { renderCalculation } from "./renderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const renderer = attachOutputRenderer(renderCalculation);
  const updateState = createStateUpdater(renderer);

  attachActionButtonListeners(handleOperation, updateState);
  attachKeyboardListener(handleOperation, updateState);
});
