import {changeScreen} from './utils.js';
import IntroPage from './pages/introduction.js';
import GreetingPage from './pages/greeting.js';
import RulesPage from './pages/rules.js';
import StatsPage from './pages/statistic.js';
import ConfirmModal from './views/confirm-modal.js';
import GameModel from './GameModal.js';
import FetchData from './api/FetshData.js';
import ErrorModal from './views/error-modal.js';

const startGame = {
  answers: [],
  questions: null,
  lives: 3,
  level: 1,
  failed: false,
  gameStarted: false,
  name: ``,
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
    FetchData.loadData()
    .then((questions) => {
      startGame.questions = questions;
      this.gameModel = new GameModel(startGame);
      const rules = new RulesPage(this.gameModel);
      changeScreen(rules);
    });
  }

  static startGamePage(game) {
    this.gameModel = new GameModel(game);
    const gameData = this.gameModel.startGame();
    changeScreen(gameData);
  }

  static showStatisticPage(game) {
    FetchData.saveStatictic(game)
    .then(() => {
      FetchData.loadStatistic(game.name)
      .then((data)=>{
        const stats = new StatsPage(data);
        changeScreen(stats);
      });
    });
  }

  static showShowConfirmModal() {
    const confirm = new ConfirmModal();
    const body = document.querySelector(`body`);
    body.appendChild(confirm.element);
  }

  static showErrorModal() {
    const error = new ErrorModal();
    const body = document.querySelector(`body`);
    body.appendChild(error.element);
  }
}
