import MainGameScreen from '../pages/mainGame.js';
import listStats from './game-indicators';
import Header from './gameHeader.js';
import AbstractView from '../AbstractView.js';
import {AnswerType, QuestionNums} from '../constants.js';
import Counter from '../data/count-time.js';

export default class GameTwoImages extends AbstractView {
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
      <form class="game__content">
        <div class="game__option game__twoImage">
          <img src=${answers[0].image.url} alt="Option 1" width=${answers[0].image.width} height=${answers[0].image.height}>
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
          <img src=${answers[1].image.url} alt="Option 2" width=${answers[0].image.width} height=${answers[1].image.height}>
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
    const timer = new Counter(30, undefined, this.game);
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
        return new MainGameScreen(this.game).updateGame(undefined, answersTwoImages, timer.getAnswerTime(timer.currentTimer));
      }
      return null;
    };
  }
}
