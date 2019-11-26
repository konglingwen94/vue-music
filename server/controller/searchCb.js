const commonParams = require('../config/commonParams.js')
const qs = require('querystring')
const request = require('request')
const _ = require('lodash')
const { createSong } = require('../config')

const { getSongPlayUrl } = require('./musicPlayData')

exports.getHotKey = function(req, res) {
  request(
    {
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
      headers: {
        referer: 'http://y.qq.com',
      },
    },
    function(error, response, body) {
      console.log(response.toJSON())

      if (!error && response.statusCode == 200) {
        console.log(body)

        res.send(JSON.parse(body))
      }
    }
  )
}

exports.getSongSearchResult = function(req, res) {
  const query = {
    ...req.query,
    p: req.query.offset,
    n: req.query.limit,
  }
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

  request(options, async function(error, response, body) {
    if (error) throw new Error(error)

    try {
      var result = JSON.parse(body).data.song.list
    } catch (error) {}
    const url = await getSongPlayUrl(result.map(item => item.songmid))

    const searchResult = result
      .map(item => {
        item.purl = url[item.songmid]

        return createSong(item)
      })
      .filter(item => item.purl)

    res.json(searchResult)
  })
}
