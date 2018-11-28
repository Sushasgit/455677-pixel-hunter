export const handleLivesGame = (game, answer, remainingLives) => {
  if (!answer.right && remainingLives > 0) {
    remainingLives--;
  } else {
    return -1;
  }
  const newGame = Object.assign({}, game, {
    lives: remainingLives
  });

  return newGame;
};
