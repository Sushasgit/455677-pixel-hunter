import {render, changeScreen} from '../utils';
import greetingScreen from './greeting.js';

const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button">
        <span class="visually-hidden">Продолжить</span>
        *
    </button>
    <p class="intro__motto">
        <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
    </p>
  </section>`;

const element = render(template);

const asteriskBtn = element.querySelector(`.intro__asterisk`);

asteriskBtn.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default element;
