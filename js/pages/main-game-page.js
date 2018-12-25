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
    this._gameModel = gameModel.game;
    this._game = gameModel;
    this._interval = null;
    this._header = new GameHeader(this._gameModel.lives, true, this._gameModel.gameStarted, this._interval);
    this._gameContainerElement = render();
    this._gameView = this._updateQuestion();
    this._gameContainerElement.appendChild(this._gameView.element);
  }

  get element() {
    return this._gameContainerElement;
  }

  startGame() {
    this._game.restart();
    this._startTimer();
    this._header.updateInterval(this._interval);
    return changeScreen(this._updateQuestion().element);
  }

  _updateGame(element, twoAnswers) {
    this._gameModel.gameStarted = true;
    let userAnswer;
    switch (this._gameModel.questions[this._gameModel.level - 1].type) {
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

    this._checkAnswer(userAnswer, this._gameModel.time);
    if (!this._game.isGameOver() && !this._game.isEndOfGame()) {
      this._gameModel.gameStarted = true;
      this._gameModel = this._game.getNextLevel();
      this._gameModel.time = GameRules.MAX_TIME;
      changeScreen(this._updateQuestion().element);
    } else if (this._game.isEndOfGame() || this._game.isGameOver()) {
      this._stopTimer();
      this._gameModel.gameStarted = false;
      App.showStatisticPage(this._gameModel);
    }
  }

  _checkAnswer(userAnswer) {
    let userResult;
    const currentQuestion = this._gameModel.questions[this._gameModel.level - 1];
    if (userAnswer.id) {
      const questionThreeType = currentQuestion.question.indexOf(`рисунок`) === -1 ? AnswerType.PHOTO : AnswerType.PAINTING;
      userResult = currentQuestion.answers[userAnswer.id - 1].type === userAnswer.type && userAnswer.type === questionThreeType;
      this._gameModel = this._game.deductGameLives(userResult);
      this._header = new GameHeader(this._gameModel.lives, true, this._gameModel.gameStarted, this._interval);
    } else if (userAnswer.length > 0) {
      userResult = currentQuestion.answers[0].type === userAnswer[0].question1 && currentQuestion.answers[1].type === userAnswer[0].question2;
      this._gameModel = this._game.deductGameLives(userResult);
      this._header = new GameHeader(this._gameModel.lives, true, this._gameModel.gameStarted, this._interval);
    } else {
      userResult = currentQuestion.answers[0].type === userAnswer.type;
      this._gameModel = this._game.deductGameLives(userResult);
      this._header = new GameHeader(this._gameModel.lives, true, this._gameModel.gameStarted, this._interval);
    }
    this._gameModel.answers.push({
      time: getAnswerTime(this._gameModel.time) ? getAnswerTime(this._gameModel.time).time : 0,
      type: (userResult && getAnswerTime(this._gameModel.time)) ? getAnswerTime(this._gameModel.time).title : ``,
      right: userResult,
    });
  }

  _updateHeader(time) {
    this._header.updateTime(time);
  }

  _checkTimer() {
    if (this._game.isEndOfTime()) {
      this._gameModel.time = GameRules.MAX_TIME;
      this._gameModel = this._game.getNextLevel();
      const answer = {
        time: getAnswerTime(0),
        right: false,
      };
      this._gameModel.answers.push(answer);
      this._gameModel = this._game.deductGameLives(answer.right);
      this._header = new GameHeader(this._gameModel.lives, true, this._gameModel.gameStarted, this._interval);
      if (this._gameModel.lives >= 0) {
        changeScreen(this._updateQuestion().element);
      } else {
        App.showStatisticPage(this._gameModel);
        this._stopTimer();
      }
    }
  }

  _startTimer() {
    this._interval = setInterval(() => {
      this._gameModel = this._game.tick();
      this._updateHeader(this._gameModel.time);
      this._checkTimer();
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this._interval);
  }

  _updateQuestion() {
    this._gameModel.gameStarted = true;
    const typeQuestion = this._gameModel.questions[this._gameModel.level - 1].type;
    let template;
    switch (typeQuestion) {
      case QuestionType.TINDER_LIKE:
        const tenderLikeTemplate = new GameOneImage(this._gameModel, this._header);
        tenderLikeTemplate.onGetAnswers = (element, time) => {
          this._updateGame(element, undefined, time);
        };
        template = tenderLikeTemplate;
        break;
      case QuestionType.TWO_OF_TWO:
        const twoOfTwoTemplate = new GameTwoImages(this._gameModel, this._header);
        twoOfTwoTemplate.onGetAnswers = (twoAnswers, time) => {
          this._updateGame(undefined, twoAnswers, time);
        };
        template = twoOfTwoTemplate;
        break;
      case QuestionType.ONE_OF_THREE:
        const oneOfThreeTemplate = new GameThreeImages(this._gameModel, this._header);
        oneOfThreeTemplate.onGetAnswers = (element, time) => {
          this._updateGame(element, undefined, time);
        };
        template = oneOfThreeTemplate;
        break;
    }
    return template;
  }
}
