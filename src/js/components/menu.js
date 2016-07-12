/**
 * @fileOverview Компонента меню
 * @author Dmitry Meshcheryakov
 */

import '../lib/closest';

export default class Menu {
  /**
   * Класс Menu
   * @constructor
   */
  constructor() {
    this.el = document.querySelector('.menu');
    this.toggle = document.querySelector('.js-menu-toggle');
    this._onClickOutside = this._onClickOutside.bind(this);
    this._switchSubmenu = this._switchSubmenu.bind(this);
  }

  /**
   * Открытие/закрытие меню
   */
  switch() {
    if (!this.el.classList.contains('open')) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.el.classList.add('open');
    if (document.documentElement.classList.contains('no-touch')) {
      document.addEventListener('click', this._onClickOutside);
    } else {
      document.addEventListener('touchstart', this._onClickOutside);
    }
    this.el.addEventListener('click', this._switchSubmenu);
  }

  hide() {
    this.el.classList.remove('open');
    if (document.documentElement.classList.contains('no-touch')) {
      document.removeEventListener('click', this._onClickOutside);
    } else {
      document.removeEventListener('touchstart', this._onClickOutside);
    }
    this.el.removeEventListener('click', this._switchSubmenu);
  }

  /**
   * Закрытие меню по клику вне его
   * @param  {Event} evt
   */
  _onClickOutside(evt) {
    if (evt.target !== this.el && evt.target.closest('.menu') !== this.el && evt.target !== this.toggle && evt.target.closest('.js-menu-toggle') !== this.toggle) {
      this.hide();
    }
  }

  /**
   * Открытие/закрытие подменю
   * @param  {Event} evt
   */
  _switchSubmenu(evt) {
    if (evt.target.classList.contains('menu__link')) {
      var submenuToShow = evt.target.nextElementSibling;
      if (submenuToShow) {
        var subMenus = this.el.querySelectorAll('.submenu');
        subMenus = Array.prototype.slice.call(subMenus);
        subMenus.forEach(function(item) {
          if (item !== submenuToShow) {
            item.classList.remove('open');
          }
        });
        submenuToShow.classList.toggle('open');
      }
    }
  }
}
