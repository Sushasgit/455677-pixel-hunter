import {changeScreen} from './utils.js';
import IntroPage from './pages/introduction.js';
import GreetingPage from './pages/greeting.js';
import RulesPage from './pages/rules.js';
import MainGamePage from './pages/mainGame.js';
import StatsPage from './pages/statistic.js';
import ConfirmModal from './views/confirm-modal.js';

import {images} from './gameData.js';
let startGame = {
  answers: [],
  questions: images,
  lives: 3,
  level: 1,
  failed: false,
  gameStarted: false,
};

export default class App {

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
    const game = new MainGamePage(startGame);
    changeScreen(game.updateQuestion());
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
