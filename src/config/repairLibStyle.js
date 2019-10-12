import { getEvenNum } from './methods.js'
import { __ROOT_SIZE } from './config.js'

window.onload = function(argument) {
  // body...
  eachStyleSheets(findRepairStyleSheets())
}

function setFontSize(style) {
  // body...
  // 获取字体rem
  var rem = parseFloat(style.fontSize)
  // 获取像素实际偶数值
  var size = getEvenNum(rem * __ROOT_SIZE)
  // 设置元素字体大小
  console.log(style.fontSize)
  style.fontSize = `${size}px`
  console.log('set font-size:', size, 'px')
}

function setBorderWidth(style) {
  // body...
  // 获取字体rem
  var rem = parseFloat(style.fontSize)
  // 获取像素实际偶数值
  var size = getEvenNum(rem * __ROOT_SIZE)
  // 设置元素字体大小
  style.fontSize = `${size}px`
}

function eachStyleSheets(sheets) {
  // body...
  Array.from(sheets).forEach(sheet => {
    try {
      if (sheet.cssRules) {
        eachCssRules(sheet.cssRules)
      }
    } catch (err) {
      console.error(err)
    }
  })
}

function eachCssRules(cssRules) {
  // body...
  Array.from(cssRules).forEach(rule => {
    if (rule && rule.style) {
      findFontSize(rule.style)
    }
  })
}

function findFontSize(style) {
  // body...
  if (style.fontSize && style.fontSize.endsWith('rem')) {
    // console.log(style.fontSize);
    setFontSize(style)
  }
}

// function findLinkStyle(sheets) {
//   // body...
//   Array.from(sheets).filter(item => {
//     return item.href !== 'http://at.alicdn.com/t/font_1018470_6rirve0gtqr.css'
//   })
// }

function findRepairStyleSheets() {
  return Array.from(document.styleSheets).filter(item => {
    return item.href !== 'http://at.alicdn.com/t/font_1018470_6rirve0gtqr.css'
  })
}
