export const Answer = {
  FAST: {
    title: `FAST`,
    time: 10,
    points: 150,
  },
  NORMAL: {
    title: `NORMAL`,
    time: 20,
    points: 100,
  },
  SLOW: {
    title: `SLOW`,
    time: 20,
    points: 50,
  }
};

export const MAX_TIME = 30;
export const MIN_NEEDED_ANSWERS = 10;
export const REMAINING_LIFE_SCORE = 50;
export const ANSWER_TIME = 30;

export const INITIAL_GAME = Object.freeze({
  answers: [
    {
      time: Answer.NORMAL.time,
      right: false,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: false,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
    {
      time: Answer.NORMAL.time,
      right: true,
    },
  ],
  lives: 0,
});
