import {render} from '../utils';
import {countPoints} from '../data/count-points.js';
import listStats from './gameScreen/game-indicators.js';
import {Answer, FAST_ANSWER_BONUS, REMAINING_LIFE_SCORE, SLOW_ANSWER_FINE} from '../constants.js';

const stats = (data) => {
  const result = countPoints(data.answers, data.lives);
  const answers = result.countAnswers.FAST + result.countAnswers.NORMAL + result.countAnswers.SLOW;
  const statistics = `
  <section class="result">
  <h2 class="result__title">${data.failed ? `Fail` : `Победа!`}</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        ${listStats(data)}
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">${answers * Answer.NORMAL.points}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${result.countAnswers.FAST} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${result.countAnswers.FAST * FAST_ANSWER_BONUS}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${data.lives} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${data.lives * REMAINING_LIFE_SCORE}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${result.countAnswers.SLOW} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${result.countAnswers.SLOW * SLOW_ANSWER_FINE}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${result.gameResult}</td>
    </tr>
  </table>
</section>`;

  const element = render(statistics);

  return element;
};

export default stats;
