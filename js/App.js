import {changeScreen} from './utils.js';
import IntroductionPage from './pages/introduction-page.js';
import GreetingPage from './pages/greeting-page.js';
import RulesPage from './pages/rules-page.js';
import StatisticsPage from './pages/statistics-page.js';
import ConfirmModal from './views/confirm-modal.js';
import GameModel from './game-model.js';
import FetchData from './api/fetch-data.js';
import ErrorModal from './views/error-modal.js';
import MainGamePage from './pages/main-game-page.js';

import {INITIAL_GAME} from './constants.js';
let currentGame = {};

export default class App {
  static showIntroPage() {
    FetchData.loadData()
    .then((questions) => {
      currentGame = Object.assign(INITIAL_GAME, {questions});
    })
    .then(() => {
      const introPage = new IntroductionPage();
      changeScreen(introPage);
    });
  }

  static showGreetingPage() {
    const greeting = new GreetingPage();
    changeScreen(greeting);
  }

  static showRulesPage() {
    const rules = new RulesPage();
    changeScreen(rules);
  }

  static startGamePage(name) {
    currentGame = Object.assign(INITIAL_GAME, {name});
    const gameData = new MainGamePage(new GameModel(currentGame));
    changeScreen(gameData.element);
    gameData.startGame();
  }

  static showStatisticPage(game) {
    FetchData.saveStatictic(game)
    .then(() => {
      FetchData.loadStatistic(game.name)
      .then((data)=>{
        const stats = new StatisticsPage(data);
        changeScreen(stats);
      });
    });
  }

  static showConfirmModal(interval) {
    const confirm = new ConfirmModal(interval);
    const body = document.querySelector(`body`);
    body.appendChild(confirm.element);
  }

  static showErrorModal() {
    const error = new ErrorModal();
    const body = document.querySelector(`body`);
    body.appendChild(error.element);
  }
}
