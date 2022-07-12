export default function displayMenu(menu) {
  const gameMain = document.querySelector('.game-main');
  gameMain.classList.toggle('hidden');

  const gameMenu = document.querySelector(menu);
  gameMenu.classList.toggle('hidden');
}
