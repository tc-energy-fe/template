const debounce = function (fn, delay = 1000) {
  let timer = null

  const _debounce = function (...args) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }

  _debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return _debounce
}

/**
 * eg:
 *
 * <input oninput="func(event)"/>
 *
 * var func = debounce(function(event) {
 *   console.log(this, event.target.value)
 * }, 500)
 * */

export default debounce
