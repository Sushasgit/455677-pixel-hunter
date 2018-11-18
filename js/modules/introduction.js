import {render} from '../utils';
import {changeScreen} from '../utils.js';
import greetingScreen from './greeting.js';

const template = `
<div id="intro">
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button">
        <span class="visually-hidden">Продолжить</span>
        *
    </button>
    <p class="intro__motto">
        <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
    </p>
  </section>
</div>`;

const element = render(template);

const asteriskBtn = element.querySelector(`.intro__asterisk`);

asteriskBtn.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default element;
