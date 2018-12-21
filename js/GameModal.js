import {MAX_QUANTITY_QUESTIONS} from './constants.js';
import MainGamePage from './pages/mainGame.js';
import {deepClone} from './helpers.js';
import {countTime} from './data/count-time.js';
import {changeLevel} from './data/change-level.js';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.initialGame = deepClone(data);
    // this.restart();
  }

  get state() {
    return this.game;
  }

  nextLevel() {
    this.game = changeLevel(this.game, this.game.level + 1);
    this.game = Object.assign({}, this.game, {time: 30});
  }

  tick() {
    console.log("GAMW",this.game)
    this.game = countTime(this.game);
  }

  isEndOfGame() {
    return this.game.questions >= MAX_QUANTITY_QUESTIONS;
  }

  isEndOfTime() {
    console.log('isEndOfTime', this.game)
    return this.game.time <= 0;
  }

  gameOver() {
    return this.game.lives < 0;
  }
}
