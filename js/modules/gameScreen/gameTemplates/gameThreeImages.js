import {render} from '../../../utils';

import {changeLevel} from '../../../data/change-level.js';

const gameTwoImages = (question, nextQuestion, checkAnswer, game) => {
  const template = `
  <section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div data-type="paint" class="game__option game__threeImage">
      <img src=${question.firstImage}  alt="Option 1" width="304" height="455">
    </div>
    <div data-type="photo" class="game__option game__threeImage game__option--selected">
      <img src=${question.secondImage}  alt="Option 2" width="304" height="455">
    </div>
    <div data-type="photo" class="game__option game__threeImage">
      <img src=${question.thirdImage} alt="Option 3" width="304" height="455">
    </div>
  </form>
</section>`;

  const element = render(template);
  const gameThreeImage = element.querySelectorAll(`.game__threeImage`);

  gameThreeImage.forEach((radio) => {
    radio.addEventListener(`click`, () => {
      checkAnswer(game.level, radio.getAttribute(`data-type`));
      if (game) {
        changeLevel(game, game.level++);
        nextQuestion(game.level);
      }
    });
  });
  return element;
};

export default gameTwoImages;
