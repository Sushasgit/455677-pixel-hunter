export default class Header {
  constructor(lives, time) {
    this.lives = lives;
    this.time = time;
  }

  createTemplate() {
    const lives = `<div class="game__lives">
          ${new Array(3 - this.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``)}    
          ${new Array(this.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
         </div>`;

    return `<header class="header">
          <button class="back">
            <span class="visually-hidden">Вернуться к началу</span>
            <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
              <use xlink:href="img/sprite.svg#arrow-left"></use>
            </svg>
            <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
              <use xlink:href="img/sprite.svg#logo-small"></use>
            </svg>
          </button>
          ${lives}
        </header>`;
  }
}
