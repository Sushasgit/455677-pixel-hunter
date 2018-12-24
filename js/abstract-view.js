class AbstractView {
  constructor() {
    this._el = null;
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (!this._el) {
      this.render();
      this.bind();
    }
    return this._el;
  }
  render() {
    this._el = document.createElement(`div`);
    this._el.innerHTML = this.template;
  }

  bind() { }
}

export default AbstractView;
