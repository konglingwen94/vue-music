const elementStyle = document.createElement('div').style

const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  // body...
  if (style[vendor] === false) {
    return false
  }
  if (style[vendor] === style) {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
// Vue.prototype.prefixStyle = prefixStyle
