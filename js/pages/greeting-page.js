import GreetingView from '../views/greeting-view.js';
import App from '../app.js';

export default class GreetingPage {
  constructor() {
    this.greetingPage = new GreetingView();
    this.greetingPage.onClickNext = () => {
      App.showRulesPage();
    };
    return this.greetingPage.element;
  }
}
