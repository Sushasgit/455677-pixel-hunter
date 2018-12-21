import AbstractView from '../AbstractView.js';

import {changeScreen, render} from '../utils.js';
import {handleLivesGame} from '../data/game-lifes.js';
import {changeLevel} from '../data/change-level.js';
import GameOneImage from '../views/game-one-view.js';
import GameTwoImages from '../views/gameTwoImages.js';
import GameThreeImages from '../views/gameThreeImages.js';
import App from '../App.js';
import {AnswerType, QuestionType} from '../constants.js';
import Header from '../views/gameHeader.js';

export default class MainGamePage extends AbstractView {
  constructor(gameModel) {
    super();
    this.gameModel = gameModel.data;
    this.game = gameModel;
    this.header = new Header(this.gameModel.time, this.gameModel.lives);
    this.gameContainerElement = render();
    this.gameView = this.updateQuestion();
    this.gameContainerElement.appendChild(this.header.element);
    this.gameContainerElement.appendChild(this.gameView.element);

    this.interval = null;

  }

  get element() {
    return this.gameContainerElement;
  }

  startGame() {
    console.log('sxsxs', this.game)
    console.log(this.gameView.element)
    return this.updateQuestion().element;
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
      changeScreen(this.updateQuestion().element);
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

  updateHeader(time) {
    this.header.updateTime(time);
  }

  checkTimer() {

    if (this.game.isEndOfTime()) {
      console.log('ednd')
    }
  }

  updateQuestion() {
    this.interval = setInterval(() => {
      this.game.tick();
      this.updateHeader();
      this.checkTimer();
    }, 1000);
      const typeQuestion = this.gameModel.questions[this.gameModel.level - 1].type;
      let template;
      switch (typeQuestion) {
        case `tinder-like`:
          const tenderLikeTemplate = new GameOneImage(this.gameModel);
          tenderLikeTemplate.onGetAnswers = (element, time) => {
            this.updateGame(element, undefined, time);
          };
          template = tenderLikeTemplate;
          break;
        case `two-of-two`:
          const twoOfTwoTemplate = new GameTwoImages(this.gameModel);
          twoOfTwoTemplate.onGetAnswers = (twoAnswers, time) => {
            this.updateGame(undefined, twoAnswers, time);
          };
          template = twoOfTwoTemplate;
          break;
        case `one-of-three`:
          const oneOfThreeTemplate = new GameThreeImages(this.gameModel);
          oneOfThreeTemplate.onGetAnswers = (element, time) => {
            this.updateGame(element, undefined, time);
          };
          template = oneOfThreeTemplate;
          break;
          
      }
      return template;
      console.log(template)
     
  }
  bind() {
  }
}
