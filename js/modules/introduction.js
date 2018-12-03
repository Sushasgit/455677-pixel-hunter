import {render, changeScreen} from '../utils';
import greetingScreen from './greeting.js';

const introduction = render(`
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button">
        <span class="visually-hidden">Продолжить</span>
        *
    </button>
    <p class="intro__motto">
        <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
    </p>
  </section>`
);

const asteriskBtn = introduction.querySelector(`.intro__asterisk`);

asteriskBtn.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default introduction;


