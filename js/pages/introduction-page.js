import IntroductionView from '../views/introduction-view.js';
import App from '../app.js';

export default class IntroductionPage {
  constructor() {
    this._introView = new IntroductionView();
    this._introView.onClickNext = () => {
      App.showGreetingPage();
    };
    return this._introView.element;
  }
}
