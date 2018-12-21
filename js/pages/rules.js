import RulesView from '../views/rules-view.js';
import App from '../App.js';

export default class RulesPage {
  constructor(game) {
    this.game = game;
    this.rulesPage = new RulesView(this.game);

    this.rulesPage.handleSubmit = (name) => {
      this.game.name = name;
      App.startGamePage(this.game);
    };
    return this.rulesPage.element;
  }
}
