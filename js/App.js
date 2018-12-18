import {changeScreen} from './utils.js';
import IntroPage from './pages/introduction.js';
import GreetingPage from './pages/greeting.js';
import RulesPage from './pages/rules.js';
import StatsPage from './pages/statistic.js';
import ConfirmModal from './views/confirm-modal.js';
import GameModel from './GameModal.js';
import FetchData from './api/FetshData.js';

const startGame = {
  answers: [],
  questions: null,
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
    FetchData.loadData()
    .then((questions) => {
      startGame.questions = questions;
      this.gameModel = new GameModel(startGame);
      const game = this.gameModel.startGame();
      changeScreen(game);
    });
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
