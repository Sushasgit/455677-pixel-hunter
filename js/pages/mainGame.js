import AbstractView from '../AbstractView.js';

import {changeScreen} from '../utils.js';
import {handleLivesGame} from '../data/game-lifes.js';
import {changeLevel} from '../data/change-level.js';
import GameOneImage from '../views/game-one-view.js';
import GameTwoImages from '../views/gameTwoImages.js';
import GameThreeImages from '../views/gameThreeImages.js';
import App from '../App.js';
import {AnswerType, QuestionType} from '../constants.js';

export default class MainGamePage extends AbstractView {
  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
  }

  updateGame(element, twoAnswers, time) {
    this.gameModel.gameStarted = true;
    let userAnswer;
    switch (this.gameModel.questions[this.gameModel.level - 1].type) {
      case QuestionType.TINDER_LIKE:
        userAnswer = {
          type: element.value
        };
        break;
      case QuestionType.ONE_OF_THREE:
        userAnswer = {
          id: element.getAttribute(`data-id`),
          type: element.getAttribute(`data-type`)
        };
        break;
      case QuestionType.TWO_OF_TWO:
        userAnswer = twoAnswers;
        break;
    }
    this.checkAnswer(userAnswer, time);
    this.gameModel = handleLivesGame(this.gameModel, this.gameModel.answers[this.gameModel.level - 1], this.gameModel.lives);
    if (this.gameModel.lives !== 0) {
      changeLevel(this.gameModel, this.gameModel.level++);
      changeScreen(this.updateQuestion(this.gameModel));
    } else {
      this.gameModel.gameStarted = false;
      App.showStatisticPage(this.gameModel);
    }
  }

  checkAnswer(userAnswer, time) {
    let userResult;
    if (userAnswer.id) {
      userResult = this.gameModel.questions[this.gameModel.level - 1].answers[userAnswer.id - 1].type === userAnswer.type && userAnswer.type === AnswerType.PHOTO;
    } else if (userAnswer.length > 0) {
      userResult = this.gameModel.questions[this.gameModel.level - 1].answers[0].type === userAnswer[0].question1 && this.gameModel.questions[this.gameModel.level - 1].answers[1].type === userAnswer[0].question2;
    } else {
      userResult = this.gameModel.questions[this.gameModel.level - 1].answers[0].type === userAnswer.type;
    }
    this.gameModel.answers.push({
      time: time.time,
      type: userResult ? time.title : ``,
      right: userResult,
    });
  }

  isTimeOut() {
    this.game.answers.push({
      time: 0,
      type: ``,
      right: false,
    });
    this.game.level++;
    this.updateQuestion();
  }

  updateQuestion() {
    const {level, questions} = this.gameModel;
    this.gameModel.gameStarted = true;
    if (level === questions.length - 1) {
      this.gameModel.gameStarted = false;
      App.showStatisticPage(this.gameModel);
    } else {
      switch (questions[level - 1].type) {
        case `tinder-like`:
          return new GameOneImage(questions[level - 1], this.gameModel).element;
        case `two-of-two`:
          return new GameTwoImages(questions[level - 1], this.gameModel).element;
        case `one-of-three`:
          return new GameThreeImages(questions[level - 1], this.gameModel).element;
      }
    }
    return null;
  }
  bind() {
  }
}
