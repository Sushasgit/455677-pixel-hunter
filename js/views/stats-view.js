import {countPoints} from '../data/count-points.js';
import gameIndicators from './game-indicators.js';
import {Answer, GameBonuses} from '../constants.js';
import AbstractView from '../abstract-view';
import GameHeader from './game-header.js';

export default class StatsView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return this._data.map((game, index) => {
      const result = countPoints(game.answers, game.lives);
      const answers = result.countAnswers.FAST + result.countAnswers.NORMAL + result.countAnswers.SLOW;
      const failedTemplate = `
      <section class="result">
      <h2 class="result__title">${game.failed ? `Fail` : `Победа!`}</h2>
      <table class="result__table">
      <tr>
        <td class="result__number">${index + 1}</td>
        <td colspan="2">
          ${gameIndicators(game)}
        </td>
        <td class="result__points">× ${Answer.NORMAL.points}</td>
        <td class="result__total">Fail</td>
      </tr>
    </table>
    </section>
    `;
      const winTemplate = `
      <section class="result">
      <h2 class="result__title">${game.failed ? `Fail` : `Победа!`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">${index + 1}</td>
          <td colspan="2">
            ${gameIndicators(game)}
          </td>
          <td class="result__points">× ${Answer.NORMAL.points}</td>
          <td class="result__total">${answers * Answer.NORMAL.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${result.countAnswers.FAST} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× ${GameBonuses.FAST_ANSWER_BONUS}</td>
          <td class="result__total">${result.countAnswers.FAST * GameBonuses.FAST_ANSWER_BONUS}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${game.lives} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×${GameBonuses.REMAINING_LIFE_SCORE} </td>
          <td class="result__total">${game.lives * GameBonuses.REMAINING_LIFE_SCORE}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${result.countAnswers.SLOW} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× ${GameBonuses.SLOW_ANSWER_FINE}</td>
          <td class="result__total">${result.countAnswers.SLOW * GameBonuses.SLOW_ANSWER_FINE}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${result.gameResult}</td>
        </tr>
      </table>
    </section>`;
      const template = game.failed ? failedTemplate : winTemplate;
      return template;
    }).join(``);
  }
  bind() {
    const header = new GameHeader(0);
    this.element.insertBefore(header.element, this.element.firstElementChild);
  }
}
