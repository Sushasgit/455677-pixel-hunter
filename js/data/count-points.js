import {Answer, MAX_FAILED_ANSWERS} from '../constants.js';

export const countPoints = (answers, remainingLives) => {
  let gameResult = 0;
  const countAnswers = answers.reduce((prev, current) => {
    prev[current.time]++;
    return prev;
  }, {
    [Answer.SLOW.title]: 0,
    [Answer.NORMAL.title]: 0,
    [Answer.FAST.title]: 0
  });

  Object.keys(Answer).forEach((element) => {
    gameResult += countAnswers[element] * Answer[element].points;
  });
  gameResult = answers.length < MAX_FAILED_ANSWERS ? -1 : gameResult + remainingLives * 50;
  return gameResult;
};
