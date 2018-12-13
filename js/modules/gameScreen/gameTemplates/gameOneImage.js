import {render} from '../../../utils';
import {updateGame} from '../main-game-screen.js';
import listStats from '../game-indicators';
import {FIRST_QUESTION} from '../../../constants.js';

export const gameOneImage = (data, game) => {
  const {answers} = data;
  const template = ` <section class="game">
    <p class="game__task">${data.question}</p>
    <form class="game__content  game__content--wide">
        <div class="game__option game__oneImage">
        <img src=${answers[0].image.url} alt="Option 1" width=${answers[0].image.width} height=${answers[0].image.height}>
        <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name=${FIRST_QUESTION} type="radio" value=${answers[0].type}>
            <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name=${FIRST_QUESTION} type="radio" value=${answers[1]}>
            <span>Рисунок</span>
        </label>
        </div>
    </form>
    ${listStats(game)}
    </section>`;
  const element = render(template);

  const answerButtons = element.querySelectorAll(`.game__oneImage input`);

  answerButtons.forEach((radio) => {
    radio.addEventListener(`click`, () => {
      updateGame(game, radio);
    }, false);
  });
  return element;
};

export default gameOneImage;
