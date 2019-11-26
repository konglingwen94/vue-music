const commonParams = require('../config/commonParams.js')
const request = require('request')
const { createSong } = require('../config')
const { getSongPlayUrl } = require('./musicPlayData')

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

  const musicData = new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) {
        reject(error)
      } else {
        try {
          resolve(JSON.parse(body).data.list.map(item => item.musicData))
        } catch (error) {
          reject(error)
        }
      }
    })
  })

  musicData.then(async list => {
    const mids = list.map(item => item.songmid)
    const playurl = await getSongPlayUrl(mids)

    const response = list
      .map(item => {
        item.purl = playurl[item.songmid]
        return createSong(item)
      })
      .filter(item => item.purl)

    res.json(response)
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
    console.log(JSON.parse(body))
    res.send(body)
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

    res.send(body)
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
        albumID: parseInt(albumID),
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

  request(options, async (err, response, body) => {
    if (err) return
    try {
      body = JSON.parse(body).albumSonglist.data.songList.map(
        item => item.songInfo
      )
    } catch (error) {}
    const url = await getSongPlayUrl(body.map(item => item.mid))

     
    body = body.map(item => {
      item.purl = url[item.mid]
      item.songid=item.id
      item.songmid=item.mid
      item.songname = item.name
      return createSong(item)
    })
    .filter(item => item.purl)
    res.json(body)
  })
}

exports.getTotalInfo = async (req, res) => {
  const { singermid } = req.query
  console.log(singermid)
  let musicParams = Object.assign(
    {},
    commonParams,
    {
      format: 'json',
      order: 'listen',
      songstatus: '1',
    },
    { singermid, num: 1 }
  )

  const musicPromise = new Promise((resolve, reject) => {
    request(
      {
        url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
        qs: musicParams,
      },
      (error, response, body) => {
        if (error) reject(error)
        try {
          resolve({ name: 'music', total: JSON.parse(body).data.total })
        } catch (error) {
          reject(error)
        }
      }
    )
  })

  let data = {
    singerAlbum: {
      method: 'get_singer_album',
      param: {
        singermid,
        order: 'time',
        begin: 0,
        num: 1,
        exstatus: 1,
      },
      module: 'music.web_singer_info_svr',
    },
  }
  let albumParams = Object.assign({}, commonParams, {
    data: JSON.stringify(data),
  })

  const albumPromise = new Promise((resolve, reject) => {
    request(
      {
        url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        qs: albumParams,
      },
      (error, response, body) => {
        if (error) reject(new Error(error))

        try {
          const total = JSON.parse(body).singerAlbum.data.total
          resolve({ name: 'album', total })
        } catch (error) {
          reject(error)
        }
      }
    )
  })

  let mvParams = Object.assign(
    {},
    commonParams,
    {
      order: 'listen',
      cid: 205360581,
    },
    { singermid, num: 1 }
  )

  const mvPromise = new Promise((resolve, reject) => {
    request(
      {
        url: 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg',
        qs: mvParams,
      },
      function(error, response, body) {
        if (error) reject(new Error(error))
        try {
          resolve({ name: 'singerMv', total: JSON.parse(body).data.total })
        } catch (error) {
          reject(error)
        }
      }
    )
  })

  try {
    var result = await Promise.all([musicPromise, albumPromise, mvPromise])
  } catch (error) {}

  res.json(result)
}
