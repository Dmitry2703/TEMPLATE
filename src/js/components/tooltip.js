/**
 * @fileOverview Компонента тултипа
 * @author Dmitry Meshcheryakov
 */

import getWinWidth from '../utils/get-window-width';
import '../lib/closest';

/**
 * Максимальная ширина мобильного экрана
 * @const {Number}
 */
const MOBILE_WIDTH = 767;

export default class Tooltip {
  /**
   * Класс Tooltip
   * @constructor
   * @param  {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.parent = this.element.parentNode;
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  /**
   * Показ тултипа
   */
  show() {
    document.documentElement.classList.add('tooltip-open');
    this.parent.classList.add('_open');
    if (document.documentElement.classList.contains('no-touch')) {
      document.addEventListener('click', this._onClickOutside);
    } else {
      document.addEventListener('touchstart', this._onClickOutside);
    }
  }

  /**
   * Скрытие тултипа
   */
  hide() {
    document.documentElement.classList.remove('tooltip-open');
    this.parent.classList.remove('_open');
    if (document.documentElement.classList.contains('no-touch')) {
      document.removeEventListener('click', this._onClickOutside);
    } else {
      document.removeEventListener('touchstart', this._onClickOutside);
    }
  }

  /**
   * Обработчик клика вне тултипа
   * @param  {Event} evt
   * @private
   */
  _onClickOutside(evt) {
    if (getWinWidth() <= MOBILE_WIDTH) {
      if (evt.target === this.element) {
        this.hide();
        evt.preventDefault();
      }
    } else {
      if (evt.target !== this.element && evt.target.closest('.tooltip') !== this.element) {
        this.hide();
      }
    }
  }
}
