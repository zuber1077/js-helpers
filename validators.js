export const isBrowser = typeof window !== 'undefined'

export const isMobile = value => {
  value = value.replace(/[^-|\d]/g, '')
  return (
    /^((\+251)|(251))?(1)\d{10}$/.test(value) || /^0[0-9-]{9,12}$/.test(value)
  )
}

export const isIOS = isBrowser
  ? !!((navigator && navigator.userAgent) || '').match(
      /\(i[^;]+;( U;)? CPU.+Mac OS X/
    )
  : null

export function isAndroid() {
  return isBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : null
}

export const isObj = x => {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

export const isDef = value => {
  return value !== undefined && value !== null
}

export const range = (num, min, max) => {
  return Math.min(Math.max(num, min), max)
}

export const isColor = function(value) {
  const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/
  const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/
  const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/

  return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value)
}

export const hasClass = function(el, cls) {
  cls = cls || ''
  if (cls.replace(/\s/g, '').length === 0 || !el) return false
  return new RegExp(' ' + cls + ' ').test(' ' + el.className + ' ')
}

export const addClass = function(el, cls) {
  if (!hasClass(el, cls)) {
    el.className = el.className === '' ? cls : el.className + ' ' + cls
  }
}

export const removeClass = function(el, cls) {
  if (hasClass(el, cls)) {
    let newClass = ' ' + el.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    el.className = newClass.replace(/^\s+|\s+$/g, '')
  }
}