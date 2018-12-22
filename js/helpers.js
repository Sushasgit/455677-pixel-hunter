import {Answer, GameRules} from './constants.js';

export const deepClone = (object) => {
  let output;
  let value;
  let key;
  output = Array.isArray(object) ? [] : {};
  for (key in object) {
    if (object.hasOwnProperty(key)) {
      value = object[key];
      output[key] = (typeof v === `object`) ? deepClone(value) : value;
    }
  }
  return output;
};

export const getAnswerTime = (time = GameRules.MAX_TIME) => {
  let answerTime = null;
  if (time >= 0 && time <= 10) {
    answerTime = Answer.SLOW;
  } else if (time > 10 && time < 20) {
    answerTime = Answer.NORMAL;
  } else if (time > 20) {
    answerTime = Answer.FAST;
  }
  return answerTime;
};
