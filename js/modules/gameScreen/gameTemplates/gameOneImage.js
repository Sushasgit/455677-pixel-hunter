import {render} from '../../../utils';
import {changeLevel} from '../../../data/change-level.js';


const template = (data) => ` <section class="game">
<p class="game__task">Угадай, фото или рисунок?</p>
<form class="game__content  game__content--wide">
    <div class="game__option game__oneImage">
    <img src=${data.image} alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
    </label>
    </div>
</form>
</section>`;

const gameOneImage = (data, nextQuestion, checkAnswer, game) => {
  const element = render(template(data));
  const answerButtons = element.querySelectorAll(`.game__oneImage input`);

  answerButtons.forEach((radio) => {
    radio.addEventListener(`click`, () => {
      nextQuestion(game.level);
      checkAnswer(game.level, radio.value);
      if (game) {
        changeLevel(game, game.level++);
      }
    });
  });
  return element;
};

export default gameOneImage;
