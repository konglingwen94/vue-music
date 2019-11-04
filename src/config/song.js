import request from './req'
import remoteUrl from './remoteUrl.js'

export class __Song {
  constructor({ songid, songmid, albumid, albummid, songname, singer }) {
    this.id = songid
    this.mid = songmid
    this.name = songname
    this.singer = format(singer)
    // this.url = url;
    this.pic = remoteUrl.__albumImg(albummid)
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
// export const getPlayUrl = async function(mids) {
//   // var mids

//   return new Promise((resolve, reject) => {
//     request(
//       {
//         method: 'POST',
//         url: remoteUrl.__SONG_URL,
//         headers: {
//           referer: 'http://u.y.qq.com',
//         },
//         body: songParams,
//       },
//       function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//           resolve(body)
//         } else {
//         }
//       }
//     )
//   })
// }

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
