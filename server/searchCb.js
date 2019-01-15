const request = require('request');

exports.getHotKey = function(req, res) {
  request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    headers: {
      'referer': 'http://y.qq.com'
    },
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.end(body)
    }
  })
}
