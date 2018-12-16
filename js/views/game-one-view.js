import MainGameScreen from '../pages/mainGame.js';
import listStats from './game-indicators';
import {QuestionNums, AnswerType} from '../constants.js';
import AbstractView from '../AbstractView.js';
import Counter from '../data/count-time.js';
import Header from './gameHeader.js';

export default class GameOneImage extends AbstractView {
  constructor(data, game) {
    super();
    this.data = data;
    this.game = game;
  }

  get template() {
    const {answers} = this.data;
    return `
    <section class="game">
      <p class="game__task">${this.data.question}</p>
      <form class="game__content  game__content--wide">
          <div class="game__option game__oneImage">
          <img src=${answers[0].image.url} alt="Option 1" width=${answers[0].image.width} height=${answers[0].image.height}>
          <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name=${QuestionNums.FIRST_QUESTION} type="radio" value=${AnswerType.PHOTO}>
              <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name=${QuestionNums.FIRST_QUESTION} type="radio" value=${AnswerType.PAINTING}>
              <span>Рисунок</span>
          </label>
          </div>
      </form>
      ${listStats(this.game)}
      </section>`;
  }

  bind() {
    const Test = this.element.querySelector(`.game__timer`);
    const timer = new Counter(30, Test);
    timer.startCount();
    this.element.insertBefore(new Header(this.game.lives, true, this.game.gameStarted).element, this.element.firstElementChild);
    const answerButtons = this.element.querySelectorAll(`.game__oneImage input`);
    answerButtons.forEach((radio) => {
      radio.addEventListener(`click`, () => {
        return new MainGameScreen(this.game).updateGame(radio, undefined, timer.getAnswerTime(timer.currentTimer));
      }, false);
    });
  }
}
