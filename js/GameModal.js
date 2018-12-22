import {GameRules} from './constants.js';
import {deepClone} from './helpers.js';
import {countTime} from './data/count-time.js';
import {changeLevel} from './data/change-level.js';
import {handleLivesGame} from './data/game-lifes.js';

export default class GameModel {
  constructor(data) {
    this.game = data;
    this.initialGame = deepClone(data);
    this.restart();
  }

  restart() {
    this.game = this.initialGame;
    return this.game;
  }

  nextLevel() {
    this.game = changeLevel(this.game, this.game.level + 1);
    return this.game;
  }

  deductGameLives(answer) {
    this.game = handleLivesGame(this.game, answer, this.game.lives);
    return this.game;
  }

  tick() {
    this.game = countTime(this.game);
    return this.game;
  }

  isEndOfGame() {
    return this.game.questions > GameRules.MAX_QUANTITY_QUESTIONS;
  }

  isEndOfTime() {
    return this.game.time <= 0;
  }

  gameOver() {
    return this.game.lives <= 0;
  }
}
