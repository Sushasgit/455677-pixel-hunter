import AbstractView from '../../AbstractView.js';

export default class Header extends AbstractView {
  constructor(lives, time) {
    super();
    this.lives = lives;
    this.time = time;
  }

  get template() {
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
  onClick() {}
  // bind() {
  //   const buttonBack = this.element.querySelector(`button.back`);
  //   buttonBack.addEventListener(`click`, () => {
  //     this.onClick();
  //   });
  // }
}
