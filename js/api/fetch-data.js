import App from '../app.js';
import {SERVER_URL, APPLICATION_ID} from '../constants.js';
const toJSON = (res) => res.json();

export default class FetchData {
  static loadData() {
    return (
      fetch(`${SERVER_URL}/questions`)
      .then(toJSON)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        App.showErrorModal();
        throw new Error(`Что-то пошло не так` + err.message);
      })
    );
  }

  static saveStatictic(game) {
    const options = {
      body: JSON.stringify(game),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/:${APPLICATION_ID}-:${game.name}`, options)
    .catch((err) => {
      App.showErrorModal();
      throw new Error(`Что-то пошло не так` + err.message);
    });
  }

  static loadStatistic(userName) {
    return (
      fetch(`${SERVER_URL}/stats/:${APPLICATION_ID}-:${userName}`)
      .then(toJSON)
        .catch((err) => {
          App.showErrorModal();
          throw new Error(`Что-то пошло не так` + err.message);
        })
    );
  }
}
