import {assert} from 'chai';

import {countPoints} from './count-points.js';
import {INITIAL_GAME, NORMAL_ANSWER, SLOW_ANSWER, FAST_ANSWER} from '../constants.js';

export const generateArray = (length, time, isRight) => {
  const arr = Array(length).fill({});
  arr[0][`right`] = isRight;
  arr[0][`time`] = time;

  return arr;
};

describe(`Check level changer`, () => {
  it(`Return game points`, () => {
    assert.equal(countPoints(INITIAL_GAME.answers, 3), 1150);
    assert.equal(countPoints(INITIAL_GAME.answers, 2), 1100);
    assert.equal(countPoints(INITIAL_GAME.answers, 1), 1050);
    assert.equal(countPoints(INITIAL_GAME.answers, 0), 1000);
    assert.equal(countPoints(generateArray(10, SLOW_ANSWER, true), 2), 600);
    assert.equal(countPoints(generateArray(10, SLOW_ANSWER, true), 1), 550);
    assert.equal(countPoints(generateArray(10, SLOW_ANSWER, true), 3), 650);
    assert.equal(countPoints(generateArray(10, FAST_ANSWER, true), 3), 1650);
    assert.equal(countPoints(generateArray(10, FAST_ANSWER, true), 2), 1600);
    assert.equal(countPoints(generateArray(10, FAST_ANSWER, true), 1), 1550);
    assert.equal(countPoints(generateArray(10, NORMAL_ANSWER, false), 3), -1);
    assert.equal(countPoints(generateArray(10, NORMAL_ANSWER, true), 3), 1150);
    assert.equal(countPoints(generateArray(10, NORMAL_ANSWER, true), 2), 1100);
    assert.equal(countPoints(generateArray(10, NORMAL_ANSWER, true), 1), 1050);
  });

  it(`Answers should be an array`, () => {
    assert.isArray(INITIAL_GAME.answers);
  });

});
