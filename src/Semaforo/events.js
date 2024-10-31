import * as el from "./elements.js";
import { accelerate, slowDown } from "./actions.js";
import { play } from "./trafficLights.js";

const actions = {
  accelerate,
  slowDown,
  play,
};

export function registerControllers() {
  el.controls.addEventListener("click", event => {
    const action = event.target.dataset.action;

    if (typeof actions[action] != "function") {
      return;
    }
    console.log(`Velocidade atual é ${action}`);
    actions[action]();
  });
}
