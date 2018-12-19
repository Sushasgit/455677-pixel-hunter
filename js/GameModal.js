import {MAX_QUANTITY_QUESTIONS} from './constants.js';
import MainGamePage from './pages/mainGame.js';
import {deepClone} from './helpers.js';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.initialGame = deepClone(data);
    this.restart();
  }

  startGame() {
    return this.game.updateQuestion();

  }

  restart() {
    this.game = new MainGamePage(this.initialGame);
    return this.startGame();
  }

  isEndOfGame() {
    return this.game.questions >= MAX_QUANTITY_QUESTIONS;
  }

  gameOver() {
    return this.game.lives < 0;
  }
}
