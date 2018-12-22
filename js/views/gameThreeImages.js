import listStats from './game-indicators';
import AbstractView from '../AbstractView.js';

export default class GameThreeImages extends AbstractView {
  constructor(game, header) {
    super();
    this.header = header;
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
    this.element.insertBefore(this.header.element, this.element.firstElementChild);

    const gameThreeImage = this.element.querySelectorAll(`.game__threeImage`);
    gameThreeImage.forEach((radio) => {
      radio.addEventListener(`click`, () => {
        this.onGetAnswers(radio);
      }, false);
    });
  }
  onGetAnswers() {}
}
