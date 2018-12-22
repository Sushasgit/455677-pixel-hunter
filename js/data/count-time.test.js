import {assert} from 'chai';
import {countTime} from './count-time.js';

const INITIAL_GAME = {
  answers: [],
  questions: [],
  lives: 3,
  level: 1,
  failed: false,
  gameStarted: false,
  time: 30,
};

describe(`Check countdown timer`, () => {

  it(`should decrease countdown timer`, () => {
    assert.equal(countTime(INITIAL_GAME).time, 29);
  });

  it(`shouldn't allow to set negatime time`, () => {
    assert.throws(() => countTime({lives: 3, level: 1, time: -1}).time, /Время не может быть отрицательным/);
  });

  it(`shouldn't decrease countdown timer if it's finished`, () => {
    assert.equal(countTime({lives: 3, level: 1, time: 0}).time, 0);
  });
});
