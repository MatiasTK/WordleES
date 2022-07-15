import { Juego } from "../types/types";

export default function guardarEstado(juego: Juego) {
  localStorage.setItem('juego', JSON.stringify(juego));
}
