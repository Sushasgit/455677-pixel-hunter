export const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
export const APPLICATION_ID = 6903820;

export const GameRules = {
  MAX_QUANTITY_QUESTIONS: 10,
  MAX_TIME: 30,
  MIN_NEEDED_ANSWERS: 10,
  TIME_BLINK_COUNTER: 5,
  GAME_LIVES: 4,
};

export const INITIAL_GAME = {
  answers: [],
  questions: null,
  lives: 3,
  level: 1,
  time: GameRules.MAX_TIME,
  failed: false,
  gameStarted: true,
  name: ``,
};

export const AnswerTimeType = {
  FAST: `FAST`,
  NORMAL: `NORMAL`,
  SLOW: `SLOW`,
};

export const Answer = {
  FAST: {
    title: AnswerTimeType.FAST,
    time: 10,
    points: 150,
  },
  NORMAL: {
    title: AnswerTimeType.NORMAL,
    time: 20,
    points: 100,
  },
  SLOW: {
    title: AnswerTimeType.SLOW,
    time: 30,
    points: 50,
  }
};

export const GameBonuses = {
  REMAINING_LIFE_SCORE: 50,
  FAST_ANSWER_BONUS: 50,
  SLOW_ANSWER_FINE: -50,
};

export const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`,
};

export const QuestionNums = {
  FIRST: `question1`,
  SECOND: `question2`,
};
