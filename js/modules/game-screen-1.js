import {render, changeScreen} from '../utils';

import secondGameScreen from './game-screen-2.js';
import greetingScreen from './greeting.js';
import header from './header.js';

const FIRST_QUESTION = `question1`;
const SECOND_QUESTION = `question2`;

const headerContent = `
  <div class="game__timer">NN</div>
  <div class="game__lives">
    <img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
  </div>
`;

const template = `
  ${header(headerContent)}
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>`;

const element = render(template);

const radiosButtons = element.querySelectorAll(`input[type="radio"]`);
const goBackBtn = element.querySelector(`.back`);

const answer = {};

radiosButtons.forEach((radio) => {
  radio.addEventListener(`change`, () => {
    saveAnswers(radio.name, radio.value);
  });
});

const saveAnswers = (answerGroup, question) => {
  answer[answerGroup] = question;
  if (answer.hasOwnProperty(FIRST_QUESTION) && answer.hasOwnProperty(SECOND_QUESTION)) {
    changeScreen(secondGameScreen);
  }
  return answer;
};

goBackBtn.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default element;
