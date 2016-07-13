/**
 * @fileOverview Компонента всплывающего окна
 * @author Dmitry Meshcheryakov
 */

export default class Popup {
  /**
   * Класс Popup
   * @constructor
   * @param  {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.id = this.element.id;
    this._closeButton = this.element.querySelector('.popup__close');
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  /**
   * Показ всплывающего окна
   */
  show() {
    document.documentElement.classList.add('popup-open');
    this.element.classList.add('open');
    this._closeButton.addEventListener('click', this._onCloseClick);
    window.addEventListener('keydown', this._onDocumentKeyDown);
    if (document.documentElement.classList.contains('no-touch')) {
      document.addEventListener('click', this._onClickOutside);
    } else {
      document.addEventListener('touchstart', this._onClickOutside);
    }
  }

  /**
   * Скрытие всплывающего окна
   */
  hide() {
    document.documentElement.classList.remove('popup-open');
    this.element.classList.remove('open');
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
    if (document.documentElement.classList.contains('no-touch')) {
      document.removeEventListener('click', this._onClickOutside);
    } else {
      document.removeEventListener('touchstart', this._onClickOutside);
    }
  }

  /**
   * Обработчик клика вне всплывающего окна
   * @param  {Event} evt
   * @private
   */
  _onClickOutside(evt) {
    if (evt.target === this.element) {
      this.hide();
      evt.preventDefault();
    }
  }

  /**
   * Обработчик клика по крестику
   * @private
   */
  _onCloseClick() {
    this.hide();
  }

  /**
   * Обработчик клавиатурных событий
   * @param  {KeyboardEvent} evt
   * @private
   */
  _onDocumentKeyDown(evt) {
    if (evt.keyCode === 27) {
      this.hide();
    }
  }
}
