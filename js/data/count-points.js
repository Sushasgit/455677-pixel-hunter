
import {Answer, MAX_FAILED_ANSWERS} from '../constants.js';

export const countPoints = (answers, remainingLives) => {
  const countAnswers = answers.reduce((prev, current) => {
    prev[current.time]++;
    return prev;
  }, {
    [Answer.SLOW.title]: 0,
    [Answer.NORMAL.title]: 0,
    [Answer.FAST.title]: 0
  });

  const gameResult = answers.length < MAX_FAILED_ANSWERS
    ? -1
    : Object.keys(Answer).forEach((element) => {
      let el = element.toLowerCase();
      return countAnswers[el] * Answer[element].points + remainingLives * 50;
    });
  return gameResult;
};
