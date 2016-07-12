/**
 * @fileOverview Отображение тултипов
 * @author Dmitry Meshcheryakov
 */

import Tooltip from './tooltip';

let tooltipsParents = document.querySelectorAll('.element-with-tooltip');
tooltipsParents = Array.prototype.slice.call(tooltipsParents);

let tooltips = tooltipsParents.map(function(item) {
  return new Tooltip(item.lastElementChild);
});

// touch-devices
if (!document.documentElement.classList.contains('no-touch')) {
  document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('element-with-tooltip')) {
      tooltips.forEach(function(item) {
        if (item.parent === evt.target) {
          item.show();
        }
      });
    }
  });
}
