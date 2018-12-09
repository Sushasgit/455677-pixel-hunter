const mainElement = document.querySelector(`#main`);
import {changeScreen, render} from '../utils.js';
import {handleLivesGame} from '../data/game-lifes.js';
import {Answer} from '../constants.js';
import {images} from './gameScreen/data.js';

import gameOneImage from './gameScreen/gameTemplates/gameOneImage.js';
import gameTwoImages from './gameScreen/gameTemplates/gameTwoImages.js';
import gameThreeImages from './gameScreen/gameTemplates/gameThreeImages.js';
import stats from './stats.js';

let INITIAL_GAME = {
  answers: [],
  lives: 3,
  level: 1,
};

const getRandomQuestions = (questions) => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(1, 12);
};

const renderQuestions = (questions) => {
  let output = [];
  const wrapper = document.createElement(`div`);
  wrapper.className = `container`;
  questions.forEach((currentQuestion) => {
    output.push(
        handletypeofQuestion(currentQuestion)
    );
  });
  output.forEach((currentQuestion) => {
    if (currentQuestion) {
      wrapper.appendChild(currentQuestion);
    }
  });
  return mainElement.appendChild(wrapper);
};

const showQuestion = (n) => {
  questionsArray[n].classList.add(`active-slide`);
};

const nextQuestion = (n) => {
  if (n >= questionsArray.length) {
    changeScreen(render(stats(INITIAL_GAME)));
  } else {
    showQuestion(n);
    questionsArray[n - 1].classList.remove(`active-slide`);
  }
};

const checkAnswer = (n, userAnswer) => {
  if (typeof (userAnswer) !== `object`) {
    INITIAL_GAME.answers.push({
      n,
      time: Answer.NORMAL.time,
      right: randomQuestionsArray[n].rightAnswer === userAnswer
    });
  } else {
    INITIAL_GAME.answers.push({
      n,
      time: Answer.NORMAL.time,
      right: randomQuestionsArray[n].firstImage.rightAnswer === userAnswer[0].question1 && randomQuestionsArray[n].secondImage.rightAnswer === userAnswer[0].question2
    });
  }

  INITIAL_GAME = handleLivesGame(INITIAL_GAME, INITIAL_GAME.answers[n - 1], INITIAL_GAME.lives);
  if (!INITIAL_GAME.lives) {
    changeScreen(render(stats(INITIAL_GAME)));
  }
};

const handletypeofQuestion = (question) => {
  switch (question.type) {
    case `oneImage`:
      return gameOneImage(question, nextQuestion, checkAnswer, INITIAL_GAME);
    case `twoImage`:
      return gameTwoImages(question, nextQuestion, checkAnswer, INITIAL_GAME);
    case `threeImage`:
      return gameThreeImages(question, nextQuestion, checkAnswer, INITIAL_GAME);
  }
  return null;
};

const randomQuestionsArray = getRandomQuestions(images);
const element = renderQuestions(randomQuestionsArray);
const questionsArray = element.querySelectorAll(`.game`);

showQuestion(INITIAL_GAME.level);

export default element;
