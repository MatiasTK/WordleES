import keyPress from './keypress';
import llenarArray from './llenarArray';

export default function showLastTry(juego) {
  if (juego.estadoActual && juego.estadoActual[0] !== '') {
    for (let i = 0; i < juego.estadoActual.length; i++) {
      keyPress(juego.estadoActual[i], juego);
      if ((i + 1) % 5 === 0) {
        llenarArray(juego);
        keyPress('Enter', juego);
      }
    }
  }
}
