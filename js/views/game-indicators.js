import {Answer, GameRules} from '../constants.js';

const listStats = (game) => {
  const handleTypeAnswers = (currentGame) => {
    let statisticTemplate;
    const statsArr = currentGame.answers.map((element) => {
      if (element.right) {
        switch (element.time) {
          case Answer.NORMAL.time:
            statisticTemplate = `<li class="stats__result stats__result--correct"></li>`;
            break;
          case Answer.FAST.time:
            statisticTemplate = `<li class="stats__result stats__result--fast"></li>`;
            break;
          case Answer.SLOW.time:
            statisticTemplate = ` <li class="stats__result stats__result--slow"></li>`;
            break;
        }
      } else {
        return `<li class="stats__result stats__result--wrong"></li>`;
      }
      return statisticTemplate;
    });
    return statsArr;
  };

  return `<ul class="stats">
    ${handleTypeAnswers(game)
    .join(``)}    
    
    ${new Array(GameRules.MAX_QUANTITY_QUESTIONS - game.answers.length)
    .fill(`<li class="stats__result stats__result--unknown"></li>`)
    .join(``)}   
    </ul>`;
};

export default listStats;
