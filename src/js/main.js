import './utils/detect-touch';
import getWinWidth from './utils/get-window-width';
import throttle from './utils/throttle';

console.log(getWinWidth());

/** @constant {number} */
var RESIZE_TIMEOUT = 100;

window.addEventListener('resize', throttle(function() {
  console.log(getWinWidth());
}, RESIZE_TIMEOUT));
