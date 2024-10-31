import * as el from "./elements.js";
import * as actions from "./actions.js";
import carro from "./carro.js";
import { GreenRule, redRule } from "./rules.js";

export let currentLight = el.redLight;
let isPlaying = false;
const randomTime = Math.random() * (15000 - 25000) + 15000;
let resetTimeouts;

export function restartGame() {
  clearTimeout(resetTimeouts); // reseta os timeouts
  // Reseta a velocidade do carro
  carro.speed = 0;

  actions.resetSpeed();

  el.display.innerText = `${carro.speed} KM/H`;

  el.arrowWrapper.style.transform = `rotate(${carro.speed}deg)`;

  // Reinicia o semáforo
  currentLight.style.backgroundColor = "";

  clearTimeout(resetTimeouts);
  el.car.style.animation = `vibrate-1 0.3s linear infinite both`;
  isPlaying = false;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function trafficLight() {
  while (isPlaying) {
    if (!isPlaying) break; // verifica sempre se o estado do isplaying é diferente de true se for ele pausa.

    currentLight = el.redLight;
    currentLight.style.backgroundColor = "red";

    console.log(`${carro.speed}, chegamos aqui`);
    if (carro.speed > 0) {
      redRule();
      return;
    }

    resetTimeouts = setTimeout(() => {
      if (carro.speed > 0) {
        redRule();
      }
    }, 3000);

    await delay(5000);

    if (!isPlaying) break;

    currentLight.style.backgroundColor = "";
    currentLight = el.greenLight;
    console.log("mudando para o verde");
    currentLight.style.backgroundColor = "green";

    resetTimeouts = setTimeout(() => {
      if (carro.speed <= 0) {
        GreenRule();
      }
    }, 3000);

    await delay(randomTime);

    if (!isPlaying) break;

    currentLight.style.backgroundColor = "";
    currentLight = el.yellowLight;
    console.log("Mudando para amarelo");

    currentLight.style.backgroundColor = "yellow";

    await delay(10000);

    if (!isPlaying) break;
  }
}

export function play() {
  if (isPlaying === false) {
    isPlaying = true;

    trafficLight();

    document.documentElement.classList.add("play");
    el.car.style.animation = `vibrate-1 0.3s linear infinite both`;

    console.log("liga");
  } else {
    isPlaying = false;
    document.documentElement.classList.remove("play");

    clearTimeout(resetTimeouts);

    currentLight.style.backgroundColor = "";

    carro.speed = 0;

    el.display.innerText = `${carro.speed} KH/H`;
    el.car.style.animation = `none`;
    console.log("desligado");
  }
}
