import {render} from '../../../utils';
import {updateGame} from '../main-game-screen.js';
import listStats from '../game-indicators';
// import {AnswerType} from '../../../constants.js';

export const gameThreeImages = (data, game) => {
  const {answers} = data;
  const template = `
  <section class="game">
  <p class="game__task">${data.question}</p>
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
  ${listStats(game)}
  </section>`;
  const element = render(template);

  const gameThreeImage = element.querySelectorAll(`.game__threeImage`);

  gameThreeImage.forEach((radio) => {
    radio.addEventListener(`click`, () => {
      updateGame(game, radio);
    }, false);
  });

  return element;
};


export default gameThreeImages;
