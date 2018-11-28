export default class Counter {
  constructor(seconds = 30, element) {
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
    this.counterContainer.innerHTML = this.seconds;
  }

  startCount() {
    this.createCounterContainer();
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
