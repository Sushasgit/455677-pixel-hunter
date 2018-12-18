import {changeScreen} from './utils.js';
import IntroPage from './pages/introduction.js';
import GreetingPage from './pages/greeting.js';
import RulesPage from './pages/rules.js';
import StatsPage from './pages/statistic.js';
import ConfirmModal from './views/confirm-modal.js';
import GameModel from './GameModal.js';

import {images} from './gameData.js';
const startGame = {
  answers: [],
  questions: images,
  lives: 3,
  level: 1,
  failed: false,
  gameStarted: false,
};

export default class App {

  static getGameModel() {
    this.gameModel = new GameModel(startGame);
  }

  static showIntroPage() {
    const introPage = new IntroPage();
    changeScreen(introPage);
  }

  static showGreetingPage() {
    const greeting = new GreetingPage();
    changeScreen(greeting);
  }

  static showRulesPage() {
    const rules = new RulesPage();
    changeScreen(rules);
  }

  static startGamePage() {
    this.getGameModel();
    const game = this.gameModel.startGame();
    changeScreen(game);
  }

  static showStatisticPage(game) {
    const stats = new StatsPage(game);
    changeScreen(stats);
  }

  static showShowConfirmModal() {
    const stats = new ConfirmModal();
    const body = document.querySelector(`body`);
    body.appendChild(stats.element);
  }
}
