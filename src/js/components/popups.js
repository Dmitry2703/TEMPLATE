/**
 * @fileOverview Отображение всплывающих окон (попапов)
 * @author Dmitry Meshcheryakov
 */

import Popup from './popup';

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
