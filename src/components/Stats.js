/* eslint-disable react/prop-types */
export default function Stats({ displayStats, juego }) {
  function renderDistribution(number) {
    const porcentaje = parseInt((juego.distribucion[number] * 100) / juego.jugadas, 10);
    const chart = document.getElementById(`d-${number}`);
    if (chart) {
      chart.style.width = `${porcentaje / 10}rem`;
    }

    return (
      <div className="stats-fila">
        <p className="stats-fila-numero">
          {number}
          :
        </p>
        <div className="stats-squares">
          <dd className="percentage" id={`d-${number}`}>
            (
            {porcentaje}
            %)
          </dd>
        </div>
      </div>
    );
  }

  return (
    <div className="stats">
      <div className="stats-container">
        <h3 className="stats-titulo">
          Estadisticas
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
              onClick={() => displayStats()}
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
              <p className="stats-numero">{juego.jugadas}</p>
              <p className="stats-texto">Jugadas</p>
            </div>
            <div className="victorias">
              <p className="stats-numero">
                {parseInt((juego.victorias * 100) / juego.jugadas, 10)}
                %
              </p>
              <p className="stats-texto">Victorias</p>
            </div>
          </div>

          <h3 className="stats-titulo">Distribucion</h3>
          <div className="stats-distribucion">
            <div className="stats-distribucion-center">
              {renderDistribution('1')}
              {renderDistribution('2')}
              {renderDistribution('3')}
              {renderDistribution('4')}
              {renderDistribution('5')}
              {renderDistribution('6')}
              {renderDistribution('X')}
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
