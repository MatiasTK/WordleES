/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import cargarSettings from '../utils/cargarSettings';
import restartGame from '../utils/restartGame';

export default function Settings({ juego, setJuego, displaySettings }) {
  const [apiWord, setApiWord] = useState('');

  function cambiarModoDificil() {
    const newState = restartGame(juego);
    setJuego({
      ...newState,
      dificil: !juego.dificil,
    });
  }

  function cambiarModoOscuro() {
    const newState = {
      ...juego,
      modoOscuro: !juego.modoOscuro,
    };
    setJuego(newState);
    cargarSettings(newState);
  }

  function cambiarModoDaltonico() {
    const newState = {
      ...juego,
      modoDaltonico: !juego.modoDaltonico,
    };
    setJuego(newState);
    cargarSettings(newState);
  }

  function cambiarDailyMode() {
    const newState = restartGame(juego);
    setJuego({
      ...newState,
      dailyMode: !juego.dailyMode,
      dailyWord: apiWord
    })
  }

  /* useEffect(() => {
    const fetchData = async () => {
      const raw = await axios.get('https://wordle-ashy.vercel.app/api/wordle');
      const word = JSON.stringify(raw);
      return word;
    }

    setApiWord(fetchData())

  }, []); */

  return (
    <div className="settings">
      <div className="settings-container">
        <h3 className="settings-titulo">
          Ajustes
          <button className="ayuda-salir" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#a3a3a3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => displaySettings()}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </h3>
        <div className="settings-opciones">
        <div className="settings-opcion">
            <div>
              <p className="settings-opcion__texto">Modo Diario</p>
              <p className="settings-opcion__subtexto">Solo una palabra por dia.</p>
            </div>
            <div>
              <div className="onoffswitch">
                <input
                  type="checkbox"
                  name="onoffswitch"
                  className="onoffswitch-checkbox"
                  id="myonoffswitch"
                  tabIndex={0}
                  checked={juego.dailyMode}
                  onChange={() => cambiarDailyMode()}
                />
                <label className="onoffswitch-label" htmlFor="myonoffswitch" />
              </div>
            </div>
          </div>
          <div className="settings-opcion">
            <div>
              <p className="settings-opcion__texto">Modo Oscuro</p>
            </div>
            <div>
              <div className="onoffswitch">
                <input
                  type="checkbox"
                  name="onoffswitch"
                  className="onoffswitch-checkbox"
                  id="myonoffswitch-3"
                  tabIndex={-3}
                  checked={juego.modoOscuro}
                  onChange={() => cambiarModoOscuro()}
                />
                <label className="onoffswitch-label" htmlFor="myonoffswitch-3" />
              </div>
            </div>
          </div>
          <div className="settings-opcion">
            <div>
              <p className="settings-opcion__texto">Modo Dificil</p>
              <p className="settings-opcion__subtexto">Mas palabras pero sin ser verificadas. Yo te avise.</p>
            </div>
            <div>
              <div className="onoffswitch">
                <input
                  type="checkbox"
                  name="onoffswitch"
                  className="onoffswitch-checkbox"
                  id="myonoffswitch-1"
                  tabIndex={-1}
                  checked={juego.dificil}
                  onChange={() => cambiarModoDificil()}
                />
                <label className="onoffswitch-label" htmlFor="myonoffswitch-1" />
              </div>
            </div>
          </div>
          <div className="settings-opcion">
            <div>
              <p className="settings-opcion__texto">Modo para Daltonicos</p>
            </div>
            <div>
              <div className="onoffswitch">
                <input
                  type="checkbox"
                  name="onoffswitch-2"
                  className="onoffswitch-checkbox"
                  id="myonoffswitch-2"
                  tabIndex={-2}
                  checked={juego.modoDaltonicos}
                  onChange={() => cambiarModoDaltonico()}
                />
                <label className="onoffswitch-label" htmlFor="myonoffswitch-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-ayuda">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-brand-github"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#a3a3a3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>
        <a href="https://github.com/MatiasTK">MatiasTK</a>
      </footer>
    </div>
  );
}
