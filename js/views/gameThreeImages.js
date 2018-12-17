import MainGameScreen from '../pages/mainGame.js';
import listStats from './game-indicators';
import Header from './gameHeader.js';
import AbstractView from '../AbstractView.js';
import Counter from '../data/count-time.js';

export default class GameThreeImages extends AbstractView {
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
      <form class="game__content  game__content--triple">
        <div data-id="1" data-type=${answers[0].type} class="game__option game__threeImage">
          <img src=${answers[0].image.url}  alt="Option 1" width=${answers[0].image.width} height=${answers[0].image.height}>
        </div>
        <div data-id="2" data-type=${answers[1].type} class="game__option game__threeImage">
          <img src=${answers[1].image.url}  alt="Option 2" width=${answers[0].image.width} height=${answers[0].image.height}>
        </div>
        <div data-id="3" data-type=${answers[2].type} class="game__option game__threeImage">
          <img src=${answers[2].image.url} alt="Option 3" width=${answers[0].image.width} height=${answers[0].image.height}>
        </div>
      </form>
      ${listStats(this.game)}
      </section>`;
  }

  bind() {
    const timer = new Counter(30);

    this.element.insertBefore(new Header(this.game.lives, true, this.game.gameStarted).element, this.element.firstElementChild);

    const gameThreeImage = this.element.querySelectorAll(`.game__threeImage`);
    gameThreeImage.forEach((radio) => {
      radio.addEventListener(`click`, () => {
        return new MainGameScreen(this.game).updateGame(radio, undefined, timer.getAnswerTime(timer.currentTimer));
      }, false);
    });
  }
}
