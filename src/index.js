import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

/* TO DO:
1- Boton para reiniciar el juego|
2- Alertas cuando se acierta y cuando no existe
3- Alerta cuando pone palabra menor a 5
4- Chequear palabra en rae? Scraping
5- Modo claro/oscuro
6- Settings de guardado local de preferencias
7- Menu de ayuda
8- Menu estadisticas
9- Modo dificil?
10- Compartir twitter y fb 
11- Arreglar palabras del dic con signo de pregunta
*/

const diccionario = require('./diccionario.json');
const words = require('./palabras_5.json');
words.forEach(word => diccionario.push(word));
var dailyWord = words[Math.floor(Math.random() * words.length)];
console.log(dailyWord);
var juegoFinalizado = false;

class Header extends React.Component{
  render(){
    return(
      <header className='header'>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-help" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#525252" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="17" x2="12" y2="17.01" />
            <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#424242" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => this.props.onClick()}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
          </div>
          <h1 className='titulo'>Wordle</h1>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-bar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#525252" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="3" y="12" width="6" height="8" rx="1" />
              <rect x="9" y="8" width="6" height="12" rx="1" />
              <rect x="15" y="4" width="6" height="16" rx="1" />
              <line x1="4" y1="20" x2="18" y2="20" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#525252" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </header>
    )
  }
}

class Board extends React.Component{

  renderSquare(i){
    return(
      <button className='square' value={i}></button>
    )
  }

  render(){
    return(
      <main className='board-flex'>
          <div className='board'>
            <div className='fila'>
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className='fila'>
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
              {this.renderSquare(9)}
              {this.renderSquare(10)}
            </div>
            <div className='fila'>
              {this.renderSquare(11)}
              {this.renderSquare(12)}
              {this.renderSquare(13)}
              {this.renderSquare(14)}
              {this.renderSquare(15)}
            </div>
            <div className='fila'>
              {this.renderSquare(16)}
              {this.renderSquare(17)}
              {this.renderSquare(18)}
              {this.renderSquare(19)}
              {this.renderSquare(20)}
            </div>
            <div className='fila'>
              {this.renderSquare(21)}
              {this.renderSquare(22)}
              {this.renderSquare(23)}
              {this.renderSquare(24)}
              {this.renderSquare(25)}
            </div>
            <div className='fila'>
              {this.renderSquare(26)}
              {this.renderSquare(27)}
              {this.renderSquare(28)}
              {this.renderSquare(29)}
              {this.renderSquare(30)}
            </div>
          </div>
        </main>
    )
  }
}

class Keyboard extends React.Component {
  renderKey(i){
    return(
      <button className='key' id={i} onClick={() => this.props.onClick(i)}>{i}</button>
    )
  }

  render(){
    return(
      <div className='keyboard'>
        <div className='fila-keyboard'>
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
        <div className='fila-keyboard'>
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
        <div className='fila-keyboard'>
          <button className='key key-special' onClick={() => this.props.onClick('Enter')}>ENVIAR</button>
          {this.renderKey("Z")}
          {this.renderKey("X")}
          {this.renderKey("C")}
          {this.renderKey("V")}
          {this.renderKey("B")}
          {this.renderKey("N")}
          {this.renderKey("M")}
          <button onClick={() => this.props.onClick('Backspace')} className='key key-special'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-backspace" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f5f5f5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
              <path d="M12 10l4 4m0 -4l-4 4" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    position: 1,
    row: 1,
  }

  movePosition(stepForward=true){
    if(stepForward){
      let nextPosition = this.state.position+1;
      if(nextPosition <= this.state.row*5){
        this.setState({
          position: nextPosition,
        })
      }
    }else{
      let previousPosition = this.state.position-1;
      if(previousPosition >= this.state.row * 5 - 4){
        this.setState({
          position: previousPosition,
        })
      }
    }
  }

  /* Devuelve true si la palabra existe o false si no existe */
  checkWord(){
    let word = "";

    const square = document.querySelectorAll(".square");
    for(let i = this.state.row * 5 - 5; i < this.state.row * 5; i++){
      word += square[i].textContent;
    }

    if(word.length !== 5){
      toast.info('No hay suficientes letras', {
        position: "top-center",
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
    for(let i = 0; i < dailyWord.length; i++){
      cantidadRepetidos[dailyWord[i]] = 0;
    }
    for(let i = 0; i < dailyWord.length; i++){
      cantidadRepetidos[dailyWord[i]]++;
    }

    word = word.toLowerCase();
    if(!diccionario.includes(word)){
      toast.info('La palabra no está en el diccionario', {
        position: "top-center",
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
    }else{
      for(let i = 0; i < 5; i++){
        if(word[i] === dailyWord[i]){
          square[i + (5* (this.state.row -1))].classList.add("correcto");
          document.getElementById(word[i].toUpperCase()).classList.add("correcto");
          cantidadRepetidos[word[i]]--;
        }
      }

      for(let i = 0; i < 5; i++){
        if(dailyWord.includes(word[i]) && (cantidadRepetidos[word[i]] > 0)){
          square[i + (5* (this.state.row -1))].classList.add("presente");
          document.getElementById(word[i].toUpperCase()).classList.add("presente");
        }else{
          square[i + (5* (this.state.row -1))].classList.add("incorrecto");
          document.getElementById(word[i].toUpperCase()).classList.add("incorrecto");
        }
      }
    }

    if(word === dailyWord){
      toast.success('Felicitaciones, acertaste!!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      juegoFinalizado = true;
    }
    return true;
  }

  moveRow(){
    if(this.state.position % 5 !== 0){
      return;
    }

    let nextRow = this.state.row+1;
    let nextPosition = this.state.position+1;
    this.setState({
      row: nextRow,
      position: nextPosition,
    })
  }

  restartGame(){
    dailyWord = words[Math.floor(Math.random() * words.length)];
    console.log(dailyWord);
    const squares = document.getElementsByClassName("square");
    for(let i = 0; i < squares.length; i++){
      squares[i].classList.remove("correcto");
      squares[i].classList.remove("presente");
      squares[i].classList.remove("incorrecto");
      squares[i].textContent = "";
    }
    const keys = document.getElementsByClassName("key");
    for(let i = 0; i < keys.length; i++){
      keys[i].classList.remove("correcto");
      keys[i].classList.remove("presente");
      keys[i].classList.remove("incorrecto");
    }

    this.setState({
      row: 1,
      position: 1,
    })

    juegoFinalizado = false;
  }

  async keyPress(e){
    if(juegoFinalizado){
      return;
    }
    let square = document.getElementsByClassName("square")[this.state.position-1];
    if(e === "Backspace"){
      if(square.textContent === ""){
        await this.movePosition(false);
      }
      square = document.getElementsByClassName("square")[this.state.position-1];
      square.textContent = ""
    }else if(e === "Enter"){
      const existe = this.checkWord();
      if(existe){
        this.moveRow();
      }
    }else if(e.length === 1 && square.textContent === "" && /[a-zA-Z\u00f1\u00d1]/.test(e)){
      const span = document.createElement("span");
      span.textContent = e;
      square.appendChild(span);
      this.movePosition();
    }
  }

  fallaste(){
    if(juegoFinalizado){
      return;
    }

    if(this.state.position === 31 && this.state.row === 7){
      toast.error('Fallaste, la palabra era ' + dailyWord, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        juegoFinalizado = true;
    }
  }

  render(){
    document.onkeydown = (e) => this.keyPress(e.key);
    this.fallaste();
    console.log(this.state.position);
    console.log(this.state.row);
    return(
      <div className='game'>
        <Header onClick={i => this.restartGame(i)}/>
        <Board position={this.state.position}/>
        <ToastContainer limit={3}/>
        <Keyboard onClick={i => this.keyPress(i)}/>
      </div>
    )
  }
}

// ---------------------------------------------------

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
