<template>
  <div class="player"  >
    <!-- 全屏播放 -->
    <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div v-show="fullScreen" :class="['normal-player','fullScreenFixed']">
        <div class="top">
          <mt-header class="mt-top" :title="currentSong.name">
            <div slot="left" class="back" @click="back">
              <i class="cubeic-select"></i>
            </div>
            <mt-button @click="showVolume" icon="more" slot="right"></mt-button>
          </mt-header>
          <div class="subtitle">
            <span>{{currentSong.singer}}</span>
          </div>
        </div>
        <!-- 背景图 -->
        <div :class="['background',{currentShow:currentShow==='lyric'}]" ref="background">
          <img :key="currentSong.id" width="100%" height="100%" :src="currentSong.pic" />
        </div>
        <!-- 中间左右轮播 -->
        <div
          :style="middleStyle"
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend.prevent="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <transition name="cd">
              <div :key="currentSong.id" class="cd-container">
                <div class="cd-wrap" ref="cdWrap">
                  <img
                    ref="cd"
                    :class="['cd',{rotate:playing && !waiting && songReady}]"
                    :key="currentSong.pic"
                    v-lazy="currentSong.picurl"
                  />
                </div>
              </div>
            </transition>
            <transition name="toggle">
              <div class="curLyric-wrapper" :key="currentSong.id">
                <transition name="current">
                  <p class="ellipsis curLyric-text" :key="curLyric">{{curLyric}}</p>
                </transition>
              </div>
            </transition>
          </div>
          <!--滚动歌词 -->
          <div ref="middleR" class="middle-r">
            <my-loading v-show="currentLyric===null"></my-loading>
            <cube-scroll
              @scroll-end="onScrollEnd"
              :scroll-events="['scroll-end']"
              local
              ref="scrollLyric"
              v-if="currentLyric && currentLyric.lines.length>0"
              :data="currentLyric && currentLyric.lines"
              class="scroll-lyric"
            >
              <div class="lyric-wrapper">
                <p
                  ref="lyricLine"
                  :key="index"
                  :class="[{current:index==curLine},'lyricLine','ellipsis']"
                  v-for="(line,index) in currentLyric.lines"
                >{{line.txt}}</p>
              </div>
            </cube-scroll>
            <div
              class="lyric-error"
              v-if="currentLyric && currentLyric.lines.length===0"
            >{{errLyric}}</div>
          </div>
        </div>
        <!-- 指示器 -->
        <div key="dots" class="dots-wrap">
          <div :class="['dot',{active:currentShow==='cd'}]"></div>
          <div :class="['dot',{active:currentShow==='lyric'}]"></div>
        </div>
        <!-- 底部 -->
        <div key="bottom" class="bottom">
          <!-- 播放显示 -->
          <div class="play-progress">
            <div :class="['currentTimer',{draging}]" slot="start">
              <span>{{formatTimer(currentTime)}}</span>
            </div>
            <progress-bar
              ref="progress"
              v-if="showProgressBar"
              :timeRanges="curRange.range"
              @input="oninput"
              @progressChange="onProgressChange"
              :duration="duration"
              :currentTime="currentTime"
              class="progress-bar"
            ></progress-bar>
            <div class="totalTimer" slot="end">{{formatTimer(duration)}}</div>
          </div>
          <!-- 播放控制 -->
          <div class="player-control YCenter flex Around">
            <p @click="changeMode" class="flex Center playMode">
              <i :class="[modeCls,'iconfont']"></i>
            </p>
            <p @click="togglePrev" class="toggle-prev">
              <i class="iconfont icon-icon-"></i>
            </p>
            <p @click="togglePlaying" class="toggle-playing flexCenter">
              <span v-show="!waiting">
                <i v-show="!playing" :class="['iconfont' ,'icon-bofang2']"></i>
                <i v-show="playing" :class="['iconfont' ,'icon-zanting']"></i>
              </span>
              <mt-spinner color="#ffcd32" v-show="waiting" :size="20*__DPR" type="fading-circle"></mt-spinner>
            </p>
            <p @click="toggleNext" class="toggle-next">
              <i class="iconfont icon-xiayishou-yuanshijituantubiao"></i>
            </p>
            <p class="favorite flex Center">
              <i :class="['iconfont',favoriteCls]"></i>
            </p>
          </div>
        </div>
        <!-- 声音提示 -->
        <volume
          :radio="curRange.radio"
          @toggleRadio="onToggleRadio"
          @input="onVolumeInput"
          @operate="onOperate"
          ref="volume"
        ></volume>
      </div>
    </transition>
    <!-- 播放内核 -->
    <div class="playAudio">
      <audio
        @pause="onpause"
        @play="onplay"
        @emptied="onemptied"
        @abort="onabort"
        @error="onerror"
        @canplaythrough="oncanplaythrough"
        @stalled="onstalled"
        @loadstart="onloadstart"
        @loadeddata="onloadeddata"
        @loadedmetadata="onloadedmetadata"
        @waiting="onwaiting"
        @playing="onplaying"
        @progress="onprogress"
        @timeupdate="onupdateTime"
        @ended="onended"
        :src="currentSong.url"
        @canplay="oncanplay"
        ref="audio"
        autoplay
      ></audio>
    </div>
    <!-- 吸底播放器 -->
    <transition @enter="miniEnter">
      <div
        v-if="hasPlaylist"
        v-show="!fullScreen"
        @click="open"
        class="flex mini-player border-top-1px"
      >
        <div class="cd-wrap" ref="miniCdWrap">
          <img
            ref="miniCd"
            :class="['cd',{rotate:playing && !waiting}]"
            :key="currentSong.id"
            v-lazy="currentSong.picurl"
          />
        </div>
        <div class="text YCenter">
          <div class="text-wrap flex">
            <p class="title ellipsis">{{currentSong.name}}</p>--&nbsp;
            <!-- <div class="singer-wrap"> -->
            <p class="singer ellipsis">{{currentSong.singer}}</p>
          </div>
          <div class="curLyric-wrapper" :key="currentSong.id">
            <transition name="current">
              <p class="ellipsis curLyric-text" :key="curLyric">{{curLyric}}</p>
            </transition>
          </div>
          <!-- </div> -->
        </div>
        <div class="playing-control">
          <div class="circle-progress" @click.stop="togglePlaying">
            <x-circle
              :trail-width="3"
              trail-color="#aaaaaa"
              :percent="percentProgress"
              :stroke-width="5"
              stroke-color="#04BE02"
            >
              <!-- <span>{{ percent }}%</span> -->
              <i :class="['iconfont' ,{'icon-bofang2':!playing,'icon-zanting':playing}]"></i>
            </x-circle>
          </div>
        </div>
        <div @click.stop="showPlaylist" class="playlist-icon">
          <i class="iconfont icon-bofangliebiao"></i>
        </div>
      </div>
    </transition>
    <!-- 当前播放列表 -->
    <play-list ref="playlist"></play-list>
  </div>
</template>
<script type="text/javascript">
import PlayList from './playlist.vue'
import Volume from './volume.vue'
import Animation from 'create-keyframe-animation'
import playerControls from './play-control.js'
import mixin from './mixin.js'
import playMode from '@/common/js/config'
import { shuffle } from '@/common/js/util'
import lyricParser from 'lyric-parser'
import { prefixStyle } from '@/config/dom'
const filter = prefixStyle('filter')
const transitionDuration = prefixStyle('transition-duration')
const transform = prefixStyle('transform')
const curRange = { radio: 96, range: 0 }

export default {
  name: '',
  mixins: [mixin],
  data() {
    return {
      // muted: false,
      curRange,
      // timeRanges: [curRange],
      curLyric: '',
      curLine: 0,
      currentLyric: null,
      currentTime: 0,
      duration: 0,
      isShowPlaylist: false,
      draging: false,
      waiting: false,
      currentShow: 'cd',
      songReady: false,
      showProgressBar: false
    }
  },
  components: {
    PlayList,
    Volume
  },
  computed: {
    ...Vuex.mapGetters([
      'miniPlayerHeight',
      'hasPlaylist',
      'singer',
      'playing',
      'fullScreen',
      'mode'
    ]),
    middleStyle() {
      return { height: `${window.innerHeight / 2}px` }
    },
    favoriteCls() {
      return 'icon-shoucang'
    },
    percentProgress() {
      return Math.floor((this.currentTime / this.duration) * 100)
    },
    errLyric() {
      const han = /[\u4e00-\u9fa5]+/g
      const ret = this.currentLyric.lrc.match(han)
      console.log(ret)
      if (!ret) {
        return '暂无歌词'
      }

      return ret && ret.join && ret.join()
    }
  },
  created() {
    this.initialed = false
    this.touch = { blur: 40 }
  },
  mounted() {
    this.$nextTick(() => {
      // 获取mini进度条高度
      this.audio = $('audio')[0]
      this.$refs.background.style[filter] = `blur(${this.touch.blur}px)`
      // 设置进度条缓冲进度高度
    })
  },
  watch: {
    curRange(newR, oldR) {
      this.oldRange = oldR
    },
    volume() {
      this.audio.volume = this.volume
    },
    currentIndex(newIndex, oldIndex) {
      // console.log(newIndex, oldIndex);
      this.oldIndex = oldIndex
    },
    playing() {
      // debugger
      if (!this.songReady) {
        return
      }
      this.playing
        ? this.audio.play().catch(err => {
            console.log(err)
          })
        : this.audio.pause()
    },
    hasPlaylist(newHas) {
      newHas
        ? this.setMiniPlayerHeight(this.miniHeight)
        : this.setMiniPlayerHeight(0)
    },
    percentProgress(newTime) {
      if (!this.waiting && this.draging) {
        this.seek()
        this.lyricStop()
      }
    },
    fullScreen(newVal, oldVal) {
      if (!this.showProgressBar) {
        this.showProgressBar = true
      }
    },
    miniPlayerHeight(newHeight) {
      newHeight == 0 && this.lyricStop()
    },
    async currentSong(newSong, oldSong) {
      if (this.__isEmptyObject(newSong)) {
        this.audio.src = ''
        return
      }
      if (oldSong.id == newSong.id) {
        return
      }
      if (this.$refs.progress) {
        this.$refs.progress.transition = 'all .2s'
      }

      // this.radio = 96;
      this.curRange = { radio: 96, range: 0 } //缓冲进度置零
      this.currentLyric && this.currentLyric.stop()
      this.currentLyric = null
      // 获取歌词
      this.getLyric()
      // 重置
      this.resetStart()
    }
  },
  methods: {
    ...Vuex.mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setMiniPlayerHeight: 'SET_MINI_PLAYER_HEIGHT'
    }),
    ...playerControls,
    onToggleRadio({ value: radio }) {
      const selectItem = { range: 0, radio }

      this.oldUrl = this.audio.src
      // this.oldRadio = this.radio;
      this.curRange = selectItem
      const url = this.parse(this.currentSong.url)

      url.br = radio
      const _url = this.unescape(this.stringify(url))
      // console.log(_url);
      this.audio.src = _url
      this.audio.currentTime = this.currentTime
    },
    onOperate(isMuted) {
      this.audio.muted = isMuted
    },
    onVolumeInput(val) {
      this.volume = val
      this.audio.volume = val / 100
    },
    showVolume() {
      this.$refs.volume.show()
    },
    showPlaylist() {
      this.$refs.playlist.show()
    },
    getMovePos() {
      if (
        this.__isEmptyObject(this.movePos) ||
        Object.values(this.movePos).includes(0)
      ) {
        this.movePos = this._getPosAndScale()
      }
    },
    async miniEnter(el, done) {
      // console.log('miniEnter')
      setTimeout(done, 400)
      await this.$nextTick()
      // const wrapTransform = getComputedStyle(this.$refs.cdWrap).transform;
      // return
      let transform = this.playing
        ? this.wrapTransform.concat(' ', this.cdTransform)
        : this.wrapTransform
      // }
      // console.log(transform);

      $(this.$refs.miniCdWrap).css({ transform })
    },
    async enter(el, done) {
      await this.$nextTick()
      let wrapTransform = getComputedStyle(this.$refs.miniCdWrap).transform
      let cdTransform = getComputedStyle(this.$refs.miniCd).transform

      wrapTransform = wrapTransform === 'none' ? '' : wrapTransform

      cdTransform = cdTransform === 'none' ? '' : cdTransform

      this.transform = wrapTransform.concat(' ', cdTransform)
      $(this.$refs.cd).css({ transform: this.transform })
      // console.log(transform);

      this.getMovePos()
      const { x, y, scale } = this.movePos
      this.duration = 400
      let rotate = this.playing ? (this.duration / 1000 / 20) * 360 : 0
      const animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale}) rotate(0)`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.3)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1) rotate(${rotate}deg)`
        }
      }
      Animation.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: this.duration,
          easing: 'linear'
        }
      })
      Animation.runAnimation(this.$refs.cdWrap, 'move', done)
    },
    afterEnter() {
      $(this.$refs.cd).css({ transform: '' })
      $(this.$refs.cdWrap).css({
        transform: this.transform.concat(' rotate(0deg)'),
        animation: ''
      })

      Animation.unregisterAnimation('move')
    },

    async leave(el, done) {
      console.log('leave')

      await this.$nextTick()

      // console.log(transform);
      if (!this.miniPlayerHeight) {
        this.miniHeight = $('.mini-player').height()
        this.setMiniPlayerHeight(this.miniHeight)
      }
      this.getMovePos()

      const { x, y, scale } = this.movePos

      this.end = done
      this.$refs.cdWrap.addEventListener('transitionend', done)

      this.$refs.cdWrap.style.transition = `all ${this.duration}ms`

      const wrapTransform = getComputedStyle(this.$refs.cdWrap).transform
      this.cdTransform = getComputedStyle(this.$refs.cd).transform
      this.wrapTransform = wrapTransform === 'none' ? '' : wrapTransform

      this.$refs.cdWrap.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale}) ${this.wrapTransform}`

      // this.$refs.cdWrap.style.zIndex = 500;
    },
    afterLeave(el, done) {
      // console.log('after-leave')
      this.$refs.cdWrap.style.transition = ''
      // this.$refs.cdWrap.style.zIndex = 500;
      this.$refs.cdWrap.style[transform] = ''
      this.$refs.cdWrap.removeEventListener('transitionend', this.end)
    },
    _getPosAndScale() {
      const targetWidth = $('.mini-player .cd-wrap').width()
      const padLeft = this.$refs.miniCdWrap.getBoundingClientRect().left
      const padBot = $('.mini-player .cd-wrap').position().top
      const offset = this.$refs.cdWrap.getBoundingClientRect()
      const padTop = offset.top
      const width = offset.width
      // const radiusDiff = (width + targetWidth) / 2
      const x = -(window.innerWidth / 2 - targetWidth / 2 - padLeft)
      const y =
        window.innerHeight - padTop - padBot - width / 2 - targetWidth / 2
      const scale = targetWidth / width
      // console.log(padLeft, padTop, padBot, width, targetWidth, offset)

      return { x, y, scale }
    },
    onScrollEnd({ y }) {
      if (y === 0) {
        // console.log(y)
        this.scrollToCurrentLyric()
      }
    },
    middleTouchStart(e) {
      const touch = e.touches[0]
      this.touch.blurRadio = this.touch.blur
      this.touch.ismoved = false

      this.touch.initiated = true
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
      this.touch.left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      // console.log(this.touch)
    },
    middleTouchMove(e) {
      if (this.touch.initiated) {
        const deltaX = e.touches[0].pageX - this.touch.startX
        const deltaY = e.touches[0].pageY - this.touch.startY
        if (Math.abs(deltaX) < Math.abs(deltaY / 3) || Math.abs(deltaX) < 3) {
          this.touch.ismoved = false
          return
        } else {
          this.touch.ismoved = true
        }
        const offsetWidth = Math.min(
          0,
          Math.max(-window.innerWidth, this.touch.left + deltaX)
        )

        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)

        const blur =
          this.currentShow === 'cd'
            ? Math.max(
                5,
                Math.min(
                  this.touch.blur,
                  (1 - this.touch.percent) * this.touch.blur
                )
              )
            : Math.min(40, (1 - this.touch.percent) * this.touch.blur + 5)
        $('.middle-l').css({ opacity: 1 - this.touch.percent })
        $('.middle-r').css({ transform: `translate3d(${offsetWidth}px,0,0)` })

        // 设置背景模糊
        $('.background').css(filter, `blur(${blur}px)`)
      }
    },
    middleTouchEnd() {
      console.log(this.touch.percent)
      if (
        this.touch.ismoved === false ||
        this.touch.percent === 0 ||
        this.touch.percent === 1
      ) {
        return
      }
      const percent = 0.2
      let offsetWidth = 0
      let opacity = 0
      let blur = 5
      if (this.currentShow === 'cd') {
        if (this.touch.percent > percent) {
          this.currentShow = 'lyric'
          offsetWidth = -window.innerWidth
        } else {
          opacity = 1
          blur = this.touch.blur
        }
      } else {
        if (this.touch.percent < 1 - percent) {
          opacity = 1
          blur = this.touch.blur

          this.currentShow = 'cd'
        } else {
          offsetWidth = -window.innerWidth
        }
      }
      const delay = '300ms'
      $('.middle-r')
        .css({
          transform: `translate3d(${offsetWidth}px,0,0)`,
          transitionDuration: delay
        })
        .bind('transitionend', function() {
          $(this)
            .css(transitionDuration, '')
            .unbind('transitionend')
        })
      $('.middle-l')
        .css({ opacity, transitionDuration: delay })
        .bind('transitionend', function() {
          $(this)
            .css(transitionDuration, '')
            .unbind('transitionend')
        })
      // console.log(transitionDuration, filter);

      $('.background')
        .css(filter, `blur(${blur}px)`)
        .css(transitionDuration, delay)
        .bind('transitionend', function() {
          $(this)
            .css(transitionDuration, '')
            .unbind('transitionend')
        })
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

      this.isBuffered = this.curRange.range > currentTime
      this.audio.currentTime = currentTime
      this.play()
    },
    resetStart() {
      this.currentTime = 0
      this.curLine = 0
      this.resetCdTransform()
      this.$refs.scrollLyric && this.$refs.scrollLyric.scrollTo(0, 0, 300)
    },
    onemptied() {
      // console.log('onemptied')
      this.setPlayingState(false)
    },
    onloadstart() {
      this.isBuffered = false
      this.waiting = true
      // console.log('onloadstart')
    },
    onstalled() {
      // console.log('onstalled', this.audio.error, this.audio.networkState)
    },
    onabort() {
      // console.log('onabort', this.audio.error, this.audio.networkState)
    },
    onloadeddata() {
      // console.log('onloadeddata')
    },
    onloadedmetadata() {
      // console.log('onloadedmetadata')
      this.duration = Math.round(this.audio.duration)
    },
    onprogress(e) {
      try {
        const timeRanges = this.audio.buffered
        // console.log(timeRanges)
        if (timeRanges) {
          this.curRange.range = timeRanges.end(timeRanges.length - 1)
        }
      } catch (err) {
        console.error(err)
      }
    },
    onplaying() {
      if (this.playing && !this.draging) {
        // this.seek()
        this.currentLyric &&
          this.currentLyric.play(this.audio.currentTime * 1000)
      } else {
        this.audio.pause()
      }
    },
    onwaiting() {
      if (this.isBuffered) {
        return
      }
      this.waiting = true
      this.setPrevTransform()
      this.lyricStop()
    },
    resetCdTransform() {
      $('.cd-wrap').css({ transform: `rotate(0)` })
    },
    setPrevTransform() {
      const wrapperEl = this.fullScreen
        ? this.$refs.cdWrap
        : this.$refs.miniCdWrap
      const cdEl = this.fullScreen ? this.$refs.cd : this.$refs.miniCd
      // console.log(cdTransform)
      if (!wrapperEl || !cdEl) {
        return
      }
      const cdTransform = getComputedStyle(cdEl).transform
      const wrapTransform = getComputedStyle(wrapperEl).transform
      const transform =
        wrapTransform === 'none'
          ? cdTransform
          : wrapTransform.concat(' ', cdTransform)
      // console.log(transform);
      this.$nextTick(() => {
        $(wrapperEl).css({ transform })
      })
    },
    lyricStop() {
      this.currentLyric && this.currentLyric.stop()
    },
    seek() {
      this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
      this.draging && this.lyricStop()
    },
    async getLyric() {
      var lyric = '',
        param = { id: this.currentSong.id }

      lyric = await this.currentSong.getLyric()

      this.currentLyric = new lyricParser(lyric, this.handleLyric)

      if (this.currentLyric.lines.length > 0) {
        this.curLyric = this.currentLyric.lines[this.curLine].txt
        this.songReady && this.currentLyric.play()
      } else if (lyric.split('\n').length > 2) {
        this.currentLyric.lines = lyric.split('\n').map(txt => ({ txt }))
        this.$nextTick(() => {
          this.lyricStop()
          this.curLine = -1
        })
      }
    },
    handleLyric({ lineNum, txt }) {
      if (this.curLine == lineNum) {
        return
      }

      this.curLine = lineNum
      this.curLyric = txt
      this.scrollToCurrentLyric()
    },
    scrollToCurrentLyric() {
      let lineEl = this.$refs.lyricLine && this.$refs.lyricLine[this.curLine]

      this.$refs.scrollLyric.scrollToElement(lineEl, 1000, true, true)
    },
    oninput(currentTime) {
      if (!this.draging) {
        this.draging = true
        this.lyricStop()
      }
      this.currentTime = currentTime
    },
    loop() {
      // console.log('end loop')

      this.songReady = false
      this.resetStart()
      setTimeout(() => {
        this.songReady = true
      }, 100)
      this.audio.currentTime = 0
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
    },
    onupdateTime(e) {
      if (!this.draging) {
        this.currentTime = Math.round(e.target.currentTime)
      }
    },
    oncanplay() {
      // console.log('canplay')

      if (this.isBuffered) {
        return
      }

      this.waiting = false
      this.songReady = true
    },
    onerror() {
      // console.log(this.audio.error, this.audio.networkState)
      if (this.audio.networkState === 3) {
        // this.audio.src = this.oldUrl
        this.curRange = this.oldRange
        this.audio.currentTime = this.currentTime

        this.Toast({
          message: '无此音质',
          duration: 2000
        })
        return
      }
      this.songReady = true
      this.oldIndex > this.currentIndex ? this.togglePrev() : this.toggleNext()
    },
    onpause() {
      this.setPlayingState(false)
    },
    onplay() {
      this.setPlayingState(true)
    },
    oncanplaythrough() {
      this.play()
    },
    back() {
      if (this.isShowPlaylist) {
        this.isShowPlaylist = false
      }
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    }
  }
}
</script>
<style scoped lang="less">
@import './transition.less';
@import './animate-rotate.less';
@height: 60vh;

.background {
  z-index: -1;
  opacity: 0.6;
  position: fixed;
  top: 0px;
  bottom: 0;
  right: 0;
  left: 0;

  transition-property: filter;
  
}

.player {
   
  position: relative;
  z-index: 90;
}

.normal-player {
  height: 100vh;
  background: #444;
  animation-duration: 6s !important;

  .top {
    .mt-top {
      background: transparent;

      .back {
        font-size: 30px;
      }
    }

    .subtitle {
      text-align: center;
      color: #fff;
    }
  }

  .middle {
    margin-top: 20px;
    .flexXCenter;
    height: 50vh;
    width: 200vw;
     
    position: relative;

    & > [class^='middle'] {
      width: 50%;
       
    }

    
    .middle-l {
      .cd-container {
        width: 260px;
        height: 260px;
        margin: auto;

        // 转动光盘
        .cd-wrap {
          img.cd {
            width: 100%;
            height: 100%;
            border: 16px solid hsla(0, 0%, 100%, 0.1);
          }
        }
      }

      // 当前歌词
      .curLyric-wrapper {
        .font-dpr(8px); /* no  */

        height: 26px;
        overflow: hidden;
        text-align: center;
        position: fixed;
        top: 360px;
        z-index: 10;
        width: 100%;
        padding: 0 30px;
        color: hsla(0, 0%, 100%, 0.5);

        .curLyric-text {
          
          padding: 5px 0;
          height: 100%;
        }
      }
    }

    .middle-r {
      height: 100%;

      .my-loading {
        top: 40%;
        color: #fff;
      }

      .scroll-lyric {
        text-align: center;

        .lyricLine {
          padding: 0 30px;
          margin-bottom: 16px;
          .font-dpr(8px); /* no  */

          color: hsla(130, 30%, 100%, 0.5);

          &:first-child {
            padding: 0 80px;
          }

          &.current {
            color: #fff;
          }
        }
      }

      .lyric-error {
        text-align: center;
        margin-top: 200px;
        color: #fff;
      }
    }
  }

  .dots-wrap {
    position: fixed;
    bottom: 120px;
    width: 100%;
  
    .flexXCenter;

    .dot {
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: #ccc;
      opacity: 0.6;

      &:first-child {
        margin-right: 5px;
      }

      &.active {
        width: 14px;
        border-radius: 5px;
        background: #fff;
        opacity: 0.9;
      }
    }
  }

  .spinner-wrapper {
    position: relative;
    z-index: 50;
  }

  .bottom {
    position: fixed;
    bottom: 30px;
    width: 100vw;

    .play-progress {
       
      .flexBetween;
      align-items: center;
      width: 100%;
      padding: 0 20px;

      .progress-bar {
        margin: 0 12px;
      }

      color: #fff;

      .currentTimer {
         

        &.draging {
          color: #ffcd32;
           
          transform: scale(1.3);
        }
      }

      
    }

    .player-control {
      margin-top: 20px;
      color: #ffcd32;

      .toggle-playing,
      .favorite,
      .playMode {
        border: 2px solid;
        border-radius: 50%;
        width: 36px;
        height: 36px;

        .iconfont {
          font-size: 26px;
        }
      }

      .toggle-playing {
        width: 46px;
        height: 46px;

        .iconfont {
          font-size: 32px;
        }
      }
    }
  }
}

.playlist {
  position: fixed;
  width: 100vw;
  background: lightgreen;
  z-index: 100;

  .title-wrap {
    padding: 12px;

     
    .icon {
      font-size: 24px;
    }

    .playMode-wrapper {
      margin-left: 20px;
    }

    .delete-wrapper {
      margin-left: auto;
    }
  }
}

.mini-player {
  align-items: center;
  padding: 0 8px;
  height: 66px !important;

  .cd-wrap {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .text {
    margin: 0 10px;
    width: 55%;

    .text-wrap {
      margin-bottom: 6px;

      .title {
        width: 60%;
      }

      .singer {
        width: 32%;
      }
    }

    .curLyric-wrapper {
      height: 30px;
      overflow: hidden;
      color: gray;
      margin-bottom: -6px;

      .curLyric-text {
        padding: 6px 0;
      }
    }
  }

  .playing-control {
    margin-left: auto;

    .circle-progress {
      width: 42px !important;
      height: 42px !important;
    }
  }

  .playlist-icon {
    margin-left: 14px;

    .iconfont {
      font-size: 34px;
    }

     
  }

  z-index: 40;
  position: fixed;
  bottom: 0px;
  height: 70px;
  width: 100%;
  background: pink;
}

.iconfont {
  font-size: 42px;
}
</style>
 
