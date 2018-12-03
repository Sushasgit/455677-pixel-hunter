import {Answer} from '../constants.js';

export const countPoints = (answers, remainingLives) => {
  const countAnswers = answers.reduce((prev, current) => {
    prev[current.time]++;
    return prev;
  }, {
    [Answer.SLOW]: 0,
    [Answer.NORMAL]: 0,
    [Answer.FAST]: 0
  });

  const gameResult = answers.length < 10
    ? -1
    : (countAnswers[Answer.FAST] * 150) + (countAnswers[Answer.NORMAL] * 100) + (countAnswers[Answer.SLOW] * 50) + (remainingLives * 50);

  return gameResult;
};

