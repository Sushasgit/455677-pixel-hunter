import StatsView from '../views/stats-view.js';

export default class StatisticsPage {
  constructor(game) {
    this.statsPage = new StatsView(game);
    return this.statsPage.element;
  }
}
