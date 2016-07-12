/**
 * @fileOverview Переключение табов
 * @author Dmitry Meshcheryakov
 */

let tabs = document.querySelectorAll('.tabs__link');
tabs = Array.prototype.slice.call(tabs);

let tabsPanes = document.querySelectorAll('.tabs-pane');
tabsPanes = Array.prototype.slice.call(tabsPanes);

document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('tabs__link')) {
    var clickedTab = evt.target.getAttribute('data-tab');

    tabs.forEach(function(item) {
      item.classList.remove('is-active');
      if (item.getAttribute('data-tab') === clickedTab) {
        item.classList.add('is-active');
      }
    });

    tabsPanes.forEach(function(item) {
      item.classList.remove('is-active');
      if (item.id === clickedTab) {
        evt.target.classList.add('is-active');
        item.classList.add('is-active');
      }
    });
  }
});
