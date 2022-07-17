import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Board from './components/Board';
import Header from './components/Header';
import Help from './components/Help';
import Keyboard from './components/Keyboard';
import Settings from './components/Settings';
import Stats from './components/Stats';
import { encriptarPalabra } from './libs/crypto';
import { Juego } from './types/types';
import cargarSettings from './utils/cargarSettings';
import guardarEstado from './utils/guardarEstado';
import keyPress from './utils/keypress';
import llenarArray from './utils/llenarArray';
import recuperarStats from './utils/recuperarStats';

const words: string[] = require('./json/palabras_5.json');

export default function App() {
  const [juego, setJuego] = useState<Juego>({
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
    streak: 0,
    maxStreak: 0,
    hardModeMustContain: []
  });

  useEffect(() => {
    function getLastData() {
      const rawData = localStorage.getItem('juego');
      if (!rawData) {
        console.log('No saved data');
        return;
      }
      const savedData = JSON.parse(rawData);
      if (savedData) {
        let newState: Juego = {
          dificil: savedData.dificil,
          modoOscuro: savedData.modoOscuro,
          modoDaltonico: savedData.modoDaltonico,
          dailyWord: savedData.dailyWord,
          distribucion: savedData.distribucion,
          estadoActual: savedData.estadoActual,
          // Seteo las variables en 0 ya que voy a simular un juego, luego las reinicio a sus estados anteriores.
          jugadas: 0,
          victorias: 0,
          juegoFinalizado: false,
          row: 1,
          position: 1,
          dailyMode: savedData.dailyMode,
          streak: 0,
          maxStreak: 0,
          hardModeMustContain: []
        };
        if (savedData.estadoActual[0] && savedData.estadoActual[0] !== '') {
          for (let i = 0; i < savedData.estadoActual.length; i++) {
            if (savedData.estadoActual[i] !== '') {
              newState = keyPress(savedData.estadoActual[i], newState);
              if ((i + 1) % 5 === 0) {
                newState = llenarArray(newState);
                newState = keyPress('Enter', newState);
              }
            }
          }
        }
        newState = recuperarStats(newState);
        setJuego(newState);
      }
    }

    getLastData();
  }, []);

  useEffect(() => {
    function listenKeydown() {
      document.onkeydown = (e) => {
        let newState = keyPress(e.key, juego);
        if (e.key === 'Enter') {
          newState = llenarArray(newState);
          guardarEstado(newState);
        }
        setJuego(newState);
      };
    }

    cargarSettings(juego);
    listenKeydown();
  }, [juego]);

  useEffect(() => {
    const fetchData = async () => {
      const word = await axios.get(process.env.REACT_APP_WORDLE_API_URL!);
      const daily = word.data.dailyWord;
      const dailyCrypted = encriptarPalabra(daily);

      if (juego.dailyMode) {
        setJuego((j) => ({ ...j, dailyWord: dailyCrypted }));
      }
    };

    fetchData();
  }, [juego.dailyMode]);

  return (
    <div className="game">
      <div className="game-main">
        <Header juego={juego} setJuego={setJuego} />
        <Board />
        <Keyboard juego={juego} setJuego={setJuego} />
      </div>
      <div className="game-help hidden scale-up-center">
        <Help />
      </div>
      <div className="game-stats hidden scale-up-center">
        <Stats juego={juego} />
      </div>
      <div className="game-settings hidden scale-up-center">
        <Settings juego={juego} setJuego={setJuego} />
      </div>
      <ToastContainer limit={3} />
    </div>
  );
}
