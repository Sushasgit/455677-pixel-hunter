import {assert} from 'chai';
import {countTime} from './count-time.js';

import {INITIAL_GAME} from '../constants.js';

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
