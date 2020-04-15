/**
 * Throttle a function so it doesn't run too frequently
 * @param {Function} fn Function to wait
 * @param {Number} wait Length of time to wait in ms
 */
function throttle(fn, wait) {
  var time = Date.now();
  return function (ev) {
    if ((time + wait - Date.now()) < 0) {
      fn.apply(ev);
      time = Date.now();
    }
  }
}

/**
 * Watch an el to see if it gets into view
 * @param {HTMLElement} el Element to watch
 * @param {Function} func Function to call when element scrolls into view
 * @returns {Function}
 */
export const watchEl = (el, func = () => {}) => {
  const scrollListener = ev => {
    const elBoundingBox = el.getBoundingClientRect()
    
    if (elBoundingBox.y - (window.innerHeight / 3) < window.innerHeight) func()
  }

  document.addEventListener('scroll', throttle(scrollListener, 400))

  return scrollListener
}