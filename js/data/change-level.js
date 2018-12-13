export const changeLevel = (game, level) => {
  if (typeof level !== `number` || isNaN(level)) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  if (level === 0) {
    throw new Error(`Level should not be 0`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};
