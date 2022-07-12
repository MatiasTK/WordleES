import { toast, Zoom } from 'react-toastify';
import { desencriptarPalabra } from '../libs/crypto';

const diccionario = require('../final_dictionary.json');

let juegoActual;

// TODO: Mejorar que no exista variable global juegoActual.

async function movePosition(stepForward = true) {
  if (stepForward) {
    const nextPosition = juegoActual.position + 1;
    if (nextPosition <= juegoActual.row * 5) {
      juegoActual.position = nextPosition;
    }
  } else {
    const previousPosition = juegoActual.position - 1;
    if (previousPosition >= juegoActual.row * 5 - 4) {
      juegoActual.position = previousPosition;
    }
  }
}

function checkWord() {
  let word = '';

  const square = document.querySelectorAll('.square');
  for (let i = juegoActual.row * 5 - 5; i < juegoActual.row * 5; i++) {
    word += square[i].textContent;
  }

  if (word.length !== 5) {
    toast.info('No hay suficientes letras', {
      position: 'top-center',
      className: 'toast',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    });

    return false;
  }

  const cantidadRepetidos = {};
  const palabra = desencriptarPalabra(juegoActual.dailyWord);
  for (let i = 0; i < palabra.length; i++) {
    cantidadRepetidos[palabra[i]] = 0;
  }
  for (let i = 0; i < palabra.length; i++) {
    cantidadRepetidos[palabra[i]] += 1;
  }

  word = word.toLowerCase();

  if (!diccionario.includes(word)) {
    toast.info('La palabra no está en el diccionario', {
      position: 'top-center',
      className: 'toast',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    });
    return false;
  }
  let delay = 0;
  for (let i = 0; i < 5; i++) {
    square[i + 5 * (juegoActual.row - 1)].style.animationDelay = `${delay}s`;
    square[i + 5 * (juegoActual.row - 1)].style.transitionDelay = `${delay}s`;
    delay += 0.4;
    square[i + 5 * (juegoActual.row - 1)].classList.add('scale-up-center');

    if (word[i] === desencriptarPalabra(juegoActual.dailyWord)[i]) {
      square[i + 5 * (juegoActual.row - 1)].classList.add('correcto');
      document.getElementById(word[i].toUpperCase()).classList.add('correcto');
      cantidadRepetidos[word[i]] -= 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (
      desencriptarPalabra(juegoActual.dailyWord).includes(word[i]) && cantidadRepetidos[word[i]] > 0
    ) {
      square[i + 5 * (juegoActual.row - 1)].classList.add('presente');
      document.getElementById(word[i].toUpperCase()).classList.add('presente');
      cantidadRepetidos[word[i]] -= 1;
    } else {
      square[i + 5 * (juegoActual.row - 1)].classList.add('incorrecto');
      document.getElementById(word[i].toUpperCase()).classList.add('incorrecto');
    }
  }

  if (word === desencriptarPalabra(juegoActual.dailyWord)) {
    toast.success('Felicitaciones, acertaste!!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const nuevasJugadas = juegoActual.jugadas + 1;
    const nuevasVictorias = juegoActual.victorias + 1;
    const nuevaDistribucion = { ...juegoActual.distribucion };
    nuevaDistribucion[juegoActual.row] += 1;
    juegoActual = {
      ...juegoActual,
      juegoFinalizado: true,
      jugadas: nuevasJugadas,
      victorias: nuevasVictorias,
      distribucion: nuevaDistribucion,
    };
  }
  return true;
}

function moveRow() {
  if (juegoActual.position % 5 !== 0) {
    return;
  }

  const nextRow = juegoActual.row + 1;
  const nextPosition = juegoActual.position + 1;
  juegoActual = {
    ...juegoActual,
    row: nextRow,
    position: nextPosition,
  };
}

function fallaste() {
  if (juegoActual.juegoFinalizado) {
    return;
  }

  if (juegoActual.position === 31 && juegoActual.row === 7) {
    toast.error(`Fallaste, la palabra era ${desencriptarPalabra(juegoActual.dailyWord)}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const nuevasJugadas = juegoActual.jugadas + 1;
    const nuevaDistribucion = { ...juegoActual.distribucion };
    nuevaDistribucion.X += 1;
    juegoActual = {
      ...juegoActual,
      juegoFinalizado: true,
      jugadas: nuevasJugadas,
      distribucion: nuevaDistribucion,
    };
  }
}

// Returns a new state to avoid breaking react rules.
function keyPress(e, juego) {
  juegoActual = juego;

  if (juegoActual.juegoFinalizado) {
    return juegoActual;
  }

  let square = document.getElementsByClassName('square')[juegoActual.position - 1];
  if (e === 'Backspace') {
    if (square.textContent === '') {
      movePosition(false);
    }
    square = document.getElementsByClassName('square')[juegoActual.position - 1];
    square.textContent = '';
  } else if (e === 'Enter') {
    const existe = checkWord();
    if (existe) {
      moveRow();
    }
  } else if (e.length === 1 && square.textContent === '' && /[a-zA-Z\u00f1\u00d1]/.test(e)) {
    const span = document.createElement('span');
    span.textContent = e;
    square.appendChild(span);
    movePosition();
  }
  fallaste();

  return juegoActual;
}

export default keyPress;
