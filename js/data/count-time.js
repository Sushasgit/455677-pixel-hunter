export default class Counter {
  constructor(seconds = 30, element) {
    if (seconds <= 0) {
      throw new Error(`Seconds should not be negative or equal 0`);
    }
    this.seconds = seconds;
    this.element = element;
    this.counterContainer = null;
  }

  createCounterContainer() {
    const counterContainer = document.createElement(`div`);
    this.element.appendChild(counterContainer);
    this.counterContainer = counterContainer;
  }

  updateCount() {
    if (this.seconds) {
      --this.seconds;
    }
    return this.seconds;
  }

  startCount() {
    setInterval(() => this.updateCount(), 1000);
  }

  stopCount() {
    clearInterval(this.updateCount);
  }

  get currentTimer() {
    return this.seconds;
  }

  set currentTimer(val) {
    this.startCount();
    this.seconds = val;
  }
}

export const renderCounter = (element) => {
  const secondsCurrent = new Counter();
  secondsCurrent.element = element;
  secondsCurrent.startCount();
};
