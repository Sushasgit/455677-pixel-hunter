import StatsView from '../views/stats-view.js';

export default class StatisticsPage {
  constructor(game) {
    this._statsView = new StatsView(game);
    return this._statsView.element;
  }
}
