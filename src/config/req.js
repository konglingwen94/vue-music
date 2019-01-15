import $ from 'zepto'
// const $ = require('exports?window.$!zepto')

function __getJson(url, option = {}) {
  // debugger
  return new Promise((resolve, reject) => {

    $.ajax({
      url,
      dataType: 'json',
      method: 'get',
      data: option,
      // timeout: 0,

      success(_res) {
        resolve(_res)
      },
      error(xhr, errType, err) {
        // (res)
        // debugger;
        reject(errType)
      },
    })
  })
}


function __jsonp(url, option = {}) {
  return new Promise((resolve, reject) => {
    // var _url = url;
    // debugger
    $.ajax({
      url,
      dataType: 'jsonp',
      data: option.params,
      jsonp: option.jsonp,
      jsonpCallback: option.jsonpCallback,
      success(res) {
        if (res.code == 0) {
          resolve(res)

        } else {
          reject('data error')
        }
      },
      error(xhr, errType, err) {
        reject(err)
      },
      // complete: 

    })
  })
}





export default {
  __getJson,
  __jsonp,
  // __getSingerPicUrl,
  // __get
}
// console.dir(_$)
