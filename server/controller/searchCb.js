const commonParams = require('../config/commonParams.js')
const qs = require('querystring')

const request = require('request')

exports.getHotKey = function(req, res) {
  request(
    {
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
      headers: {
        referer: 'http://y.qq.com',
      },
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.end(body)
      }
    }
  )
}

exports.getSongSearchResult = function(req, res) {
  let query = req._parsedUrl.query
  query = qs.parse(query)
  let params = Object.assign({}, commonParams, query)

  var options = {
    method: 'GET',
    url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',

    qs: params,
    headers: {
      referer: 'http://y.qq.com',

      'cache-control': 'no-cache',
    },
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)

    res.end(body)
  })
}
