import {render} from '../utils';
import {countPoints} from '../data/count-points.js';


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
        <ul class="stats">
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--correct"></li>
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--unknown"></li>
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">${answers * 100}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${result.countAnswers.FAST} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${result.countAnswers.FAST * 50}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${data.lives} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${data.lives * 50}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${result.countAnswers.SLOW} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${result.countAnswers.SLOW * -50}</td>
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
