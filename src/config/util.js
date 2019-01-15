import _ from 'lodash'
import util from './req.js'
import * as methods from './methods.js'

window._ = _


function mapKey({ prefix = '', suffix = '', obj }) {
  var keys = Object.keys(obj)
  var __obj = {};
  keys.forEach(key => {
    var newkey = prefix + key + suffix;
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
    obj: _.prototype
  }),
  ...mapKey({
    prefix: FIX,
    suffix: FIX,
    obj: _
  }),
  ...util,
  ...methods,
  JSON,
  Math,
  randomFrom(lowerValue, upperValue) { return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue); }
}
