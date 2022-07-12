/* eslint-disable react/prop-types */
export default function Keyboard({ keypress }) {
  function renderKey(i) {
    return <button className="key" id={i} onClick={() => keypress(i)} type="button">{i}</button>;
  }

  return (
    <div className="keyboard">
      <div className="fila-keyboard">
        {renderKey('Q')}
        {renderKey('W')}
        {renderKey('E')}
        {renderKey('R')}
        {renderKey('T')}
        {renderKey('Y')}
        {renderKey('U')}
        {renderKey('I')}
        {renderKey('O')}
        {renderKey('P')}
      </div>
      <div className="fila-keyboard">
        {renderKey('A')}
        {renderKey('S')}
        {renderKey('D')}
        {renderKey('F')}
        {renderKey('G')}
        {renderKey('H')}
        {renderKey('J')}
        {renderKey('K')}
        {renderKey('L')}
        {renderKey('Ñ')}
      </div>
      <div className="fila-keyboard">
        <button
          className="key key-special enter"
          onClick={() => {
            keypress('Enter');
          }}
          type="button"
        >
          ENVIAR
        </button>
        {renderKey('Z')}
        {renderKey('X')}
        {renderKey('C')}
        {renderKey('V')}
        {renderKey('B')}
        {renderKey('N')}
        {renderKey('M')}
        <button
          onClick={() => keypress('Backspace')}
          className="key key-special"
          type="button"
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
