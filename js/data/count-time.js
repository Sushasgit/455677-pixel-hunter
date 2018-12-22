export const countTime = (game) => {
  const newState = Object.assign({}, game);

  if (game.time < 0) {
    throw new Error(`Время не может быть отрицательным`);
  } else if (game.time > 0) {
    newState.time--;
  }

  return newState;
};
