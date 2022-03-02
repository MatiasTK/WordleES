import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./switch.css";
import CryptoJS from "crypto-js";

/* 
TO DO:
10- Compartir twitter y fb.
1- ̶B̶̶̶o̶̶̶t̶̶̶o̶̶̶n̶̶̶ ̶̶̶p̶̶̶a̶̶̶r̶̶̶a̶̶̶ ̶̶̶r̶̶̶e̶̶̶i̶̶̶n̶̶̶i̶̶̶c̶̶̶i̶̶̶a̶̶̶r̶̶̶ ̶̶̶e̶̶̶l̶̶̶ ̶̶̶j̶̶̶u̶̶̶e̶̶̶g̶̶̶o̶̶̶
2- A̶l̶e̶r̶t̶a̶s̶ ̶c̶u̶a̶n̶d̶o̶ ̶s̶e̶ ̶a̶c̶i̶e̶r̶t̶a̶ ̶y̶ ̶c̶u̶a̶n̶d̶o̶ ̶n̶o̶ ̶e̶x̶i̶s̶t̶e̶
3- A̶l̶e̶r̶t̶a̶ ̶c̶u̶a̶n̶d̶o̶ ̶p̶o̶n̶e̶ ̶p̶a̶l̶a̶b̶r̶a̶ ̶m̶e̶n̶o̶r̶ ̶a̶ ̶5̶
4- C̶h̶e̶q̶u̶e̶a̶r̶ ̶p̶a̶l̶a̶b̶r̶a̶ ̶e̶n̶ ̶r̶a̶e̶?̶ ̶S̶c̶r̶a̶p̶i̶n̶g̶  -> Imposible, son muchas, como mucho podes buscar un diccionario oficial en linea.
5- M̶o̶d̶o̶ ̶c̶l̶a̶r̶o̶/̶o̶s̶c̶u̶r̶o̶.̶
6- S̶e̶t̶t̶i̶n̶g̶s̶ ̶d̶e̶ ̶g̶u̶a̶r̶d̶a̶d̶o̶ ̶l̶o̶c̶a̶l̶ ̶d̶e̶ ̶p̶r̶e̶f̶e̶r̶e̶n̶c̶i̶a̶s̶.̶
7- M̶e̶n̶u̶ ̶d̶e̶ ̶a̶y̶u̶d̶a̶
8- M̶e̶n̶u̶ ̶e̶s̶t̶a̶d̶i̶s̶t̶i̶c̶a̶s̶.̶
9- ̶M̶o̶d̶o̶ ̶d̶i̶f̶i̶c̶i̶l̶?̶.̶
11- A̶r̶r̶e̶g̶l̶a̶r̶ ̶p̶a̶l̶a̶b̶r̶a̶s̶ ̶d̶e̶l̶ ̶d̶i̶c̶ ̶c̶o̶n̶ ̶s̶i̶g̶n̶o̶ ̶d̶e̶ ̶p̶r̶e̶g̶u̶n̶t̶a̶
12- A̶r̶r̶e̶g̶l̶a̶r̶ ̶c̶e̶n̶t̶r̶a̶d̶o̶ ̶d̶e̶ ̶t̶e̶x̶t̶o̶ ̶s̶q̶u̶a̶r̶e̶
13- ̶D̶e̶s̶a̶c̶t̶i̶v̶a̶r̶ ̶d̶o̶b̶l̶e̶ ̶d̶e̶t̶e̶c̶c̶i̶o̶n̶ ̶d̶e̶ ̶p̶a̶l̶a̶b̶r̶a̶s̶ ̶r̶e̶p̶e̶t̶i̶d̶a̶s̶?̶ ̶E̶J̶:̶ ̶p̶o̶l̶l̶o̶ ̶d̶e̶t̶e̶c̶t̶a̶ ̶l̶a̶s̶ ̶d̶o̶s̶ ̶L̶ ̶s̶i̶ ̶l̶a̶ ̶p̶a̶l̶a̶b̶r̶a̶ ̶s̶o̶l̶o̶ ̶t̶i̶e̶n̶e̶ ̶1̶.̶
14- A̶r̶r̶e̶g̶l̶a̶r̶ ̶d̶e̶t̶e̶c̶c̶i̶o̶n̶ ̶d̶e̶ ̶p̶a̶l̶a̶b̶r̶a̶s̶?̶
15- A̶r̶r̶e̶g̶l̶a̶r̶ ̶d̶i̶c̶c̶i̶o̶n̶a̶r̶i̶o̶,̶ ̶h̶a̶c̶e̶r̶l̶o̶ ̶m̶a̶s̶ ̶f̶a̶c̶i̶l̶
*/

const diccionario = require("./diccionario.json");
const words = require("./palabras_5.json");
words.forEach((word) => diccionario.push(word));
const secretKey = "RSS6LZ9rO8EUZb2q16fH";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-help"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#525252"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => this.props.displayHelp()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="17" x2="12" y2="17.01" />
            <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-refresh"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#424242"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => this.props.onClick()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
        </div>
        <h1 className="titulo">Wordle</h1>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chart-bar"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#525252"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => this.props.displayStats()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="3" y="12" width="6" height="8" rx="1" />
            <rect x="9" y="8" width="6" height="12" rx="1" />
            <rect x="15" y="4" width="6" height="16" rx="1" />
            <line x1="4" y1="20" x2="18" y2="20" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-settings"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#525252"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => this.props.displaySettings()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      </header>
    );
  }
}

class Board extends React.Component {
  state = {
    array: [],
  };

  async componentDidMount() {
    const data = await localStorage.getItem("square");
    if (data) {
      let parse = await JSON.parse(data);
      if (parse.array[0] !== "") {
        for (let i = 0; i < parse.array.length; i++) {
          if (parse.array[i] !== "") {
            await this.props.keyPress(parse.array[i]);
            if ((i + 1) % 5 === 0) {
              await this.llenarArray();
              await this.props.keyPress("Enter");
            }
          }
        }
      }
      await this.props.recuperarStats();
    }
  }

  async guardarEstado() {
    await localStorage.setItem("square", JSON.stringify(this.state));
  }

  renderSquare(i) {
    return <button className="square" value={i}></button>;
  }

  async llenarArray() {
    const square = document.querySelectorAll(".square");
    let newArray = [];

    for (let i = 0; i < square.length; i++) {
      newArray.push(square[i].textContent);
    }

    this.state.array = newArray;
  }

  render() {
    document.onkeyup = (e) => {
      if (e.key === "Enter") {
        this.llenarArray();
      }
    };
    window.onbeforeunload = () => {
      this.llenarArray();
      this.guardarEstado();
      this.props.guardarEstado();
    };
    return (
      <main className="board-flex">
        <div className="board">
          <div className="fila">
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="fila">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
          </div>
          <div className="fila">
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
          <div className="fila">
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="fila">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
          </div>
          <div className="fila">
            {this.renderSquare(26)}
            {this.renderSquare(27)}
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
          </div>
        </div>
      </main>
    );
  }
}

class Keyboard extends React.Component {
  renderKey(i) {
    return (
      <button className="key" id={i} onClick={() => this.props.onClick(i)}>
        {i}
      </button>
    );
  }

  render() {
    return (
      <div className="keyboard">
        <div className="fila-keyboard">
          {this.renderKey("Q")}
          {this.renderKey("W")}
          {this.renderKey("E")}
          {this.renderKey("R")}
          {this.renderKey("T")}
          {this.renderKey("Y")}
          {this.renderKey("U")}
          {this.renderKey("I")}
          {this.renderKey("O")}
          {this.renderKey("P")}
        </div>
        <div className="fila-keyboard">
          {this.renderKey("A")}
          {this.renderKey("S")}
          {this.renderKey("D")}
          {this.renderKey("F")}
          {this.renderKey("G")}
          {this.renderKey("H")}
          {this.renderKey("J")}
          {this.renderKey("K")}
          {this.renderKey("L")}
          {this.renderKey("Ñ")}
        </div>
        <div className="fila-keyboard">
          <button
            className="key key-special"
            onClick={() => this.props.onClick("Enter")}
          >
            ENVIAR
          </button>
          {this.renderKey("Z")}
          {this.renderKey("X")}
          {this.renderKey("C")}
          {this.renderKey("V")}
          {this.renderKey("B")}
          {this.renderKey("N")}
          {this.renderKey("M")}
          <button
            onClick={() => this.props.onClick("Backspace")}
            className="key key-special"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-backspace"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#f5f5f5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
              <path d="M12 10l4 4m0 -4l-4 4" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

class Help extends React.Component {
  renderSquare(value, optionalClass) {
    if (optionalClass) {
      return (
        <button className={`square-help ${optionalClass}`}>{value}</button>
      );
    } else {
      return <button className="square-help">{value}</button>;
    }
  }

  render() {
    return (
      <div className="ayuda">
        <div className="ayuda-container">
          <h3 className="ayuda-titulo">
            Como Jugar
            <button className="ayuda-salir">
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
                onClick={() => this.props.displayHelp()}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </h3>
          <p className="ayuda-descripcion">
            Adivina la palabra oculta en seis intentos.
          </p>
          <p className="ayuda-descripcion">
            Cada intento debe ser una palabra válida de 5 letras.
          </p>
          <p className="ayuda-descripcion">
            Después de cada intento el color de las letras cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </p>
          <p className="ayuda-subtitulo">Ejemplos</p>
          <div className="fila-help">
            {this.renderSquare("G", "correcto")}
            {this.renderSquare("A")}
            {this.renderSquare("T")}
            {this.renderSquare("O")}
            {this.renderSquare("S")}
          </div>
          <p className="grid-ayuda">
            La letra <b>G</b> está en la palabra y en la posición correcta.
          </p>
          <div className="fila-help">
            {this.renderSquare("V")}
            {this.renderSquare("O")}
            {this.renderSquare("C", "presente")}
            {this.renderSquare("A")}
            {this.renderSquare("L")}
          </div>
          <p className="grid-ayuda">
            La letra <b>C</b> está en la palabra pero en la posición incorrecta.
          </p>
          <div className="fila-help">
            {this.renderSquare("C")}
            {this.renderSquare("A")}
            {this.renderSquare("N")}
            {this.renderSquare("T")}
            {this.renderSquare("O", "incorrecto")}
          </div>
          <p className="grid-ayuda">
            La letra <b>O</b> no está en la palabra.
          </p>
          <p className="ayuda-descripcion">
            Puede haber letras repetidas. Las pistas son independientes para
            cada letra.
          </p>

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
      </div>
    );
  }
}

class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <div className="settings-container">
          <h3 className="settings-titulo">
            Ajustes
            <button className="ayuda-salir">
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
                onClick={() => this.props.displaySettings()}
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
                <p className="settings-opcion__texto">Modo Oscuro</p>
              </div>
              <div>
                <div className="onoffswitch">
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id="myonoffswitch"
                    tabIndex={0}
                    checked={this.props.state.modoOscuro}
                    onChange={() => this.props.cambiarModoOscuro()}
                  />
                  <label
                    className="onoffswitch-label"
                    htmlFor="myonoffswitch"
                  ></label>
                </div>
              </div>
            </div>
            <div className="settings-opcion">
              <div>
                <p className="settings-opcion__texto">Modo Dificil</p>
                <p className="settings-opcion__subtexto">
                  Mas palabras pero sin ser verificadas. Yo te avise.
                </p>
              </div>
              <div>
                <div className="onoffswitch">
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id="myonoffswitch-1"
                    tabIndex={1}
                    checked={this.props.state.dificil}
                    onChange={() => this.props.cambiarModoDificil()}
                  />
                  <label
                    className="onoffswitch-label"
                    htmlFor="myonoffswitch-1"
                    tabIndex={1}
                  ></label>
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
                    tabIndex={2}
                    checked={this.props.state.modoDaltonicos}
                    onChange={() => this.props.cambiarModoDaltonico()}
                  />
                  <label
                    className="onoffswitch-label"
                    htmlFor="myonoffswitch-2"
                  ></label>
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
}

class Stats extends React.Component {
  renderDistribution(number) {
    const porcentaje = parseInt(
      (this.props.state.distribucion[number] * 100) / this.props.state.jugadas
    );
    const chart = document.getElementById(`d-${number}`);
    if (chart) {
      chart.style.width = `${porcentaje / 10}rem`;
    }

    return (
      <div className="stats-fila">
        <p className="stats-fila-numero">{number}:</p>
        <div className="stats-squares">
          <dd className="percentage" id={"d-" + number}></dd>({porcentaje}%)
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="stats">
        <div className="stats-container">
          <h3 className="stats-titulo">
            Estadisticas
            <button className="ayuda-salir">
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
                onClick={() => this.props.displayStats()}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </h3>
          <div className="stats-main">
            <div className="stats-stats">
              <div className="stats-jugadas">
                <p className="stats-numero">{this.props.state.jugadas}</p>
                <p className="stats-texto">Jugadas</p>
              </div>
              <div className="victorias">
                <p className="stats-numero">
                  {parseInt(
                    (this.props.state.victorias * 100) /
                      this.props.state.jugadas
                  )}
                  %
                </p>
                <p className="stats-texto">Victorias</p>
              </div>
            </div>

            <h3 className="stats-titulo">Distribucion</h3>
            <div className="stats-distribucion">
              <div className="stats-distribucion-center">
                {this.renderDistribution("1")}
                {this.renderDistribution("2")}
                {this.renderDistribution("3")}
                {this.renderDistribution("4")}
                {this.renderDistribution("5")}
                {this.renderDistribution("6")}
                {this.renderDistribution("X")}
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
}

class App extends React.Component {
  state = {
    position: 1,
    row: 1,
    dificil: false,
    modoOscuro: true,
    modoDaltonicos: false,
    dailyWord: this.encriptarPalabra(
      words[Math.floor(Math.random() * words.length)]
    ),
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
  };

  async componentDidMount() {
    const data = localStorage.getItem("state");
    if (data) {
      let parse = JSON.parse(data);
      await this.setState({
        dificil: parse.dificil,
        modoOscuro: parse.modoOscuro,
        modoDaltonicos: parse.modoDaltonicos,
        dailyWord: parse.dailyWord,
        distribucion: parse.distribucion,
      });
      await this.cargarSettings();
    }
  }

  async recuperarStats() {
    const data = localStorage.getItem("state");
    if (data) {
      const parse = JSON.parse(data);
      await this.setState({
        victorias: parse.victorias,
        distribucion: parse.distribucion,
        jugadas: parse.jugadas,
      });
    }
  }

  encriptarPalabra(palabra) {
    return CryptoJS.AES.encrypt(palabra, secretKey).toString();
  }

  desencriptarPalabra(encriptado) {
    return CryptoJS.AES.decrypt(encriptado, secretKey).toString(
      CryptoJS.enc.Utf8
    );
  }

  guardarEstado = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  movePosition(stepForward = true) {
    if (stepForward) {
      let nextPosition = this.state.position + 1;
      if (nextPosition <= this.state.row * 5) {
        this.setState({
          position: nextPosition,
        });
      }
    } else {
      let previousPosition = this.state.position - 1;
      if (previousPosition >= this.state.row * 5 - 4) {
        this.setState({
          position: previousPosition,
        });
      }
    }
  }

  /* Devuelve true si la palabra existe o false si no existe */
  checkWord() {
    let word = "";

    const square = document.querySelectorAll(".square");
    for (let i = this.state.row * 5 - 5; i < this.state.row * 5; i++) {
      word += square[i].textContent;
    }

    if (word.length !== 5) {
      toast.info("No hay suficientes letras", {
        position: "top-center",
        className: "toast",
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
    for (
      let i = 0;
      i < this.desencriptarPalabra(this.state.dailyWord).length;
      i++
    ) {
      cantidadRepetidos[this.desencriptarPalabra(this.state.dailyWord)[i]] = 0;
    }
    for (
      let i = 0;
      i < this.desencriptarPalabra(this.state.dailyWord).length;
      i++
    ) {
      cantidadRepetidos[this.desencriptarPalabra(this.state.dailyWord)[i]]++;
    }

    word = word.toLowerCase();

    if (!diccionario.includes(word)) {
      toast.info("La palabra no está en el diccionario", {
        position: "top-center",
        className: "toast",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
      });
      return false;
    } else {
      let delay = 0;
      for (let i = 0; i < 5; i++) {
        square[i + 5 * (this.state.row - 1)].style.animationDelay = `${delay}s`;
        square[
          i + 5 * (this.state.row - 1)
        ].style.transitionDelay = `${delay}s`;
        delay += 0.4;
        square[i + 5 * (this.state.row - 1)].classList.add("scale-up-center");

        if (word[i] === this.desencriptarPalabra(this.state.dailyWord)[i]) {
          square[i + 5 * (this.state.row - 1)].classList.add("correcto");
          document
            .getElementById(word[i].toUpperCase())
            .classList.add("correcto");
          cantidadRepetidos[word[i]]--;
        }
      }

      for (let i = 0; i < 5; i++) {
        if (
          this.desencriptarPalabra(this.state.dailyWord).includes(word[i]) &&
          cantidadRepetidos[word[i]] > 0
        ) {
          square[i + 5 * (this.state.row - 1)].classList.add("presente");
          document
            .getElementById(word[i].toUpperCase())
            .classList.add("presente");
          cantidadRepetidos[word[i]]--;
        } else {
          square[i + 5 * (this.state.row - 1)].classList.add("incorrecto");
          document
            .getElementById(word[i].toUpperCase())
            .classList.add("incorrecto");
        }
      }
    }

    if (word === this.desencriptarPalabra(this.state.dailyWord)) {
      toast.success("Felicitaciones, acertaste!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const nuevasJugadas = this.state.jugadas + 1;
      const nuevasVictorias = this.state.victorias + 1;
      const nuevaDistribucion = { ...this.state.distribucion };
      nuevaDistribucion[this.state.row] = nuevaDistribucion[this.state.row] + 1;
      this.setState({
        juegoFinalizado: true,
        jugadas: nuevasJugadas,
        victorias: nuevasVictorias,
        distribucion: nuevaDistribucion,
      });
    }
    return true;
  }

  moveRow() {
    if (this.state.position % 5 !== 0) {
      return;
    }

    let nextRow = this.state.row + 1;
    let nextPosition = this.state.position + 1;
    this.setState({
      row: nextRow,
      position: nextPosition,
    });
  }

  restartGame() {
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.remove("correcto");
      squares[i].classList.remove("presente");
      squares[i].classList.remove("incorrecto");
      squares[i].classList.remove("scale-up-center");
      squares[i].textContent = "";
    }
    const keys = document.getElementsByClassName("key");
    for (let i = 0; i < keys.length; i++) {
      keys[i].classList.remove("correcto");
      keys[i].classList.remove("presente");
      keys[i].classList.remove("incorrecto");
    }

    this.setState({
      row: 1,
      position: 1,
    });

    if (this.state.dificil) {
      this.setState({
        dailyWord: this.encriptarPalabra(
          diccionario[Math.floor(Math.random() * diccionario.length)]
        ),
      });
    } else {
      this.setState({
        dailyWord: this.encriptarPalabra(
          words[Math.floor(Math.random() * words.length)]
        ),
      });
    }

    this.setState({
      juegoFinalizado: false,
    });
  }

  async keyPress(e) {
    if (this.state.juegoFinalizado) {
      return;
    }
    let square =
      document.getElementsByClassName("square")[this.state.position - 1];
    if (e === "Backspace") {
      if (square.textContent === "") {
        await this.movePosition(false);
      }
      square =
        document.getElementsByClassName("square")[this.state.position - 1];
      square.textContent = "";
    } else if (e === "Enter") {
      const existe = this.checkWord();
      if (existe) {
        this.moveRow();
      }
    } else if (
      e.length === 1 &&
      square.textContent === "" &&
      /[a-zA-Z\u00f1\u00d1]/.test(e)
    ) {
      const span = document.createElement("span");
      span.textContent = e;
      square.appendChild(span);
      this.movePosition();
    }
    this.fallaste();
  }

  async fallaste() {
    if (this.state.juegoFinalizado) {
      return;
    }

    if (this.state.position === 31 && this.state.row === 7) {
      toast.error(
        "Fallaste, la palabra era " +
          this.desencriptarPalabra(this.state.dailyWord),
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      const nuevasJugadas = this.state.jugadas + 1;
      const nuevaDistribucion = { ...this.state.distribucion };
      nuevaDistribucion["X"] = nuevaDistribucion["X"] + 1;
      await this.setState({
        juegoFinalizado: true,
        jugadas: nuevasJugadas,
        distribucion: nuevaDistribucion,
      });
    }
  }

  displayMenu(menu) {
    const gameMain = document.querySelector(".game-main");
    gameMain.classList.toggle("hidden");

    const gameHelp = document.querySelector(menu);
    gameHelp.classList.toggle("hidden");
  }

  async cambiarModoDificil() {
    await this.setState({
      dificil: !this.state.dificil,
    });
    await this.restartGame();
  }

  async cambiarModoOscuro() {
    await this.setState({
      modoOscuro: !this.state.modoOscuro,
    });
    await this.cargarSettings();
  }

  async cambiarModoDaltonico() {
    await this.setState({
      modoDaltonicos: !this.state.modoDaltonicos,
    });
    await this.cargarSettings();
  }

  cargarSettings() {
    const style = document.documentElement.style;

    if (this.state.modoDaltonicos) {
      style.setProperty("--color-correcto", "#86c1f6");
      style.setProperty("--color-presente", "#f47842");
    } else {
      style.setProperty("--color-correcto", "#6ca969");
      style.setProperty("--color-presente", "#c9b360");
    }
    const backspaceIcon = document.querySelector(".icon-tabler-backspace");

    if (this.state.modoOscuro) {
      backspaceIcon.outerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-backspace" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f5f5f5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z"></path><path d="M12 10l4 4m0 -4l-4 4"></path></svg>';
      style.setProperty("--color-fondo", "#121213");
      style.setProperty("--color-texto", "#f5f5f5");
      style.setProperty("--color-tecla", "#818384");
      style.setProperty("--color-separador", "#404040");
      style.setProperty("--color-letras", "#ffffff");
      style.setProperty("--color-incorrecto", "#3a3a3c");
    } else {
      backspaceIcon.outerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-backspace" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z"></path><path d="M12 10l4 4m0 -4l-4 4"></path></svg>';
      style.setProperty("--color-fondo", "#ffffff");
      style.setProperty("--color-texto", "#111826");
      style.setProperty("--color-tecla", "#d3d6da");
      style.setProperty("--color-separador", "#d4d4d4");
      style.setProperty("--color-letras", "#000000");
      style.setProperty("--color-incorrecto", "#787c7e");
    }
  }

  render() {
    document.onkeydown = (e) => this.keyPress(e.key);
    return (
      <div className="game">
        <div className="game-main">
          <Header
            onClick={(i) => this.restartGame(i)}
            displayHelp={() => this.displayMenu(".game-help")}
            displaySettings={() => this.displayMenu(".game-settings")}
            displayStats={() => this.displayMenu(".game-stats")}
          />
          <Board
            position={this.state.position}
            keyPress={(e) => this.keyPress(e)}
            guardarEstado={() => this.guardarEstado()}
            recuperarStats={() => this.recuperarStats()}
          />
          <ToastContainer limit={3} />
          <Keyboard onClick={(i) => this.keyPress(i)} />
        </div>
        <div className="game-help hidden scale-up-center">
          <Help displayHelp={() => this.displayMenu(".game-help")} />
        </div>
        <div className="game-settings hidden scale-up-center">
          <Settings
            displaySettings={() => this.displayMenu(".game-settings")}
            cambiarModoDificil={() => this.cambiarModoDificil()}
            cambiarModoOscuro={() => this.cambiarModoOscuro()}
            cambiarModoDaltonico={() => this.cambiarModoDaltonico()}
            state={this.state}
          />
        </div>
        <div className="game-stats hidden scale-up-center">
          <Stats
            displayStats={() => this.displayMenu(".game-stats")}
            state={this.state}
          />
        </div>
      </div>
    );
  }
}

// ---------------------------------------------------

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
