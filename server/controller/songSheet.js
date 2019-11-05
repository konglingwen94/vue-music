const commonParams = require('../config/commonParams.js')
const path = require('path')
const request = require('request')
const qs = require('querystring')

exports.getCategoryTags = function(req, res) {
  request(
    {
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg',
      headers: {
        referer: 'http://y.qq.com',
      },
      qs: commonParams,
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.end(body)
      }
    }
  )
}
exports.getSongSheetList = function(req, res) {
  let params = Object.assign(
    {},
    commonParams,
    {
      picmid: '1',
      categoryId: '10000000',
      sortId: '5',
    },
    req.query
  )

  request(
    {
      url: `https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg`,
      headers: {
        referer: 'http://y.qq.com',
      },
      qs: params,
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.end(body)
      }
    }
  )
}

exports.getSongList = function(req, res) {
  let params = Object.assign(
    {},
    commonParams,
    {
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      ...req.query
    }
    // req.query
  )

  // https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg
  request(
    {
      url: `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg`,
      qs: params,
      headers: {
        referer: 'https://y.qq.com/',
        host: 'y.qq.com',
        // "content-type": "application/json",
      },
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.end(body)
      }
    }
  )
}
