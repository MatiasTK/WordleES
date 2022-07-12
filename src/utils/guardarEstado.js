export default function guardarEstado(juego) {
  localStorage.setItem('juego', JSON.stringify(juego));
}
