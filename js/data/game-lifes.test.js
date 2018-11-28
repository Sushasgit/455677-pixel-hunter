import {assert} from 'chai';

import {INITIAL_GAME} from '../constants.js';
import {handleLivesGame} from './game-lifes.js';

describe(`Check lives`, () => {

  it(`GameOver game`, () => {
    assert.equal(handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[0], -1), -1);
    assert.equal(handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[2], 2), -1);
    assert.equal(handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[0], 0), -1);
  });
});
