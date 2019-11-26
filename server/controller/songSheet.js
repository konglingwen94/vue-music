const commonParams = require('../config/commonParams.js')
const path = require('path')
const request = require('request')
 
const { createSong } = require('../config')
const { getSongPlayUrl } = require('./musicPlayData')

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
        res.send(body)
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
        res.send(body)
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
      ...req.query,
    }
    
  )

  
  request(
    {
      url: `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg`,
      qs: params,
      headers: {
        referer: 'https://y.qq.com/',
        host: 'y.qq.com',
        
      },
    },
    async function(error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          body = JSON.parse(body).cdlist[0].songlist
        } catch (error) {}
        const url = await getSongPlayUrl(body.map(item => item.songmid))

        res.json(
          body
            .map(item => {
              item.purl = url[item.songmid]
              
              return createSong(item)
            })
            .filter(item => item.purl)
        )
      }
    }
  )
}
