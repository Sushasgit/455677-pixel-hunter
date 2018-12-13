import {render} from '../../../utils.js';
import Header from './gameHeader.js';

export default (lives) => {
  const header = new Header(lives);

  const mainElem = document.querySelector(`#main`);
  const headerTemplate = document.querySelector(`.header`);
  if (headerTemplate) {
    headerTemplate.remove();
  }

  mainElem.insertBefore(render(header.createTemplate()), mainElem.firstElementChild);

};
