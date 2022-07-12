/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Board from './components/Board';
import Header from './components/Header';
import Help from './components/Help';
import Keyboard from './components/Keyboard';
import Settings from './components/Settings';
import Stats from './components/Stats';
import { encriptarPalabra } from './libs/crypto';
import cargarSettings from './utils/cargarSettings';
import displayMenu from './utils/displayMenu';
import guardarEstado from './utils/guardarEstado';
import keyPress from './utils/keypress';
import llenarArray from './utils/llenarArray';
import recuperarStats from './utils/recuperarStats';
import showLastTry from './utils/showLastTry';

// TODO: Parsear en python un diccionario final.
const diccionario = require('./diccionario.json');
const words = require('./palabras_5.json');

words.forEach((word) => diccionario.push(word));

export default function App() {
  const [juego, setJuego] = useState({
    position: 1,
    row: 1,
    dificil: false,
    modoOscuro: true,
    modoDaltonico: false,
    dailyWord: encriptarPalabra(words[Math.floor(Math.random() * words.length)]),
    juegoFinalizado: false,
    jugadas: 0,
    victorias: 0,
    distribucion: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      X: 0,
    },
    estadoActual: [],
    dailyMode: false,
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('juego'));
    if (savedData) {
      let newState = {
        dificil: savedData.dificil,
        modoOscuro: savedData.modoOscuro,
        modoDaltonicos: savedData.modoDaltonicos,
        dailyWord: savedData.dailyWord,
        distribucion: savedData.distribucion,
        estadoActual: savedData.estadoActual,
        row: 1,
        position: 1,
      };
      if (newState.estadoActual[0] && newState.estadoActual[0] !== '') {
        for (let i = 0; i < newState.estadoActual.length; i++) {
          if (newState.estadoActual[i] !== '') {
            newState = keyPress(newState.estadoActual[i], newState);
            if ((i + 1) % 5 === 0) {
              newState = llenarArray(newState);
              newState = keyPress('Enter', newState);
            }
          }
        }
      }
      newState = recuperarStats(newState);
      setJuego((prevState) => ({ ...prevState, ...newState }));
    }
  }, []);

  useEffect(() => {
    cargarSettings(juego);
    document.onkeydown = (e) => {
      let newState = keyPress(e.key, juego);
      if (e.key === 'Enter') {
        newState = llenarArray(newState);
        guardarEstado(newState);
      }
      setJuego(newState);
    };
  }, [juego]);

  return (
    <div className="game">
      <ToastContainer limit={3} />
      <div className="game-main">
        <Header
          juego={juego}
          setJuego={setJuego}
          displayHelp={() => displayMenu('.game-help')}
          displayStats={() => displayMenu('.game-stats')}
          displaySettings={() => displayMenu('.game-settings')}
        />
        <Board juego={juego} />
        <Keyboard keypress={(i) => keyPress(i, juego, setJuego)} />
      </div>
      <div className="game-help hidden scale-up-center">
        <Help displayHelp={() => displayMenu('.game-help')} />
      </div>
      <div className="game-stats hidden scale-up-center">
        <Stats displayStats={() => displayMenu('.game-stats')} juego={juego} />
      </div>
      <div className="game-settings hidden scale-up-center">
        <Settings juego={juego} setJuego={setJuego} displaySettings={() => displayMenu('.game-settings')} />
      </div>
    </div>
  );
}
