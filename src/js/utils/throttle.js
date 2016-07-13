/**
 * @fileOverview Throttle function
 */

/**
 * @param {Function} fn
 * @param {number} timeout
 * @return {Function}
 */
export default function throttle(fn, timeout) {
  return function() {
    clearTimeout(fn._timeoutID);
    fn._timeoutID = setTimeout(fn, timeout);
  };
}
