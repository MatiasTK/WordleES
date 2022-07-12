import { encriptarPalabra } from '../libs/crypto';

const words = require('../palabras_5.json');
const diccionario = require('../final_dictionary.json');

// Returns new state to avoid breaking react rules.
export default function restartGame(juego) {
  const squares = document.getElementsByClassName('square');
  let newGame = juego;
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.remove('correcto');
    squares[i].classList.remove('presente');
    squares[i].classList.remove('incorrecto');
    squares[i].classList.remove('scale-up-center');
    squares[i].textContent = '';
  }
  const keys = document.getElementsByClassName('key');
  for (let i = 0; i < keys.length; i++) {
    keys[i].classList.remove('correcto');
    keys[i].classList.remove('presente');
    keys[i].classList.remove('incorrecto');
  }

  newGame = {
    ...newGame,
    row: 1,
    position: 1,
  };

  if (juego.dificil) {
    newGame = {
      ...newGame,
      dailyWord: encriptarPalabra(
        diccionario[Math.floor(Math.random() * diccionario.length)],
      ),
    };
  } else {
    newGame = {
      ...newGame,
      dailyWord: encriptarPalabra(
        words[Math.floor(Math.random() * words.length)],
      ),
    };
  }

  newGame = {
    ...newGame,
    juegoFinalizado: false,
  };

  return newGame;
}