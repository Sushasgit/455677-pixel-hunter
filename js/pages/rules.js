import RulesView from '../views/rules-view.js';
import Header from '../views/gameHeader.js';
import App from '../App.js';

export default class RulesPage {
  constructor() {
    this.header = new Header(0);
    this.rulesPage = new RulesView();
    this.rulesPage.startGame = () => {
      App.startGamePage();
    };
    this.rulesPage.element.insertBefore(this.header.element, this.rulesPage.element.firstElementChild);
    return this.rulesPage.element;
  }
}
