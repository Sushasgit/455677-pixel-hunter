import IntroductionView from '../views/introduction-view.js';
import App from '../app.js';

export default class IntroductionPage {
  constructor() {
    this.introPage = new IntroductionView();
    this.introPage.onClickNext = () => {
      App.showGreetingPage();
    };
    return this.introPage.element;
  }
}
