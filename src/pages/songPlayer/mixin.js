import { mapGetters } from 'vuex'
import MiniPlayer from './mini.vue'
import PlayList from './playlist.vue'
import Animation from 'create-keyframe-animation'
import playerControls from './play-control.js'
import playMode from '@/common/js/config'
import { shuffle } from '@/common/js/util'
import lyricParser from 'lyric-parser'
import { prefixStyle } from '@/config/dom'
const filter = prefixStyle('filter')
const transitionDuration = prefixStyle('transitionDuration')
const transform = prefixStyle('transform')

export default {
  name: '',
  data() {
    return {
      timeRanges: 0,
      curLyric: '',
      curLine: 0,
      currentLyric: null,
      currentTime: 0,
      duration: 0,
      isShowPlaylist: false,
      draging: false,
      waiting: false,
      currentShow: 'cd',
      songReady: false
    };
  },
  components: {
    PlayList,
    MiniPlayer
  },
  computed: {
    ...mapGetters([

      'miniPlayerHeight',
      'hasPlaylist',
      'singer',
      'playing',
      'fullScreen',
      'playlist',
      'sequenceList',
      'mode',
      'currentIndex',
      'currentSong'
    ]),
    middleStyle() {
      return { height: `${window.innerHeight/2}px` }
    },
    modeCls() {

      return this.mode === playMode.sequence ? 'icon-shunxubofang' : this.mode === playMode.loop ? 'icon-xunhuanbofang' : 'icon-bofangye-caozuolan-suijibofang'
    },
    favoriteCls() {
      return 'icon-shoucang'
    },
    percentProgress() {
      return Math.floor(this.currentTime / this.duration * 100)
    },
  },
  created() {
    this.movePos = {}

    this.initialed = false;
    this.touch = { blur: 40 };

    this.$swiper = null;
    // this.normalPlayerHeight = 0;
  },
  mounted() {
    this.$nextTick(() => {
      let height = $('.mini-player').height();
      this.miniHeight = height;

      this.setMiniPlayerHeight(height)
      this.audio = $('audio')[0];
      this.$refs.background.style[filter] = `blur(${this.touch.blur}px)`
      // 设置进度条缓冲进度高度
    })
    setTimeout(() => {
      console.log($('.middle-r').height(), this.$refs.scrollLyric)

    }, 1000)
  },
  watch: {
    playing(newplaying) {
      // debugger
      if (!this.songReady) {
        return
      }
      if (newplaying) {
        this.audio.play().catch(err => {
          console.log(err)
        });
        // this.currentLyric.play()
      } else {
        this.audio.pause()
        // this.currentLyric.stop()

      }
    },
    hasPlaylist(newHas) {
      newHas && this.setMiniPlayerHeight(this.miniHeight)
    },
    isShowPlaylist: function(newIsShow) {
      // body...
      if (newIsShow) {
        this.$nextTick(() => {

          // this.$refs.scrollPlaylist.refresh()
        })
      }

    },
    percentProgress(newTime) {

      if (!this.waiting && this.draging) {

        this.seek();
        this.lyricStop()
      }

    },
    currentLyric(newLyric, oldLyric) {
      // newLyric && 
      oldLyric && oldLyric.stop()

      // this.$refs.scrollLyric && this.$refs.scrollLyric.scrollTo(0, 0, 1000)
      this.curLyric = newLyric.lines[0].txt
    },
    fullScreen(newShow, oldShow) {
      // !newShow && this.setMiniPlayerHeight()

    },
    miniPlayerHeight(newHeight) {
      newHeight == 0 && this.lyricStop()
    },
    async currentSong(newSong, oldSong) {
      if (oldSong.id == newSong.id) {
        return
      }
      this.timeRanges = 0; //缓冲进度置零
      if (this.__isEmptyObject(newSong)) {
        this.setMiniPlayerHeight(this.miniHeight)
        // this.audio.paused && this.audio.play()
      } else {
        // 重置
        this.getLyric()
        this.resetStart()

        // 获取歌词

      }
    },

  },
  methods: {
    ...Vuex.mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlaylist: 'SET_PLAYLIST',
      setPlayMode: 'SET_PLAY_MODE',
      setMiniPlayerHeight: 'SET_MINI_PLAYER_HEIGHT'
    }),
    ...playerControls,
    enter(el, done) {
      if (this.__isEmptyObject(this.movePos)) {
        this.movePos = this._getPosAndScale()
        console.log(this.movePos)
      }
      const { x, y, scale } = this.movePos
      const animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.2)`

        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`

        }
      }
      Animation.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      Animation.runAnimation(this.$refs.cdWrap, 'move', done)
    },
    afterEnter() {
      Animation.unregisterAnimation('move')
      this.$refs.cdWrap.style.animation = ''
    },
    beforeLeave() {
      // console.log('beforeLeave')
    },
    leave(el, done) {
      const { x, y, scale } = this.movePos;
      this.$refs.cdWrap.style.transition = "all 1s"
      this.$refs.cdWrap.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      // console.dir(done)
      this.end = () => {
        // $('.normal-player').toggleClass('hidden')

        done()
      }
      this.$refs.cdWrap.addEventListener('transitionend', this.end)

    },
    afterLeave(el, done) {
      console.log('after-leave')
      this.$refs.cdWrap.style.transition = ""
      this.$refs.cdWrap.style[transform] = ""
      this.$refs.cdWrap.removeEventListener('transitionend', this.end)
    },
    _getPosAndScale() {
      const targetWidth = $('.mini-player .cd-wrap').width()
      const padLeft = $('.mini-player .cd-wrap').offset().left;
      const padBot = $('.mini-player .cd-wrap').position().top;
      const offset = $('.normal-player .cd-wrap').offset()
      const padTop = offset.top;
      const width = offset.width;
      const radiusDiff = (width + targetWidth) / 2
      const x = -(window.innerWidth - radiusDiff - padLeft)
      const y = window.innerHeight - padTop - padBot - radiusDiff
      const scale = targetWidth / width
      return { x, y, scale }
    },
    handleMore() {

    },
    onScrollEnd({ y }) {
      if (y === 0) {
        console.log(y)
        // debugger;
        this.scrollToCurrentLyric()
      }
    },
    middleTouchStart(e) {
      $('.middle-r').css('transition-duration', '0ms');
      $('.middle-l').css('transition-duration', '0ms')
      $('.background').css('transition-duration', '0ms')
      // this.touch = { blur: 40 };
      this.touch.blurRadio = this.touch.blur;
      const touch = e.touches[0]
      this.touch.ismoved = false

      this.touch.initiated = true;
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
      this.touch.left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
      console.log(this.touch)
    },
    middleTouchMove(e) {
      if (this.touch.initiated) {
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const deltaY = e.touches[0].pageY - this.touch.startY;
        if (Math.abs(deltaX) < Math.abs(deltaY / 2) || Math.abs(deltaX) < 3) {
          this.touch.ismoved = false
          return
        } else {
          this.touch.ismoved = true

        }
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, this.touch.left + deltaX))

        this.touch.percent = Math.abs(offsetWidth / window.innerWidth);

        const blur = this.currentShow === 'cd' ? Math.max(5, Math.min(this.touch.blur, (1 - this.touch.percent) * this.touch.blur)) : Math.min(40, (1 - this.touch.percent) * this.touch.blur + 5)
        $('.middle-l').css({ opacity: 1 - this.touch.percent })
        $('.middle-r').css({ transform: `translate3d(${offsetWidth}px,0,0)` })

        // 设置背景模糊
        // $('.background').css({ filter: `blur(${blur}px)` })
        this.$refs.background.style[filter] = `blur(${blur}px)`

      }
    },
    middleTouchEnd() {

      if (this.touch.ismoved === false) {
        return
      }
      const percent = 0.2;
      let offsetWidth = 0;
      let opacity = 0;
      let blur = 5;
      if (this.currentShow === 'cd') {
        if (this.touch.percent > percent) {
          this.currentShow = 'lyric'
          offsetWidth = -window.innerWidth;
        } else {
          opacity = 1;
          blur = this.touch.blur
        }
      } else {
        // console.log()
        if (this.touch.percent < 1 - percent) {
          // opacity = 1;
          // offsetWidth = 0;
          opacity = 1;
          blur = this.touch.blur

          this.currentShow = 'cd'
        } else {
          offsetWidth = -window.innerWidth;

        }
      }
      $('.middle-r').css({ transform: `translate3d(${offsetWidth}px,0,0)`, transitionDuration: '300ms' })
      $('.middle-l').css({ opacity, transitionDuration: '300ms' })
      this.$refs.background.style[filter] = `blur(${blur}px)`
      this.$refs.background.style[transitionDuration] = `500ms`
      // this.touch.percent = 0
    },
    play() {
      if (!this.playing) {
        this.togglePlaying()
      }

    },
    onProgressChange(currentTime) {
      this.draging = false
      this.currentTime = currentTime
      this.seek()
      if (this.timeRanges > currentTime) {
        this.isBuffered = true;
      } else {
        this.isBuffered = false;

      }
      this.audio.currentTime = currentTime
      this.play()
    },
    resetStart() {

      this.currentTime = 0;
      this.curLine = 0;
      this.resetCdTransform()
      this.$refs.scrollLyric && this.$refs.scrollLyric.scrollTo(0, 0, 300)
      // if (this.playMode.loop !== this.mode) {

      // this.timeRanges = 0;
      // }
      // this.scrollToCurrentLyric()
    },
    onemptied() {
      console.log('onemptied')

    },
    onloadstart() {
      this.isBuffered = false
      this.waiting = true;
      console.log('onloadstart')
    },
    onstalled() {
      console.log('onstalled')

    },
    onloadeddata() {
      console.log('onloadeddata')

    },
    onloadedmetadata() {
      console.log('onloadedmetadata')
      this.duration = Math.round(this.audio.duration)

    },
    onprogress(e) {
      const timeRanges = this.audio.buffered
      this.timeRanges = timeRanges.end(0)
      if (Math.ceil(this.timeRanges) >= this.duration) {
        // this.isBuffered = true
        console.log(timeRanges.end(0))
      }
    },
    onplaying() {
      if (this.playing && !this.draging) {
        // this.seek()
        this.currentLyric && this.currentLyric.play(this.audio.currentTime * 1000)
      } else {
        this.audio.pause()
      }

    },
    onwaiting() {
      if (this.isBuffered) {
        return
      }
      this.waiting = true
      if (this.playend) {
        // return
      }
      console.log('onwaiting')
      this.setPrevTransform()
      this.lyricStop()
    },
    resetCdTransform() {
      $('.cd-wrap').css({ transform: `rotate(0)` })
      this.$nextTick(() => {

        $('audio')[0].volume = 0.1;
      })

    },
    handleClick() {},
    setPrevTransform() {
      var cdTransform = getComputedStyle(this.$refs.cd).transform;
      // console.log(cdTransform)
      var wrapTransform = getComputedStyle(this.$refs.cdWrap).transform;
      var transform = wrapTransform == 'none' ? cdTransform : wrapTransform.concat(' ', cdTransform)
      this.$nextTick(() => {

        $('.cd-wrap').css({ transform })
      })


    },
    lyricStop() {
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
    },
    seek() {
      this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
      this.draging && this.lyricStop()
    },
    async getLyric() {
      var lyric = '',
        param = { id: this.currentSong.id };
      if (this.currentSong.lrc !== undefined) {
        lyric = await this.__get(`http://${domain}:3000/getBLyric`, param);
        // console.log(lyric)

      } else {

        lyric = await this.currentSong.getLyric();
      }
      this.currentLyric = new lyricParser(lyric, this.handleLyric);
      this.songReady && this.currentLyric.play()

    },
    handleLyric({ lineNum, txt }) {
      if (this.curLine == lineNum) {
        // console.log('===');
        return
      }
      // console.log('!=');

      this.curLine = lineNum;
      this.curLyric = txt;
      this.scrollToCurrentLyric()
    },
    scrollToCurrentLyric() {
      let lineEl = this.$refs.lyricLine && this.$refs.lyricLine[this.curLine]

      this.$refs.scrollLyric.scrollToElement(lineEl, 1000, true, true)

    },
    changeMode() {
      var mode = (this.mode + 1) % 3;
      var list = null,
        message = '';
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
        message = '随机播放'
      } else {
        if (mode === playMode.loop) {
          message = '循环播放'

        } else {
          message = '顺序播放'

        }
        list = this.sequenceList
      }

      this.Toast({
        message,
        // duration: 2000
      });
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
      this.setPlayMode(mode)
    },
    resetCurrentIndex(list) {
      var index = list.findIndex(item => {
        return item.id == this.currentSong.id;

      })
      this.setCurrentIndex(index)
    },
    oninput(currentTime) {
      if (!this.draging) {

        this.draging = true
        this.lyricStop()

      }
      this.currentTime = currentTime

    },
    loop() {

      // setTimeout(() => {
      // this.songReady = false
      // }, 0)
      // this.setPrevTransform()
      console.log('end loop')

      // this.curLine = 0
      // this.scrollToCurrentLyric()
      // debugger;
      this.songReady = false
      this.resetStart()
      setTimeout(() => {
        this.songReady = true
        // $('.cd').toggleClass('rotate')

      }, 100)
      this.audio.currentTime = 0;
      if (this.audio.paused) {
        this.audio.play()

      }
    },
    onended() {

      this.mode === playMode.loop ? this.loop() : this.toggleNext()
    },
    deleteList() {
      this.setPlaylist([])
      this.setMiniPlayerHeight(0)

      this.setPlayingState(false)
      // this.$nextTick(() => {})
      // }
    },
    onupdateTime(e) {
      // if (this.touch && !this.touch.touchstart) {
      if (!this.draging) {

        this.currentTime = Math.round(e.target.currentTime)
      }
    },
    oncanplay() {
      console.log('canplay')

      if (this.isBuffered) {
        return
      }
      // console.log(`  waiting--${this.waiting}  `, `  songReady--${this.songReady}`)

      this.waiting = false;
      this.songReady = true;


    },
    onerror() {

      console.log('onerror')
      this.toggleNext()
    },
    onabort() {
      // console.log('onabort')
    },
    oncanplaythrough() {
      this.play()

      // console.log('oncanplaythrough')
    },
    back() {
      if (this.isShowPlaylist) {
        this.isShowPlaylist = false;
      }
      // await this.closer;
      // console.log('setFullScreen')
      this.setFullScreen(false)
    },

  },
  open() {
    this.setFullScreen(true)

  },
};
