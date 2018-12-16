import AbstractView from '../AbstractView.js';

import {changeScreen} from '../utils.js';
import {handleLivesGame} from '../data/game-lifes.js';
import {changeLevel} from '../data/change-level.js';
import GameOneImage from '../views/game-one-view.js';
import GameTwoImages from '../views/gameTwoImages.js';
import GameThreeImages from '../views/gameThreeImages.js';
import App from '../App.js';

export default class MainGameScreen extends AbstractView {
  constructor(data) {
    super();
    this.game = data;
  }

  get template() {
    return this.updateQuestion(this.game);
  }

  updateGame(element, twoAnswers, time) {
    const {questions, level} = this.game;
    this.game.gameStarted = true;
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
    this.checkAnswer(userAnswer, time);
    this.game = handleLivesGame(this.game, this.game.answers[this.game.level - 1], this.game.lives);
    if (this.game.lives !== 0) {
      changeLevel(this.game, this.game.level++);
      changeScreen(this.updateQuestion(this.game));
    } else {
      this.game.gameStarted = false;
      App.showStatisticPage(this.game);
    }
  }

  checkAnswer(userAnswer, time) {
    let userResult;
    if (userAnswer.id) {
      userResult = this.game.questions[this.game.level - 1].answers[userAnswer.id] === userAnswer.type;
    } else if (userAnswer.length > 0) {
      userResult = this.game.questions[this.game.level - 1].answers[0].type === userAnswer[0].question1 && this.game.questions[this.game.level - 1].answers[1].type === userAnswer[0].question2;
    } else {
      userResult = this.game.questions[this.game.level - 1].answers[0].type === userAnswer.type;
    }
    this.game.answers.push({
      time: time.time,
      type: time.title,
      right: userResult,
    });
  }

  updateQuestion() {
    const {level, questions} = this.game;
    this.game.gameStarted = true;
    if (level === questions.length - 1) {
      this.game.gameStarted = false;
      App.showStatisticPage(this.game);
    } else {
      switch (questions[level - 1].type) {
        case `tinder-like`:
          return new GameOneImage(questions[level - 1], this.game).element;
        case `two-of-two`:
          return new GameTwoImages(questions[level - 1], this.game).element;
        case `one-of-three`:
          return new GameThreeImages(questions[level - 1], this.game).element;
      }
    }
    return null;
  }
  bind() {
  }
}
