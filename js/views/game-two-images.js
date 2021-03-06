import gameIndicators from './game-indicators';
import AbstractView from '../abstract-view.js';
import {AnswerType, QuestionNums} from '../constants.js';

export default class GameTwoImages extends AbstractView {
  constructor(game, header) {
    super();
    this._header = header;
    this._game = game;
  }

  get template() {
    const currentQuestion = this._game.questions[this._game.level - 1];
    return `
     <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content">
        <div class="game__option game__twoImage">
          <img src=${currentQuestion.answers[0].image.url} alt="Option 1" width=${currentQuestion.answers[0].image.width} height=${currentQuestion.answers[0].image.height}>
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name=${QuestionNums.FIRST} type="radio" value=${AnswerType.PHOTO}>
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name=${QuestionNums.FIRST} type="radio" value=${AnswerType.PAINTING}>
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option game__twoImage">
          <img src=${currentQuestion.answers[1].image.url} alt="Option 2" width=${currentQuestion.answers[1].image.width} height=${currentQuestion.answers[1].image.height}>
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name=${QuestionNums.SECOND} type="radio" value=${AnswerType.PHOTO}>
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name=${QuestionNums.SECOND} type="radio" value=${AnswerType.PAINTING}>
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      ${gameIndicators(this._game)}
    </section>`;
  }

  bind() {
    const radiosButtons = this.element.querySelectorAll(`.game__twoImage input`);

    this.element.insertBefore(this._header.element, this.element.firstElementChild);

    radiosButtons.forEach((radio) => {
      radio.addEventListener(`change`, () => {
        saveAnswers(radio.name, radio.value);
      });
    });

    const answer = {};

    const saveAnswers = (answerGroup, question) => {

      const answersTwoImages = [];
      answer[answerGroup] = question;
      if (answer.hasOwnProperty(QuestionNums.FIRST) && answer.hasOwnProperty(QuestionNums.SECOND)) {
        answersTwoImages.push(answer);
        this.onGetAnswers(answersTwoImages, this._game.time);
      }
    };
  }
}
