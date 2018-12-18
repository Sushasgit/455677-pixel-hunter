import AbstractView from '../AbstractView';
import App from '../App.js';
import GameModel from '../GameModal.js';

export default class ConfirmModal extends AbstractView {
  static getGameModel() {
    this.gameModel = new GameModel();
  }
  get template() {
    return `
        <section class="modal">
            <form class="modal__inner">
            <button class="modal__close cancel" type="button">
                <span class="visually-hidden">Закрыть</span>
            </button>
            <h2 class="modal__title">Подтверждение</h2>
            <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
            <div class="modal__button-wrapper">
                <button type="button" class="modal__btn confirm">Ок</button>
                <button type="button" class="modal__btn cancel">Отмена</button>
            </div>
            </form>
        </section>`;
  }

  bind() {
    const confirm = this.element.querySelector(`.confirm`);
    const cancelButtons = this.element.querySelectorAll(`.cancel`);
    const body = document.querySelector(`body`);

    confirm.addEventListener(`click`, () => {
      App.showRulesPage();
      body.removeChild(this.element);
    });

    cancelButtons.forEach((button) => {
      button.addEventListener(`click`, () => {
        body.removeChild(this.element);
      });
    });
  }

  onClickNext() {}
}
