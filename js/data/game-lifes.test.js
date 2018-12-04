import {assert} from 'chai';

import {INITIAL_GAME} from '../constants.js';
import {handleLivesGame} from './game-lifes.js';

describe(`Check lives`, () => {

  it(`GameOver game`, () => {
    assert.equal(handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[2], 2), -1);
    assert.equal(handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[0], 0), -1);
    assert.isObject(handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[0], 2));
  });

  it(`Reemaining Lives should not be negative`, () => {
    assert.throws(() => handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[0], -1), /Reemaining Lives should not be negative/);
  });

  it(`Reemaining Lives should be from 0 to 3`, () => {
    assert.throws(() => handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[0], 40), /Reemaining Livesshould be from 0 to 3/);
  });
});
