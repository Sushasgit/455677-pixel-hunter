import RulesView from '../views/rules-view.js';
import App from '../app.js';

export default class RulesPage {
  constructor(game) {
    this._game = game;
    this._rulesView = new RulesView();

    this._rulesView.onSubmit = (name) => {
      App.startGamePage(name);
    };
    return this._rulesView.element;
  }
}
