import {render} from '../../../utils';
import {updateGame} from '../main-game-screen.js';
import listStats from '../game-indicators';
import {FIRST_QUESTION, SECOND_QUESTION} from '../../../constants.js';

export const gameTwoImages = (data, game) => {
  const {answers} = data;
  const template = ` <section class="game">
  <p class="game__task">${data.question}</p>
  <form class="game__content">
    <div class="game__option game__twoImage">
      <img src=${answers[0].image.url} alt="Option 1" width=${answers[0].image.width} height=${answers[0].image.height}>
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name=${FIRST_QUESTION} type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name=${FIRST_QUESTION} type="radio" value=${answers[0].type}>
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option game__twoImage">
      <img src=${answers[1].image.url} alt="Option 2" width=${answers[0].image.width} height=${answers[0].image.height}>
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name=${SECOND_QUESTION} type="radio" value=${answers[0].type}>
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name=${SECOND_QUESTION} type="radio" value=${answers[1].type}>
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  ${listStats(game)}
  </section>`;
  const element = render(template);

  const radiosButtons = element.querySelectorAll(`.game__twoImage input`);

  radiosButtons.forEach((radio) => {
    radio.addEventListener(`change`, () => {
      saveAnswers(radio.name, radio.value);
    });
  });
  const answer = {};

  const saveAnswers = (answerGroup, question) => {
    const answersTwoImages = [];
    answer[answerGroup] = question;
    if (answer.hasOwnProperty(FIRST_QUESTION) && answer.hasOwnProperty(SECOND_QUESTION)) {
      answersTwoImages.push(answer);
      updateGame(game, undefined, answersTwoImages);
    }
  };
  return element;
};

export default gameTwoImages;
