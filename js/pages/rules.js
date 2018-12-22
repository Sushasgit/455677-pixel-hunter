import RulesView from '../views/rules-view.js';
import App from '../App.js';

export default class RulesPage {
  constructor(game) {
    this.game = game;
    this.rulesPage = new RulesView();

    this.rulesPage.onSubmit = (name) => {
      App.startGamePage(name);
    };
    return this.rulesPage.element;
  }
}
