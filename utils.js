import { isIOS, addClass, removeClass } from './validators'
export const debounce = (func, delay = 200) => {
  let timer = null

  return function(...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * @example ?id=1234&a=b
 * @return Object {id: 12345, a: b}
 */
export function urlParse() {
  const url = window.location.search
  const obj = {}
  const reg = /[?&][^?&]+=[^?&]+/g
  const arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach(item => {
      const tempArr = item.substring(1).split('=')
      const key = decodeURIComponent(tempArr[0])
      const val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

export function realPx(px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}

export function px2rem(px) {
  const ratio = 375 / 10
  return px / ratio
}

export const pageScroll = (function() {
  const fn = function(e) {
    e.preventDefault()
    e.stopPropagation()
  }
  let islock = false

  return {
    lock(el) {
      if (islock) return
      islock = true
      ;(el || document).addEventListener('touchmove', fn)
    },
    unlock(el) {
      islock = false
      ;(el || document).removeEventListener('touchmove', fn)
    }
  }
})()

export const preventScroll = (function() {
  return {
    lock(el) {
      isIOS && addClass(el || document.body, 'g-fix-ios-prevent-scroll')
    },
    unlock(el) {
      isIOS && removeClass(el || document.body, 'g-fix-ios-prevent-scroll')
    }
  }
})()

export const getScrollview = function(el) {
  let currentNode = el
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1
  ) {
    const overflowY = document.defaultView.getComputedStyle(currentNode)
      .overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

export const checkInview = function(scrollView, el) {
  const contentHeight =
    scrollView === window ? document.body.offsetHeight : scrollView.offsetHeight
  const contentTop =
    scrollView === window ? 0 : scrollView.getBoundingClientRect().top

  const post = el.getBoundingClientRect().top - contentTop
  const posb = post + el.offsetHeight

  return (
    (post >= 0 && post < contentHeight) || (posb > 0 && posb <= contentHeight)
  )
}

export const scrollTop = function(el, from = 0, to, duration = 500, callback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil((difference / duration) * 50)

  function scroll(start, end, step) {
    if (start === end) {
      typeof callback === 'function' && callback()
      return
    }

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}
