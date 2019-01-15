import remoteUrl from './remoteUrl.js'
// console.log(remoteUrl.__albumImg)
export class __Song {
  constructor({ songid, songmid, albummid, songname, singer }) {
    this.id = songid;
    this.mid = songmid;
    this.name = songname;
    this.singer = format(singer);
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



export default {
  __Song
}
