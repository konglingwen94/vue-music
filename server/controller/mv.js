const commonParams = require('../config/commonParams.js')
const path = require('path')
const request = require('request')
const qs = require('querystring')

exports.getHotMvList = function(req, res) {
  let query = req.query

  let data = {
    comm: { ct: 24 },
    mv_list: {
      module: 'MvService.MvInfoProServer',
      method: 'GetAllocMvInfo',
      param: {
        start: parseInt(query.offset),
        size: parseInt(query.limit),
        version_id: parseInt(query.version),
        area_id: parseInt(query.area),
        order: 1,
      },
    },
  }

  let params = Object.assign({},commonParams, {
    data: JSON.stringify(data),
  })
  var options = {
    method: 'GET',
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs: params,
    headers: {
      'cache-control': 'no-cache',
      referer: 'https://y.qq.com',
    },
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)

    res.end(body)
  })
}

exports.getMvTagList = function(req, res) {
  let query = req._parsedUrl.query
  query = qs.parse(query)
  // query = qs.stringify(query)
  let data = {
    comm: { ct: 24 },
    mv_tag: {
      module: 'MvService.MvInfoProServer',
      method: 'GetAllocTag',
      param: {},
    },
  }
  let params = Object.assign({},commonParams, {
    data: JSON.stringify(data),
  })

  var options = {
    method: 'GET',
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs: params,
    headers: {
      'cache-control': 'no-cache',
    },
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)

    res.end(body)
  })
}

exports.getMvPlayUrl = (req, res) => {
  const vids = req.query.vids

  const data = {
    getMvUrl: {
      module: 'gosrf.Stream.MvUrlProxy',
      method: 'GetMvUrls',
      param: { vids, request_typet: 10001 },
    },
  }

  var options = {
    method: 'GET',
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs: {
      data: JSON.stringify(data),
      ...commonParams,
    },
    headers: {
      'cache-control': 'no-cache',
    },
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)
    res.end(body)
  })
}

exports.getMvData = function(req, res) {
  let query = req.query

  let params = Object.assign(
    {},
    commonParams,
    {
      order: 'listen',
      cid: 205360581,
    },
    query
  )

  var options = {
    method: 'GET',
    url: 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg',
    qs: params,
    headers: {
      'cache-control': 'no-cache',
    },
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)

    res.end(body)
  })
}
