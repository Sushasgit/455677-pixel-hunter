import {changeScreen} from '../../utils.js';
import Header from './gameHeader.js';
import greetingScreen from '../greeting.js';

export default (lives) => {
  const header = new Header(lives);

  // const mainElem = document.querySelector(`#main`);
  // const headerTemplate = document.querySelector(`.header`);
  header.onClick = () => {
    changeScreen(greetingScreen());
  };
  // if (headerTemplate) {
  //   headerTemplate.remove();
  // }

  // mainElem.insertBefore(render(header.createTemplate()), mainElem.firstElementChild);
  return header.element;
};
