const request = require('request')
const qs = require('querystring')
exports.get = function(url, options) {
  http.get()
}
let params = {
  g_tk: 1088114871,
  uin: 794430774,
  format: 'json',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1,
  new_format: 1,
  pic: 500,
  disstid: 2686401584,
  type: 1,
  json: 1,
  utf8: 1,
  onlysong: 0,
  nosign: 1

}
let search = qs.stringify(params)
url = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?_=1544870274280&${search}`
 
request({
  url,
  // method: "POST",
  // json: true,
  // body: search,
  headers: {
    'referer': 'https://y.qq.com/',
    'host': 'y.qq.com'
    // "content-type": "application/json",
  }
}, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印google首页
    // res.end(body)
  }
})
