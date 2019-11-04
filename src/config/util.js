import _ from 'lodash'
import util from './req.js'
import * as methods from './methods.js'
import { querystring } from 'vux'
window._ = _

function direction() {
  document.addEventListener(
    'touchstart',
    function(e) {
      startx = e.touches[0].pageX
      starty = e.touches[0].pageY
    },
    false
  )
}

function mapKey({ prefix = '', suffix = '', obj }) {
  var keys = Object.keys(obj)
  var __obj = {}
  keys.forEach(key => {
    var newkey = prefix + key + suffix
    __obj[newkey] = obj[key]
  })

  return __obj
}
// console.log(_.prototype);
const FIX = '__'
export default {
  ...mapKey({ prefix: FIX, obj: $ }),
  ...mapKey({
    prefix: FIX,
    suffix: FIX,
    obj: _.prototype,
  }),
  ...mapKey({
    prefix: FIX,
    suffix: FIX,
    obj: _,
  }),
  ...util,
  ...methods,
  JSON,
  Math,
  randomFrom(lowerValue, upperValue) {
    return Math.floor(
      Math.random() * (upperValue - lowerValue + 1) + lowerValue
    )
  },
  formatTimer(num) {
    let min = Math.floor(num / 60)
    let sec = num % 60
    sec = _.padStart(String(sec), 2, 0)
    return `${min}:${sec}`
    // console.log(showMax);
  },
  /*
   * 解析matrix矩阵，0°-360°，返回旋转角度
   * 当a=b||-a=b,0<=deg<=180
   * 当-a+b=180,180<=deg<=270
   * 当a+b=180,270<=deg<=360
   *
   * 当0<=deg<=180,deg=d;
   * 当180<deg<=270,deg=180+c;
   * 当270<deg<=360,deg=360-(c||d);
   * */
  getmatrix(a, b, c, d, e, f) {
    var aa = Math.round((180 * Math.asin(a)) / Math.PI)
    var bb = Math.round((180 * Math.acos(b)) / Math.PI)
    var cc = Math.round((180 * Math.asin(c)) / Math.PI)
    var dd = Math.round((180 * Math.acos(d)) / Math.PI)
    var deg = 0
    if (aa == bb || -aa == bb) {
      deg = dd
    } else if (-aa + bb == 180) {
      deg = 180 + cc
    } else if (aa + bb == 180) {
      deg = 360 - cc || 360 - dd
    }
    return deg >= 360 ? 0 : deg
    //return (aa+','+bb+','+cc+','+dd);
  },
  getElRotate(selector) {
    var matrix = getComputedStyle($(selector)[0]).transform

    return eval('this.get' + matrix)
  },
  querystring,
}
