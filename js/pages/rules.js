import RulesView from '../views/rules-view.js';
import App from '../App.js';

export default class RulesPage {
  constructor() {
    this.rulesPage = new RulesView();
    this.rulesPage.startGame = () => {
      App.startGamePage();
    };
    return this.rulesPage.element;
  }
}
