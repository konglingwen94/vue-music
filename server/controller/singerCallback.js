const commonParams = require('../config/commonParams.js')
const path = require('path')
const request = require('request')

exports.getMusicData = function(req, res) {
  let params = Object.assign(
    {},
    commonParams,
    {
      format: 'json',
      order: 'listen',
      songstatus: '1',
    },
    req.query
  )

  var options = {
    method: 'GET',
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
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

exports.getAlbumData = function(req, res) {
  const query = req.query
  // query = qs.stringify(query)
  let data = {
    singerAlbum: {
      method: 'get_singer_album',
      param: {
        singermid: query.singermid,

        order: 'time',
        begin: +query.begin || 0,
        num: +query.num || 0,
        exstatus: 1,
      },
      module: 'music.web_singer_info_svr',
    },
  }
  let params = Object.assign({}, commonParams, {
    data: JSON.stringify(data),
  })
  // console.log(JSON.stringify(params))
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

exports.getMvData = function(req, res) {
  const query = req.query
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

exports.getAlbumSongList = (req, res) => {
  const { albumMid, albumID, begin, num } = req.query

  const data = {
    comm: { ct: 24, cv: 10000 },
    albumSonglist: {
      method: 'GetAlbumSongList',
      param: {
        albumMid,
        albumID:parseInt(albumID),
        begin: parseInt(begin),
        // num: parseInt(num),
        order: 2,
      },
      module: 'music.musichallAlbum.AlbumSongList',
    },
  }

  const qs = Object.assign({}, commonParams, {
    data: JSON.stringify(data),
  })

  const options = {
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs,
    headers: {
      referer: 'https://y.qq.com',
    },
  }
   

  request(options, (err, response, body) => {
    if (err) return
    res.end(body)
  })
}
