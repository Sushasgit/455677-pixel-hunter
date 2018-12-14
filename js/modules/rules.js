import {render, changeScreen} from '../utils';
import header from './gameScreen/header-game/header.js';
import firstGameScreen from './gameScreen/main-game-screen.js';
import {INITIAL_GAME} from '../constants';

const rules = () => {
  const template = `
    <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
            <li>Угадай 10 раз для каждого изображения фото
                <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
                <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
            <li>Фотографиями или рисунками могут быть оба изображения.</li>
            <li>На каждую попытку отводится 30 секунд.</li>
            <li>Ошибиться можно не более 3 раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
            <input class="rules__input" type="text" placeholder="Ваше Имя">
            <button class="rules__button  continue" type="submit" disabled>
                Go!
            </button>
        </form>
    </section>`;

  const element = render(template);

  const playBtn = element.querySelector(`.rules__button`);
  const inputName = element.querySelector(`.rules__input`);
  const ruleForm = element.querySelector(`.rules__form`);

  inputName.addEventListener(`keyup`, () =>{
    playBtn.disabled = !inputName.value;
  });

  const onSubmit = () => {
    changeScreen(firstGameScreen);
    header(INITIAL_GAME.lives);
  };

  ruleForm.addEventListener(`submit`, onSubmit);
  return element;
};

export default rules;
