import {images} from './gameData.js';
export const MAX_TIME = 30;
export const MIN_NEEDED_ANSWERS = 10;
export const REMAINING_LIFE_SCORE = 50;
export const FAST_ANSWER_BONUS = 50;
export const SLOW_ANSWER_FINE = -50;
export const ANSWER_TIME = 30;
export const TIME_BLINK_COUNTER = 5;
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
    time: 30,
    points: 50,
  }
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

export const INITIAL_GAME = {
  answers: [],
  questions: images,
  lives: 3,
  level: 1,
  failed: false,
  gameStarted: false
};
