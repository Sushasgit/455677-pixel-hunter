// const mainElement = document.querySelector(`#main`);
import {changeScreen, render} from '../../utils.js';
import {handleLivesGame} from '../../data/game-lifes.js';
import {changeLevel} from '../../data/change-level.js';
import {Answer} from '../../constants.js';
import {images} from './data.js';
import gameOneImage from './gameTemplates/gameOneImage.js';
import gameTwoImages from './gameTemplates/gameTwoImages.js';
import gameThreeImages from './gameTemplates/gameThreeImages.js';
import stats from '../stats.js';

// import header from './header-game/header.js';

const FIRST_QUESTION = `question1`;
const SECOND_QUESTION = `question2`;

let startGame = {
  answers: [],
  questions: images,
  lives: 3,
  level: 0,
  failed: false,
};

// TODO: need to create pure functions;
// TODO: Header
// TODO: List statistics

const updateQuestion = (game) => {
  const {level, questions} = game;
  if (level >= questions.length) {
    changeScreen(render(stats(startGame)));
  }
  switch (questions[level].type) {
    case `tinder-like`:
      return gameOneImage(questions[level]);
    case `two-of-two`:
      return gameTwoImages(questions[level]);
    case `one-of-three`:
      return gameThreeImages(questions[level]);
  }
  return null;
};

const checkAnswer = (game, userAnswer) => {
  console.log('UserAnSwer', userAnswer)
  console.log('gq', game.questions[game.level])

  let userResult;
  if (userAnswer.id) {
    userResult = game.questions[game.level].answers[userAnswer.id] === userAnswer.type;
  } else if (userAnswer.length > 0) {
    userResult = game.questions[game.level].answers[0].type === userAnswer[0].question1 && game.questions[game.level].answers[1].type === userAnswer[0].question2
  } else {
    userResult = game.questions[game.level].type === userAnswer.type;
  }
  game.answers.push({
    time: Answer.NORMAL.time,
    type: Answer.NORMAL.title,
    right: userResult
  });
  handleLivesGame(game, game.answers[game.level], game.lives);

  if (!game.lives) {
    changeScreen(stats(game));
  }
};

const updateGame = (game, element, twoAnswers) => {
  const {questions, level} = game;
  // console.log('elem', element);

  let userAnswer;
  switch (questions[level].type) {
    case `tinder-like`:
      userAnswer = {
        type: element.getAttribute(`data-type`)
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

  checkAnswer(startGame, userAnswer);
  if (startGame) {
    changeLevel(game, game.level++);
    console.log(game)
    changeScreen(updateQuestion(game));
  }
};

const element = updateQuestion(startGame);

const answerButtons = element.querySelectorAll(`.game__oneImage input`);
const gameThreeImage = element.querySelectorAll(`.game__threeImage`);

gameThreeImage.forEach((radio) => {
  radio.addEventListener(`click`, () => {
    updateGame(startGame, radio);
  }, false);
});

answerButtons.forEach((radio) => {
  radio.addEventListener(`click`, () => {
    updateGame(startGame, radio);
  }, false);
});

// Две картинки
const radiosButtons = element.querySelectorAll(`.game__twoImage input`);
radiosButtons.forEach((radio) => {
  radio.addEventListener(`change`, () => {
    saveAnswers(radio.name, radio.value);
  });
});
const answer = {};

const saveAnswers = (answerGroup, question) => {
  let answers = [];
  answer[answerGroup] = question;
  if (answer.hasOwnProperty(FIRST_QUESTION) && answer.hasOwnProperty(SECOND_QUESTION)) {
    answers.push(answer);
    updateGame(startGame, undefined, answers);
  }
  return answers;
};

changeScreen(element);
export default element;
