import carro from "./carro.js";
import * as el from "./elements.js";
import { redRule } from "./rules.js";
import { currentLight, restartGame } from "./trafficLights.js";

export let currentSpeed = carro.speed || 0;
let streetRule = parseInt(routes.value);
let carPosition = 0;
const streetLimit = 71;

export function accelerate() {
  if (currentSpeed < 180) {
    currentSpeed += 10;

    carro.speed = currentSpeed;

    el.display.innerText = ` ${carro.speed}KM/H`;
    el.arrowWrapper.style.transform = `rotate(${carro.speed}deg)`;

    carPosition += 5;
    if (carPosition > 100) carPosition = 100;

    // Reinicia a animação

    el.car.style.animation = `none`; // Remove a animação para reiniciá-la
    el.car.style.animation = `move-car 0.5s ease forwards`; // Reaplica a animação
    el.car.style.animation = `vibrate-1 0.3s linear infinite both`;

    // Ajusta a posição left para o progresso acumulado
    el.car.style.left = `${carPosition}%`;

    if (carPosition > streetLimit) {
      carPosition = 0;
    }

    if (carro.speed > streetRule) {
      alert(
        `Sua velocidade atual ${carro.speed} km/h. Ultrapassou o limite da via. Game over!`
      );
      restartGame();
    }
  }
}

export function slowDown() {
  if (currentSpeed > 0) {
    currentSpeed -= 10;

    carro.speed = currentSpeed;

    el.display.innerText = `${carro.speed} KM/H`;

    el.arrowWrapper.style.transform = `rotate(${carro.speed}deg)`;
  }
}
routes.addEventListener("change", () => {
  streetRule = parseInt(routes.value);
  if (carro.speed > streetRule) {
    alert(`Voce esta acima do limite de velocidade da via jogo reiniciado`);
    restartGame();
  }
});

export function resetSpeed() {
  currentSpeed = 0;
}
