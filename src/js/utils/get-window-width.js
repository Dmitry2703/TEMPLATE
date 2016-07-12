/**
 * @fileOverview Cross-browser width check
 */

export default function getWinWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
