export default {
  togglePrev() {
    if (!this.songReady) {
      return
    }
     
    let index = this.currentIndex - 1;
    if (index == -1) {
      index = this.playlist.length - 1
    }
    this.setCurrentIndex(index)
    this.songReady = false
  },
  async togglePlaying() {

    this.playing && this.setPrevTransform()
    this.setPlayingState(!this.playing)
     
    this.currentLyric && this.currentLyric.togglePlay()



  },
  toggleNext() {
    if (!this.songReady) {
      return
    }

    let index = this.currentIndex + 1;
    if (index == this.playlist.length) {
      index = 0
    }
    this.setCurrentIndex(index)
    this.songReady = false


  },
}
