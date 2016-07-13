/**
 * @fileOverview Отображение тултипов
 * @author Dmitry Meshcheryakov
 */

import Tooltip from './tooltip';

let tooltips = document.querySelectorAll('.tooltip');
tooltips = Array.prototype.slice.call(tooltips);

tooltips = tooltips.map(function(item) {
  return new Tooltip(item);
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
