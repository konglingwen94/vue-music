const _ = require('lodash')

const songFields = [
  'picurl',
  'purl',
  'songid',
  'songmid',
  'albummid',
  'albumid',
  'singer',
  'url',
  'songname',
]

function getAlbumPicUrl(mid) {
  return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg?max_age=2592000`
}
function getSingerPicUrl(mid) {
  return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg`
}

function getSongUrl(purl) {
  return `http://dl.stream.qqmusic.qq.com/${purl}`
}

module.exports = {
  createSong(song) {
    const { albummid, singer, purl } = song
    song.picurl = {
      src: getAlbumPicUrl(albummid),
      error: getSingerPicUrl(singer[0].mid),
    }
    song.url = getSongUrl(purl)
    return _.pick(song, songFields)
  },

  createMv(item) {
    return _.pick(item, ['playurls', 'picurl', 'title', 'vid', 'singers'])
  },

  getAlbumPicUrl,
  getSingerPicUrl,

  getPicUrl({ albummid, singer }) {
    return {
      src: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`,
      error: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
        singer[0].mid
      }.jpg`,
    }
  },
}
