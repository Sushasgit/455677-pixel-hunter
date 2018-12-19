import {countPoints} from '../data/count-points.js';
import listStats from './game-indicators.js';
import {Answer, GameBonuses} from '../constants.js';
import AbstractView from '../AbstractView';
import Header from './gameHeader.js';

export default class Stats extends AbstractView {
  constructor(data) {
    super();
    this.failed = data.failed;
    this.answers = data.answers;
    this.lives = data.lives;
    this.data = data;
  }

  get template() {
    const result = countPoints(this.answers, this.lives);
    const answers = result.countAnswers.FAST + result.countAnswers.NORMAL + result.countAnswers.SLOW;
    return `
      <section class="result">
      <h2 class="result__title">${this.failed ? `Fail` : `Победа!`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${listStats(this.data)}
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${answers * Answer.NORMAL.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${result.countAnswers.FAST} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result.countAnswers.FAST * GameBonuses.FAST_ANSWER_BONUS}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.lives} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.lives * GameBonuses.REMAINING_LIFE_SCORE}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${result.countAnswers.SLOW} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result.countAnswers.SLOW * GameBonuses.SLOW_ANSWER_FINE}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${result.gameResult}</td>
        </tr>
      </table>
    </section>`;
  }

  bind() {
    const header = new Header(this.lives);
    this.element.insertBefore(header.element, this.element.firstElementChild);
  }

}
