/**
 * @fileOverview Компонента всплывающего окна
 * @author Dmitry Meshcheryakov
 */

class Popup {
  /**
   * Класс Popup
   * @constructor
   * @param  {string} id
   */
  constructor(id) {
    this.id = id;
    this.overlay = document.querySelector('#' + id + '.popup');
    this._closeButton = this.overlay.querySelector('.popup__close');
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  /**
   * Показ всплывающего окна
   */
  show() {
    document.documentElement.classList.add('popup-open');
    this.overlay.classList.add('open');
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
    this.overlay.classList.remove('open');
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
    if (evt.target === this.overlay) {
      this.hide();
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

let popupToggles = document.querySelectorAll('[data-toggle="popup"]');
popupToggles = Array.prototype.slice.call(popupToggles);

let popups = popupToggles.map(function(item) {
  return new Popup(item.getAttribute('data-target'));
});

document.addEventListener('click', function(evt) {
  if (evt.target.hasAttribute('data-toggle')) {
    popups.forEach(function(item) {
      if (item.id === evt.target.getAttribute('data-target')) {
        item.show();
      }
    });
  }
});
