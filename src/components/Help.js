export default function Help({ displayHelp }) {
  function renderSquare(value, optionalClass) {
    if (optionalClass) {
      return <button type="button" className={`square-help ${optionalClass}`}>{value}</button>;
    }
    return (
      <button className="square-help" type="button">{value}</button>
    );
  }

  return (
    <div className="ayuda">
      <div className="ayuda-container">
        <h3 className="ayuda-titulo">
          Como Jugar
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
              onClick={() => displayHelp()}
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
          {renderSquare('G', 'correcto')}
          {renderSquare('A')}
          {renderSquare('T')}
          {renderSquare('O')}
          {renderSquare('S')}
        </div>
        <p className="grid-ayuda">
          La letra
          <b>G</b>
          está en la palabra y en la posición correcta.
        </p>
        <div className="fila-help">
          {renderSquare('V')}
          {renderSquare('O')}
          {renderSquare('C', 'presente')}
          {renderSquare('A')}
          {renderSquare('L')}
        </div>
        <p className="grid-ayuda">
          La letra
          <b>C</b>
          está en la palabra pero en la posición incorrecta.
        </p>
        <div className="fila-help">
          {renderSquare('C')}
          {renderSquare('A')}
          {renderSquare('N')}
          {renderSquare('T')}
          {renderSquare('O', 'incorrecto')}
        </div>
        <p className="grid-ayuda">
          La letra
          <b>O</b>
          no está en la palabra.
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
