export interface Juego {
  position: number,
  row: number,
  dificil: boolean,
  modoOscuro: boolean,
  modoDaltonico: boolean,
  dailyWord: string,
  juegoFinalizado: boolean,
  jugadas: number,
  victorias: number,
  dailyMode: boolean,
  distribucion: Object<distribucion>,
  estadoActual: Array<string>
}

interface distribucion {
  1: number,
  2: number,
  3: number,
  4: number,
  5: number,
  6: number,
  X: number,
}