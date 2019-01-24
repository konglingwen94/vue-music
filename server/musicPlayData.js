const request = require('request');
const qs = require('querystring');
const commonParams = require('./commonParams.js')

exports.getMusicPlayData = function(req, res) {
  // let query = req._parsedUrl.query;
  let query = req._parsedUrl.query;
  query = qs.parse(query).mid;
  query = query.split(',');
  // console.log(query)
  const songParams = {
    "req": {
      "module": "vkey.GetVkeyServer",
      "method": "CgiGetVkey",
      "param": {
        "guid": "5165714425",
        "songmid": [
          "000Qepff3UyUWO",
          "001Qu4I30eVFYb",
          "001TXSYu1Gwuwv",
          "004VBMk71TdUuR",
          "004dADLe4ec8RG",
          "001CG3wA3QkuJS",
          "000QwTVo0YHdcP",
          "003v4UL61IYlTY",
          "002BWGZQ2UKjKn",
          "004PTqgl1ctBPM",
          "001hUNRP0P8g7x",
          "0032ZOkm0LBgHW",
          "003TfyNp47dm7E",
          "001RlxZp1xwoNK",
          "000QCwge3B6Ad1"
        ],
        "songtype": [],
        "uin": "0",
        "loginflag": 0,
        "platform": "23",
        "h5to": "speed"
      }
    },
    "comm": {
      "g_tk": 5381,
      "uin": 0,
      "format": "json",
      "ct": 23,
      "cv": 0
    }
  }
  songParams.req.param.songmid = query
  request({
    method: 'POST',
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?_=1547563489720',
    headers: {
      'referer': 'http://u.y.qq.com'
    },
    // body: songParams
    body: JSON.stringify(songParams)
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.end(body)
      // console.log(body)
    }
  })
}
// exports.getMusicPlayData()
exports.getLyric = function(req, res) {
  // body...
  var query = req._parsedUrl.query;
  var musicid = qs.parse(query).musicid;
  var options = {
    url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
    headers: {
      'referer': 'http://y.qq.com'
    },
    qs: { ...commonParams,
      nobase64: 1,
      musicid,
      songtype: 0
    }
  };
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var reg = /^\w+\(({[^()]+})\)$/;
      var matches = body.match(reg);
      var ret = matches[1]
      res.end(ret)
      // console.log(body)
    }
  })
}
