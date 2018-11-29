import {Answer} from '../constants.js';

export const countPoints = (answers, remainingLives) => {
  const countAnswers = answers.reduce((prev, current) => {
    switch (current.time) {
      case Answer.SLOW:
        prev[Answer.SLOW]++;
        break;
      case Answer.FAST:
        prev[Answer.FAST]++;
        break;
      default:
        prev[Answer.NORMAL]++;
    }

    return prev;
  }, {
    [Answer.SLOW]: 0,
    [Answer.NORMAL]: 0,
    [Answer.FAST]: 0
  });

  let gameResult = answers.length < 10
    ? -1
    : (countAnswers[Answer.FAST] * 150) + (countAnswers[Answer.NORMAL] * 100) + (countAnswers[Answer.SLOW] * 50) + (remainingLives * 50);

  return gameResult;
};

