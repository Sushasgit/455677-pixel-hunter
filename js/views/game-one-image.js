import gameIndicators from './game-indicators';
import {QuestionNums, AnswerType} from '../constants.js';
import AbstractView from '../abstract-view.js';

export default class GameOneImage extends AbstractView {
  constructor(game, header) {
    super();
    this.game = game;
    this.header = header;
  }

  get template() {
    const currentQuestion = this.game.questions[this.game.level - 1];
    return `
    <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content  game__content--wide">
          <div class="game__option game__oneImage">
          <img src=${currentQuestion.answers[0].image.url} alt="Option 1" width=${currentQuestion.answers[0].image.width} height=${currentQuestion.answers[0].image.height}>
          <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name=${QuestionNums.FIRST} type="radio" value=${AnswerType.PHOTO}>
              <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name=${QuestionNums.FIRST} type="radio" value=${AnswerType.PAINTING}>
              <span>Рисунок</span>
          </label>
          </div>
      </form>
      ${gameIndicators(this.game)}
      </section>`;
  }

  bind() {
    this.element.insertBefore(this.header.element, this.element.firstElementChild);
    const answerButtons = this.element.querySelectorAll(`.game__oneImage input`);

    answerButtons.forEach((radio) => {
      radio.addEventListener(`click`, () => {
        this.onGetAnswers(radio, this.game.time);
      }, false);
    });
  }
}
