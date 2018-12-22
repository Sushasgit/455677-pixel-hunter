import {GameRules} from '../constants.js';

export const handleLivesGame = (game, answer, remainingLives) => {
  if (remainingLives >= GameRules.GAME_LIVES) {
    throw new Error(`Reemaining Livesshould be from 0 to 3`);
  }

  if (!answer) {
    remainingLives--;
  }
  const newGame = Object.assign({}, game, {
    lives: remainingLives,
    failed: (remainingLives < 0) ? true : false,
  });
  return newGame;
};


