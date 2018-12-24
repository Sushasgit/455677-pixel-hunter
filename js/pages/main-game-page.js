import {changeScreen, render} from '../utils.js';
import {getAnswerTime} from '../helpers.js';
import GameOneImage from '../views/game-one-image.js';
import GameTwoImages from '../views/game-two-images.js';
import GameThreeImages from '../views/game-three-images.js';
import App from '../app.js';
import {AnswerType, QuestionType, GameRules} from '../constants.js';
import GameHeader from '../views/game-header.js';

export default class MainGamePage {
  constructor(gameModel) {
    this.gameModel = gameModel.game;
    this.game = gameModel;
    this.interval = null;
    this.header = new GameHeader(this.gameModel.lives, true, this.gameModel.gameStarted, this.interval);
    this.gameContainerElement = render();
    this.gameView = this._updateQuestion();
    this.gameContainerElement.appendChild(this.gameView.element);
  }

  get element() {
    return this.gameContainerElement;
  }

  startGame() {
    this.game.restart();
    this._startTimer();
    this.header.updateInterval(this.interval);
    return changeScreen(this._updateQuestion().element);
  }

  updateGame(element, twoAnswers) {
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

    this._checkAnswer(userAnswer, this.gameModel.time);
    if (!this.game.isGameOver() && !this.game.isEndOfGame()) {
      this.gameModel.gameStarted = true;
      this.gameModel = this.game.getNextLevel();
      this.gameModel.time = GameRules.MAX_TIME;
      changeScreen(this._updateQuestion().element);
    } else if (this.game.isEndOfGame() || this.game.isGameOver()) {
      this._stopTimer();
      this.gameModel.gameStarted = false;
      App.showStatisticPage(this.gameModel);
    }
  }

  _checkAnswer(userAnswer) {
    let userResult;
    const currentQuestion = this.gameModel.questions[this.gameModel.level - 1];
    if (userAnswer.id) {
      const questionThreeType = currentQuestion.question.indexOf(`рисунок`) === -1 ? AnswerType.PHOTO : AnswerType.PAINTING;
      userResult = currentQuestion.answers[userAnswer.id - 1].type === userAnswer.type && userAnswer.type === questionThreeType;
      this.gameModel = this.game.deductGameLives(userResult);
      this.header = new GameHeader(this.gameModel.lives, true, this.gameModel.gameStarted, this.interval);
    } else if (userAnswer.length > 0) {
      userResult = currentQuestion.answers[0].type === userAnswer[0].question1 && currentQuestion.answers[1].type === userAnswer[0].question2;
      this.gameModel = this.game.deductGameLives(userResult);
      this.header = new GameHeader(this.gameModel.lives, true, this.gameModel.gameStarted, this.interval);
    } else {
      userResult = currentQuestion.answers[0].type === userAnswer.type;
      this.gameModel = this.game.deductGameLives(userResult);
      this.header = new GameHeader(this.gameModel.lives, true, this.gameModel.gameStarted, this.interval);
    }
    this.gameModel.answers.push({
      time: getAnswerTime(this.gameModel.time) ? getAnswerTime(this.gameModel.time).time : 0,
      type: (userResult && getAnswerTime(this.gameModel.time)) ? getAnswerTime(this.gameModel.time).title : ``,
      right: userResult,
    });
  }

  updateHeader(time) {
    this.header.updateTime(time);
  }

  _checkTimer() {
    if (this.game.isEndOfTime()) {
      this.gameModel.time = GameRules.MAX_TIME;
      this.gameModel = this.game.getNextLevel();
      const answer = {
        time: getAnswerTime(0),
        right: false,
      };
      this.gameModel.answers.push(answer);
      this.gameModel = this.game.deductGameLives(answer.right);
      this.header = new GameHeader(this.gameModel.lives, true, this.gameModel.gameStarted, this.interval);
      if (this.gameModel.lives >= 0) {
        changeScreen(this._updateQuestion().element);
      } else {
        App.showStatisticPage(this.gameModel);
        this._stopTimer();
      }
    }
  }

  _startTimer() {
    this.interval = setInterval(() => {
      this.gameModel = this.game.tick();
      this.updateHeader(this.gameModel.time);
      this._checkTimer();
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this.interval);
  }

  _updateQuestion() {
    this.gameModel.gameStarted = true;
    const typeQuestion = this.gameModel.questions[this.gameModel.level - 1].type;
    let template;
    switch (typeQuestion) {
      case QuestionType.TINDER_LIKE:
        const tenderLikeTemplate = new GameOneImage(this.gameModel, this.header);
        tenderLikeTemplate.onGetAnswers = (element, time) => {
          this.updateGame(element, undefined, time);
        };
        template = tenderLikeTemplate;
        break;
      case QuestionType.TWO_OF_TWO:
        const twoOfTwoTemplate = new GameTwoImages(this.gameModel, this.header);
        twoOfTwoTemplate.onGetAnswers = (twoAnswers, time) => {
          this.updateGame(undefined, twoAnswers, time);
        };
        template = twoOfTwoTemplate;
        break;
      case QuestionType.ONE_OF_THREE:
        const oneOfThreeTemplate = new GameThreeImages(this.gameModel, this.header);
        oneOfThreeTemplate.onGetAnswers = (element, time) => {
          this.updateGame(element, undefined, time);
        };
        template = oneOfThreeTemplate;
        break;
    }
    return template;
  }
}