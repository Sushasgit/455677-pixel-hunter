import {SERVER_URL} from '../constants.js';
const toJSON = (res) => res.json();

export default class FetchData {
  static loadData() {
    return (
      fetch(`${SERVER_URL}/questions`)
      .then(toJSON)
      .then((data) => {
        return data;
      })
    );
  }
}
