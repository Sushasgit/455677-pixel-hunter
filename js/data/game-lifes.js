export const handleLivesGame = (game, answer, remainingLives) => {
  if (remainingLives < 0) {
    throw new Error(`Reemaining Lives should not be negative`);
  }
  if (remainingLives > 3) {
    throw new Error(`Reemaining Livesshould be from 0 to 3`);
  }
  if (!answer.right && remainingLives > 0) {
    remainingLives--;
    console.log('remainingL--', answer.right, remainingLives)
  }
  // if (remainingLives === 0) {
  //   alert(`baaaad`);
  //   const newGame = Object.assign({}, game, {
  //     lives: remainingLives
  //   });
  // }
    const newGame = Object.assign({}, game, {
      lives: remainingLives
    });
  
    return newGame;
  
};
