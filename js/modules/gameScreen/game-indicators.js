import {Answer} from '../../constants.js';

const listStats = (game) => {
  const handleTypeAnswers = (currentGame) => {
    const statsArr = currentGame.answers.map((element) => {
      if (element.right) {
        switch (element.time) {
          case Answer.NORMAL.time:
            return `<li class="stats__result stats__result--correct"></li>`;
          case Answer.FAST.time:
            return `<li class="stats__result stats__result--fast"></li>`;
          case Answer.SLOW.time:
            return ` <li class="stats__result stats__result--slow"></li>`;
        }
      } else {
        return `<li class="stats__result stats__result--wrong"></li>`;
      }
      return null;
    });
    return statsArr;
  };

  return `<ul class="stats">
    ${handleTypeAnswers(game)
    .join(``)}    
    
    ${new Array(10 - game.answers.length)
    .fill(`<li class="stats__result stats__result--unknown"></li>`)
    .join(``)}   
    </ul>`;
};

export default listStats;
