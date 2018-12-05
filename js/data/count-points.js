import {Answer, MIN_NEEDED_ANSWERS, REMAINING_LIFE_SCORE} from '../constants.js';

export const countPoints = (answers, remainingLives) => {
  const countAnswers = answers.reduce((prev, current) => {
    prev[current.time]++;
    return prev;
  }, {
    [Answer.SLOW.title]: 0,
    [Answer.NORMAL.title]: 0,
    [Answer.FAST.title]: 0
  });
  const points = Object.keys(Answer).reduce((prev, current) => {
    return countAnswers.hasOwnProperty(current)
      ? countAnswers[current] * Answer[current].points + prev
      : 0;
  }, 0);

  let gameResult = answers.length < MIN_NEEDED_ANSWERS ? -1 : points + remainingLives * REMAINING_LIFE_SCORE;
  return gameResult;
};
