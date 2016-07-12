/**
 * @fileOverview Отображение меню
 * @author Dmitry Meshcheryakov
 */

import Menu from './menu';

let menu = new Menu();

let menuToggle = document.querySelector('.js-menu-toggle');
menuToggle.addEventListener('click', function() {
  menu.switch();
});
