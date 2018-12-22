import {changeScreen, render} from '../utils.js';
import {getAnswerTime} from '../helpers.js';
import GameOneImage from '../views/game-one-view.js';
import GameTwoImages from '../views/gameTwoImages.js';
import GameThreeImages from '../views/gameThreeImages.js';
import App from '../App.js';
import {AnswerType, QuestionType, GameRules} from '../constants.js';
import Header from '../views/gameHeader.js';

export default class MainGamePage {
  constructor(gameModel) {
    this.gameModel = gameModel.game;
    this.game = gameModel;
    this.header = new Header(this.gameModel.lives, true, this.gameModel.gameStarted);
    this.gameContainerElement = render();
    this.gameView = this.updateQuestion();
    this.gameContainerElement.appendChild(this.gameView.element);

    this.interval = null;
  }

  get element() {
    return this.gameContainerElement;
  }

  startGame() {
    this.game.restart();
    this.startTimer();
    return changeScreen(this.updateQuestion().element);
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
    this.checkAnswer(userAnswer, this.gameModel.time);
    if (this.gameModel.lives) {
      this.gameModel = this.game.nextLevel();
      this.gameModel.time = GameRules.MAX_TIME;
      changeScreen(this.updateQuestion().element);
    } else if (this.game.isEndOfGame() || !this.gameModel.lives) {
      this.stopTimer();
      this.gameModel.gameStarted = false;
      App.showStatisticPage(this.gameModel);
    }
  }

  checkAnswer(userAnswer) {
    let userResult;
    if (userAnswer.id) {
      userResult = this.gameModel.questions[this.gameModel.level - 1].answers[userAnswer.id - 1].type === userAnswer.type && userAnswer.type === AnswerType.PHOTO;
      this.gameModel = this.game.deductGameLives(userResult);
      this.header = new Header(this.gameModel.lives, true, this.gameModel.gameStarted);
    } else if (userAnswer.length > 0) {
      userResult = this.gameModel.questions[this.gameModel.level - 1].answers[0].type === userAnswer[0].question1 && this.gameModel.questions[this.gameModel.level - 1].answers[1].type === userAnswer[0].question2;
      this.gameModel = this.game.deductGameLives(userResult);
      this.header = new Header(this.gameModel.lives, true, this.gameModel.gameStarted);
    } else {
      userResult = this.gameModel.questions[this.gameModel.level - 1].answers[0].type === userAnswer.type;
      this.gameModel = this.game.deductGameLives(userResult);
      this.header = new Header(this.gameModel.lives, true, this.gameModel.gameStarted);
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

  checkTimer() {
    if (this.game.isEndOfTime()) {
      this.gameModel.time = GameRules.MAX_TIME;
      this.gameModel = this.game.nextLevel();
      const answer = {
        time: getAnswerTime(0),
        right: false,
      };
      this.gameModel = this.game.deductGameLives(false);
      this.gameModel.answers.push(answer);
      this.game.deductGameLives(answer);
      this.header = new Header(this.gameModel.lives, true, this.gameModel.gameStarted);
      changeScreen(this.updateQuestion().element);
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.gameModel = this.game.tick();
      this.updateHeader(this.gameModel.time);
      this.checkTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  updateQuestion() {
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
  bind() {
  }
}
