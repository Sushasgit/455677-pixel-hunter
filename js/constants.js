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

export const sinleQuestion = {
  question: `Угадай, фото или рисунок`,
  images: [
    {
      image: `https://k42.kn3.net/CF42609C8.jpg`,
      rightAnswer: `painting`,
      userAnswer: null,
    },

    {
      image: `https://k42.kn3.net/D2F0370D6.jpg`,
      rightAnswer: `painting`,
      userAnswer: null,
    },

    {
      image: `https://k32.kn3.net/5C7060EC5.jpg`,
      rightAnswer: `painting`,
      userAnswer: null,
    },

    {
      image: `http://i.imgur.com/1KegWPz.jpg`,
      rightAnswer: `photo`,
      userAnswer: null,
    },
  ]
};

export const twoImaesQuestion = {
  question: `Угадайте для каждого изображения фото или рисунок?`,
  images: [
    {
      firstImage: `https://i.imgur.com/DiHM5Zb.jpg`,
      secondImage: `http://i.imgur.com/DKR1HtB.jpg`,
      rightAnswer: `painting`,
      userAnswer: null,
    },

    {
      firstImage: `https://i.imgur.com/DiHM5Zb.jpg`,
      secondImage: `http://i.imgur.com/DKR1HtB.jpg`,
      rightAnswer: `painting`,
      userAnswer: null,
    },

    {
      firstImage: `https://i.imgur.com/DiHM5Zb.jpg`,
      secondImage: `http://i.imgur.com/DKR1HtB.jpg`,
      rightAnswer: `painting`,
      userAnswer: null,
    },

    {
      firstImage: `https://i.imgur.com/DiHM5Zb.jpg`,
      secondImage: `http://i.imgur.com/DKR1HtB.jpg`,
      rightAnswer: `photo`,
      userAnswer: null,
    },
  ]
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
