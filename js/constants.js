export const Answer = {
  FAST: `fast`,
  NORMAL: `normal`,
  SLOW: `slow`,
};

export const ANSWER_TIME = 30;

export const INITIAL_GAME = Object.freeze({
  answers: [
    {
      time: Answer.NORMAL,
      right: false,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: false,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
    {
      time: Answer.NORMAL,
      right: true,
    },
  ],
  lives: 0,
});
