import AbstractView from "../AbstractView";
import App from '../App.js';
import {GameRules} from '../constants.js';

export default class Header extends AbstractView {
  constructor(lives, withTimer, gameStarted, interval) {
    super();
    this.lives = lives;
    this.withTimer = withTimer;
    this.gameStarted = gameStarted;
    this.interval = interval;
  }

  get template() {
    const lives = `
    <div class="game__lives">
      ${ this.lives >= 0 ? new Array(3 - this.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``) : ``}  
        ${this.lives > 0 ? new Array(this.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``) : ``}
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
          ${this.withTimer ? `<div class="game__timer"></div>` : ``}
          ${this.gameStarted ? `<div class="game__lives">${lives}</div` : ``}
        </header>`;
  }

  updateTime(time) {
    const timeContainer = this.element.querySelector(`.game__timer`);
    const timer = `00:${time}`;
    if (time <= GameRules.TIME_BLINK_COUNTER) {
      timeContainer.classList.add(`game__timer--blink`);
    } else {
      timeContainer.classList.remove(`game__timer--blink`);
    }
    timeContainer.textContent = timer;
  }

  updateInterval(interval) {
    this.interval = interval;
  }

  bind() {
    const buttonBack = this.element.querySelector(`button.back`);
    buttonBack.addEventListener(`click`, () => {
      if (this.gameStarted) {
        App.showConfirmModal(this.interval);
      } else {
        App.showGreetingPage();
      }
    });
  }
}
