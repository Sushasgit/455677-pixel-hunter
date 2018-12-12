import {render} from '../../../utils';
import {updateGame} from '../main-game-screen.js';

export const gameOneImage = (data, game) => {
  const template = `
    <p class="game__task">${data.question}</p>
    <form class="game__content  game__content--wide">
        <div class="game__option game__oneImage">
        <img src=${data.answers[0].image.url} alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="painting">
            <span>Рисунок</span>
        </label>
        </div>
    </form>`;
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
