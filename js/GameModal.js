import {INITIAL_GAME} from './constants.js';
import MainGamePage from './pages/mainGame.js';
import {deepClone} from './helpers.js';

export default class GameModel {
  constructor(data = INITIAL_GAME) {
    this.data = data;
    this.game = new MainGamePage(data);
    this.initialGame = deepClone(INITIAL_GAME);
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
    return this.game.questions >= 10;
  }

  gameOver() {
    return this.game.lives < 0;
  }
}
