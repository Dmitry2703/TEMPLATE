/**
 * @fileOverview Отображение всплывающих окон (попапов)
 * @author Dmitry Meshcheryakov
 */

import Popup from './popup';

let popups = document.querySelectorAll('.popup');
popups = Array.prototype.slice.call(popups);

popups = popups.map(function(item) {
  return new Popup(item);
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
