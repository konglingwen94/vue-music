export default {
  togglePrev() {
    if (this.songReady) {
      if (!this.playing) {
        this.audio.play()
        this.setPlayingState(true)
      }
      let index = 0;
      if (this.currentIndex == 0) {
        index = this.playlist.length - 1
      } else {
        index = this.currentIndex - 1
      }
      this.setCurrentIndex(index)
      this.songReady = false
    }
  },
  async togglePlaying() {
    if (this.playing) {

      this.rotate = this.getCdRotate()
    }
    this.currentLyric && this.currentLyric.togglePlay()

    this.setPlayingState(!this.playing)

  },
  toggleNext() {
    if (this.songReady) {
      if (!this.playing) {
        this.audio.play()
        this.setPlayingState(true)
      }

      let index = 0;
      if (this.currentIndex == this.playlist.length - 1) {
        index = 0
      } else {
        index = this.currentIndex + 1
      }
      this.setCurrentIndex(index)
      this.songReady = false

    }

  },
}
