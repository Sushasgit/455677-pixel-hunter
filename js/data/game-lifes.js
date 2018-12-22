import {GameRules} from '../constants.js';

export const handleLivesGame = (game, answer, remainingLives) => {
  if (remainingLives < 0) {
    throw new Error(`Reemaining Lives should not be negative`);
  }
  if (remainingLives > GameRules.GAME_LIVES) {
    throw new Error(`Reemaining Livesshould be from 0 to 3`);
  }

  if (!answer && remainingLives > 0) {
    remainingLives--;
  }

  const newGame = Object.assign({}, game, {
    lives: remainingLives,
    failed: remainingLives ? false : true,
  });

  return newGame;
};
