// const mainElement = document.querySelector(`#main`);
import {changeScreen} from '../../utils.js';
import {handleLivesGame} from '../../data/game-lifes.js';
import {changeLevel} from '../../data/change-level.js';
import {Answer} from '../../constants.js';
import {images} from '../../gameData.js';
import gameOneImage from './gameTemplates/gameOneImage.js';
import gameTwoImages from './gameTemplates/gameTwoImages.js';
import gameThreeImages from './gameTemplates/gameThreeImages.js';
import stats from '../stats.js';

import header from './header-game/header.js';

let startGame = {
  answers: [],
  questions: images,
  lives: 3,
  level: 1,
  failed: false,
};

export const updateGame = (game, element, twoAnswers) => {
  const {questions, level} = game;
  header(game.lives);
  let userAnswer;
  switch (questions[level - 1].type) {
    case `tinder-like`:
      userAnswer = {
        type: element.value
      };
      break;
    case `one-of-three`:
      userAnswer = {
        id: element.getAttribute(`data-id`),
        type: element.getAttribute(`data-type`)
      };
      break;
    case `two-of-two`:
      userAnswer = twoAnswers;
      break;
  }
  checkAnswer(game, userAnswer);
  game = handleLivesGame(game, game.answers[game.level - 1], game.lives);
  if (game.lives !== 0) {
    changeLevel(game, game.level++);
    changeScreen(updateQuestion(game));
    header(game.lives);
  } else {
    changeScreen(stats(game));
    header(game.lives);
  }
};

export const checkAnswer = (game, userAnswer) => {
  let userResult;
  if (userAnswer.id) {
    userResult = game.questions[game.level - 1].answers[userAnswer.id] === userAnswer.type;
  } else if (userAnswer.length > 0) {
    userResult = game.questions[game.level - 1].answers[0].type === userAnswer[0].question1 && game.questions[game.level - 1].answers[1].type === userAnswer[0].question2;
  } else {
    userResult = game.questions[game.level - 1].answers[0].type === userAnswer.type;
  }
  game.answers.push({
    time: Answer.NORMAL.time,
    type: Answer.NORMAL.title,
    right: userResult
  });
};

export const updateQuestion = (game) => {
  const {level, questions} = game;
  if (level === questions.length - 1) {
    changeScreen(stats(game));
  } else {
    switch (questions[level - 1].type) {
      case `tinder-like`:
        return gameOneImage(questions[level - 1], game);
      case `two-of-two`:
        return gameTwoImages(questions[level - 1], game);
      case `one-of-three`:
        return gameThreeImages(questions[level - 1], game);
    }
  }
  return null;
};

const element = updateQuestion(startGame);

export default element;
