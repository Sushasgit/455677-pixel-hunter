class AbstractView {
  constructor() {
    this.el = null;
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (!this.el) {
      this.render();
      this.bind();
    }
    return this.el;
  }
  render() {
    this.el = document.createElement(`div`);
    this.el.innerHTML = this.template;
  }

  bind() { }
}

export default AbstractView;
