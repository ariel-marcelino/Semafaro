import carro from "./carro.js";
import { currentLight, restartGame } from "./trafficLights.js";

let penalties = 0;

function applyPenalty() {
  penalties += 1;
  alert(
    `Voce recebeu uma multa tenha mais cuidado! Total de multas: ${penalties}`
  );

  if (penalties >= 3) {
    alert(`Voce recebeu ${penalties} multas! Game Over`);
    restartGame();
    penalties = 0;
  }
}

export function redRule() {
  if (currentLight.style.backgroundColor === "red" && carro.speed > 0) {
    alert("Você estava em movimento no sinal vermelho! Jogo reiniciado.");
    restartGame();
  }
}

export function GreenRule() {
  if (currentLight.style.backgroundColor === "green" && carro.speed <= 0) {
    applyPenalty();
  }
}
