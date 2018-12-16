import {MAX_TIME, Answer} from '../constants.js';

export default class Counter {
  constructor(seconds = MAX_TIME, element) {
    if (seconds <= 0) {
      throw new Error(`Seconds should not be negative or equal 0`);
    }
    this.seconds = seconds;
    this.element = element;
    this.counterContainer = null;
    this.getCurrentTime = null;
  }

  updateCount() {
    if (this.seconds) {
      --this.seconds;
    }
    if (this.element) {
      const timer = `00:${this.seconds}`;
      if (this.seconds <= 5) {
        this.element.classList.add(`game__timer--blink`);
      }
      this.element.innerHTML = timer;
    }
    return this.seconds;
  }

  startCount() {
    this.counterContainer = setInterval(() => this.updateCount(), 1000);
  }

  getAnswerTime(time = 30) {
    let answerTime = null;
    if (time >= 0 && time <= 10) {
      answerTime = Answer.SLOW;
    } else if (time > 10 && time < 20) {
      answerTime = Answer.NORMAL;
    } else if (time > 20) {
      answerTime = Answer.FAST;
    }
    return answerTime;
  }

  stopCount() {
    clearInterval(this.counterContainer);
  }

  get currentTimer() {
    return this.seconds;
  }

  set currentTimer(val) {
    this.startCount();
    this.seconds = val;
  }
}
