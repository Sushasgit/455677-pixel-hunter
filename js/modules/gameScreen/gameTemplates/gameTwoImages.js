import {render} from '../../../utils';
import {changeLevel} from '../../../data/change-level.js';

const FIRST_QUESTION = `question1`;
const SECOND_QUESTION = `question2`;

const gameTwoImages = (questionTemplate, nextQuestion, checkAnswer, game) => {
  const template = ` <section class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option game__twoImage">
      <img src=${questionTemplate.firstImage.url} alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option game__twoImage">
      <img src=${questionTemplate.secondImage.url} alt="Option 2" width="468" height="458">
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
    let answers = [];
    answer[answerGroup] = question;
    if (answer.hasOwnProperty(FIRST_QUESTION) && answer.hasOwnProperty(SECOND_QUESTION)) {
      answers.push(answer);
      checkAnswer(game.level, answers);
      nextQuestion(game.level);
      changeLevel(game, game.level++);
    }
    return answers;
  };

  return element;
};

export default gameTwoImages;
