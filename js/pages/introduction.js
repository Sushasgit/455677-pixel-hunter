import IntroView from '../views/introduction-view.js';
import App from '../App.js';

export default class IntroPage {
  constructor() {
    this.introPage = new IntroView();
    this.introPage.onClickNext = () => {
      App.showGreetingPage();
    };
    return this.introPage.element;
  }
}
