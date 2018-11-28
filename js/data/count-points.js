import {FAST_ANSWER, NORMAL_ANSWER, SLOW_ANSWER} from '../constants.js';

export const countPoints = (answers, remainingLives) => {
  const rightAnswers = answers.filter((answer) => answer.right).length;
  const fastAnswers = answers.filter((answer) => answer.right && answer.time === FAST_ANSWER).length;
  const usualAnswers = answers.filter((answer) => answer.right && answer.time === NORMAL_ANSWER).length;
  const slowAnswers = answers.filter((answer) => answer.right && answer.time === SLOW_ANSWER).length;

  if (rightAnswers < 10) {
    return -1;
  } else {
    return (fastAnswers * 150) + (usualAnswers * 100) + (slowAnswers * 50) + (remainingLives * 50);
  }
};

