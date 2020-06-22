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

export function prefixStyle(style, camelCase = false) {
  // body...
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  if (camelCase === true) {
    return _.camelCase(vendor + _.upperFirst(style))
  }
  return '-' + vendor + '-' + style
}
