import {assert} from 'chai';
import {handleLivesGame} from './handle-game-lives.js';

import {INITIAL_GAME} from '../constants.js';

describe(`Check lives changer`, () => {

  it(`should set number of lives`, () => {
    assert.equal(handleLivesGame(INITIAL_GAME, false, 3).lives, 2);
    assert.equal(handleLivesGame(INITIAL_GAME, true, 3).lives, 3);
  });
});
