import {render, changeScreen} from '../utils';

import firstGameScreen from './game-screen-1.js';
import greetingScreen from './greeting.js';
import header from './header';

const rules = render(`
    ${header()}
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
    </section>`);

const playBtn = rules.querySelector(`.rules__button`);
const inputName = rules.querySelector(`.rules__input`);
const ruleForm = rules.querySelector(`.rules__form`);
const goBackBtn = rules.querySelector(`.back`);

inputName.addEventListener(`keyup`, () =>{
  playBtn.disabled = !inputName.value;
});

const onSubmit = () => {
  changeScreen(firstGameScreen);
};

ruleForm.addEventListener(`submit`, onSubmit);

goBackBtn.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default rules;
