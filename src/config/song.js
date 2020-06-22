import request from './req'
import remoteUrl from './remoteUrl.js'

export class __Song {
  constructor({
    url = '',
    picurl,
    songid,
    songmid,
    albumid,
    albummid,
    songname,
    singer,
  }) {
    this.id = songid
    this.mid = songmid
    this.name = songname
    this.singer = format(singer)
    this.url = url
    this.picurl = picurl
    this.albummid = albummid
    this.albumid = albumid
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    var _this = this

    return request
      .__getJson('/getLyric', { musicid: this.id })
      .then(function(body) {
        return normalizeLyric(body.lyric)
      })
      .catch(() => 'No Lyric')
  }
}
 

function format(singer_arr) {
  // body...
  var singer = []
  singer_arr.forEach(item => {
    singer.push(item.name)
  })
  return singer.join(' / ')
}

function normalizeLyric(lyric) {
  // body...
  var $el = $('<div>' + lyric + '</div>')
  return $el.html()
}

export default {
  __Song,
  __format: format,
}
