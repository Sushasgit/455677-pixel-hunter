import {GameRules} from './constants.js';
import {deepClone} from './helpers.js';
import {countTime} from './data/count-time.js';
import {changeLevel} from './data/change-level.js';
import {handleLivesGame} from './data/game-lifes.js';

export default class GameModel {
  constructor(data) {
    this.game = data;
    this.initialGame = deepClone(this.game);
    this.restart();
  }

  restart() {
    this.game = this.initialGame;
    this.game.answers = [];
    return this.game;
  }

  getNextLevel() {
    const level = this.game.level < 10 ? this.game.level + 1 : this.game.level;
    this.game = changeLevel(this.game, level);
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
    return this.game.answers.length >= GameRules.MAX_QUANTITY_QUESTIONS;
  }

  isEndOfTime() {
    return this.game.time <= 0;
  }

  isGameOver() {
    return this.game.lives < 0;
  }
}
