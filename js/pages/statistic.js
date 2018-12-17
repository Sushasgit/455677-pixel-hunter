import StatsView from '../views/stats-view.js';
import Header from '../views/gameHeader.js';

export default class StatsPage {
  constructor(game) {
    this.header = new Header(game.lives);
    this.statsPage = new StatsView(game);

    this.statsPage.element.insertBefore(this.header.element, this.statsPage.element.firstElementChild);
    return this.statsPage.element;
  }
}
