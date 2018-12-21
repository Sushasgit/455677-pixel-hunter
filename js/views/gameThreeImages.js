import MainGameScreen from '../pages/mainGame.js';
import listStats from './game-indicators';
import Header from './gameHeader.js';
import AbstractView from '../AbstractView.js';
import Counter from '../data/count-time.js';

export default class GameThreeImages extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const currentQuestion = this.game.questions[this.game.level - 1];
    return `
      <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content  game__content--triple">
        <div data-id="1" data-type=${currentQuestion.answers[0].type} class="game__option game__threeImage">
          <img src=${currentQuestion.answers[0].image.url}  alt="Option 1" width=${currentQuestion.answers[0].image.width} height=${currentQuestion.answers[0].image.height}>
        </div>
        <div data-id="2" data-type=${currentQuestion.answers[1].type} class="game__option game__threeImage">
          <img src=${currentQuestion.answers[1].image.url}  alt="Option 2" width=${currentQuestion.answers[0].image.width} height=${currentQuestion.answers[0].image.height}>
        </div>
        <div data-id="3" data-type=${currentQuestion.answers[2].type} class="game__option game__threeImage">
          <img src=${currentQuestion.answers[2].image.url} alt="Option 3" width=${currentQuestion.answers[0].image.width} height=${currentQuestion.answers[0].image.height}>
        </div>
      </form>
      ${listStats(this.game)}
      </section>`;
  }

  bind() {
    const {lives, gameStarted} = this.game;
    const header = new Header(lives, true, gameStarted);

    this.element.insertBefore(header.element, this.element.firstElementChild);

    const gameThreeImage = this.element.querySelectorAll(`.game__threeImage`);
    gameThreeImage.forEach((radio) => {
      radio.addEventListener(`click`, () => {
        this.onGetAnswers(radio, this.game.time);
      }, false);
    });
  }
  onGetAnswers() {}
}
