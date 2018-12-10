import {render} from '../../../utils.js';
import Header from './gameHeader.js';

export default (data) => {
  const header = new Header(data);

  const mainElem = document.querySelector(`#main`);
  const headerTemplate = document.querySelector(`.header`);

  if (headerTemplate) {
    headerTemplate.remove();
  }
  mainElem.insertBefore(render(header.createTemplate()), mainElem.firstElementChild);

};
