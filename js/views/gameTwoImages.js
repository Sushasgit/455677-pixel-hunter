import MainGameScreen from '../pages/mainGame.js';
import listStats from './game-indicators';
import Header from './gameHeader.js';
import AbstractView from '../AbstractView.js';
import {AnswerType, QuestionNums} from '../constants.js';
import Counter from '../data/count-time.js';

export default class GameTwoImages extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const currentQuestion = this.game.questions[this.game.level - 1];
    return `
     <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content">
        <div class="game__option game__twoImage">
          <img src=${currentQuestion.answers[0].image.url} alt="Option 1" width=${currentQuestion.answers[0].image.width} height=${currentQuestion.answers[0].image.height}>
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name=${QuestionNums.FIRST} type="radio" value=${AnswerType.PAINTING}>
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name=${QuestionNums.FIRST} type="radio" value=${AnswerType.PHOTO}>
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option game__twoImage">
          <img src=${currentQuestion.answers[1].image.url} alt="Option 2" width=${currentQuestion.answers[1].image.width} height=${currentQuestion.answers[1].image.height}>
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name=${QuestionNums.SECOND} type="radio" value=${AnswerType.PAINTING}>
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name=${QuestionNums.SECOND} type="radio" value=${AnswerType.PHOTO}>
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      ${listStats(this.game)}
    </section>`;
  }

  bind() {
    const radiosButtons = this.element.querySelectorAll(`.game__twoImage input`);
    const {lives, gameStarted} = this.game;
    const header = new Header(lives, true, gameStarted);
    this.element.insertBefore(header.element, this.element.firstElementChild);

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
        this.onGetAnswers(answersTwoImages, this.game.time);
      }
      return null;
    };
  }
  onGetAnswers() {}
}
