import {changeScreen} from './utils.js';
import IntroPage from './pages/introduction.js';
import GreetingPage from './pages/greeting.js';
import RulesPage from './pages/rules.js';
import StatsPage from './pages/statistic.js';
import ConfirmModal from './views/confirm-modal.js';
import GameModel from './GameModal.js';
import FetchData from './api/FetshData.js';
import ErrorModal from './views/error-modal.js';
import MainGamePage from './pages/mainGame.js';

import {INITIAL_GAME} from './constants.js';
let currentGame = {};

export default class App {

  static showIntroPage() {
    FetchData.loadData()
    .then((questions) => {
      currentGame = Object.assign(INITIAL_GAME, {questions});
    })
    .then(() => {
      const introPage = new IntroPage();
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
        const stats = new StatsPage(data);
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
