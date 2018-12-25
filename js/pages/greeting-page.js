import GreetingView from '../views/greeting-view.js';
import App from '../app.js';

export default class GreetingPage {
  constructor() {
    this._greetingView = new GreetingView();
    this._greetingView.onClickNext = () => {
      App.showRulesPage();
    };
    return this._greetingView.element;
  }
}
