<template>
  <div class="player">
    <!-- 全屏播放 -->
    <div :class="['normal-player',{hidden:!fullScreen}]">
      <div class="top">
        <mt-header class="mt-top" :title="currentSong.name">
          <div slot="left" class="back" @click="back">
            <i class="cubeic-select"></i>
          </div>
        </mt-header>
        <div class="subtitle">
          <span>{{currentSong.singer}}</span>
        </div>
      </div>
      <!-- 背景图 -->
      <div :class="['background']" ref="background">
        <img :key="currentSong.albummid" width="100%" height="100%" :src="currentSong.picUrl">
      </div>
        <!-- 中间左右轮播 -->
        <div :style="middleStyle" class="middle" @touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove" @touchend.prevent="middleTouchEnd">
          <!-- <mt-swipe ref="swiper" prevent :auto="0" :continuous="false"> -->
          <div class='middle-l'>
            <div class="cd-wrap" ref="cdWrap">
              <img ref="cd" :class="['cd',{rotate:playing && !waiting && songReady}]" :key="currentSong.albummid" v-lazy="currentSong.picUrl" />
              </div>
              <div class="curLyric-wrapper">
                <p class="ellipsis">{{curLyric}}</p>
              </div>
            </div>
            <!--滚动歌词 -->
            <div class="middle-r" :style="{}">
              <cube-scroll @scroll-end="onScrollEnd" :scroll-events="['scroll-end']" local ref="scrollLyric" v-if="currentLyric && currentLyric.lines.length>0" :data="currentLyric && currentLyric.lines" :self-height="true" class="scroll-lyric">
                <div class="lyric-wrapper">
                  <p ref="lyricLine" :key="index" :class="[{current:index==curLine},'lyricLine','ellipsis']" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
                </div>
              </cube-scroll>
            </div>
            <!-- </mt-swipe> -->
          </div>
          <!-- 指示器 -->
          <div class="dots-wrap">
            <div :class="['dot',{active:currentShow==='cd'}]"></div>
            <div :class="['dot',{active:currentShow==='lyric'}]"></div>
          </div>
          <!-- 底部 -->
          <div class="bottom">
            <!-- 播放显示 -->
            <div class="play-progress">
              <div :class="['currentTimer',{draging}]" slot="start">
                <span>{{formatTimer(currentTime)}}</span>
              </div>
              <progress-bar :timeRanges="timeRanges" @input="oninput" @progressChange="onProgressChange" :duration="duration" :currentTime="currentTime" class="progress-bar"></progress-bar>
              <div class="totalTimer" slot="end">{{formatTimer(duration)}}
              </div>
            </div>
            <!-- 播放控制 -->
            <div class="player-control YCenter flex Around">
              <p @click="changeMode" class="flex Center playMode">
                <i :class="[modeCls,'iconfont']"></i>
              </p>
              <p @click="togglePrev" class="toggle-prev">
                <i class="iconfont icon-icon-"></i>
              </p>
              <p @click="togglePlaying" class="toggle-playing">
                <i :class="['iconfont' ,{'icon-bofang':!playing,'icon-bofang1':playing}]"></i>
              </p>
              <p @click="toggleNext" class="toggle-next">
                <i class="iconfont icon-xiayishou-yuanshijituantubiao"></i>
              </p>
              <p class="favorite flex Center">
                <i :class="['iconfont',favoriteCls]"></i>
              </p>
            </div>
          </div>
          <!-- 缓冲提示 -->
          <div class="spinner-wrapper flex Center" v-show="waiting && playing">
            <mt-spinner :size="60*__DPR" type="fading-circle"></mt-spinner>
          </div>
        </div>
        <!-- 播放内核 -->
        <div class="playAudio">
          <audio @canplaythrough="oncanplaythrough" @stalled="onstalled" @loadstart="onloadstart" @loadeddata="onloadeddata" @emptied="onemptied" @loadedmetadata="onloadedmetadata" @waiting="onwaiting" @playing="onplaying" @progress="onprogress" @timeupdate="onupdateTime" @ended="onended" :src="currentSong.songUrl" @canplay="oncanplay" ref="audio" autoplay>
          </audio>
        </div>
        <div class="mini-wrap">
          <!-- 当前播放列表 -->
          <div class="playlist" :style="{bottom:miniPlayerHeight+'px'}" v-show="isShowPlaylist && !fullScreen">
            <!--  -->
            <div class="title-wrap flex Between">
              <p class="title">播放列表</p>
              <div class="delete-icon" @click="deleteList">
                <i class="cubeic-delete"></i>
              </div>
            </div>
            <cube-scroll local ref="scrollPlaylist" :client-top="500">
              <music-list :list="playlist"></music-list>
            </cube-scroll>
          </div>
          <!-- 吸底播放器 -->
          <div :style="{}" @click="open" :class="['flex', 'mini-player' ,'border-top-1px',{hidden:fullScreen}]">
            <div class="cd-wrap">
              <img :class="['cd',{rotate:playing && !waiting}]" :src="currentSong.picUrl">
       </div>
              <div class="text">
                <div class="title-wrap">
                  <p class="title">{{currentSong.name}}</p>
                </div>
                <div class="singer-wrap">
                  <p class="singer">{{currentSong.singer}}</p>
                </div>
              </div>
              <div class="playing-control">
                <div class="circle-progress" @click.stop="togglePlaying">
                  <x-circle :trail-width="3" trail-color="#aaaaaa" :percent="percentProgress" :stroke-width="5" stroke-color="#04BE02">
                    <!-- <span>{{ percent }}%</span> -->
                    <i :class="['iconfont' ,{'icon-bofang2':!playing,'icon-zanting':playing}]"></i>
                  </x-circle>
                </div>
              </div>
              <div class="playlist-icon">
                <i @click.stop="isShowPlaylist=!isShowPlaylist" class="iconfont icon-bofangliebiao"></i>
              </div>
            </div>
          </div>
        </div>
</template>
<script type="text/javascript">
import Normal from './normal.vue'
import Mini from './mini.vue'
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
  computed: {
    ...Vuex.mapGetters([

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
      if (newplaying) {
        this.audio.play();
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

          this.$refs.scrollPlaylist.refresh()
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
      if (this.__isPlainObject(newSong)) {
        console.log('isPlainObject')

      } else {

      }
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
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    resetStart() {

      this.currentTime = 0;
      this.curLine = 0;
      this.resetCdTransform()
      this.$refs.scrollLyric && this.$refs.scrollLyric.scrollTo(0, 0, 300)
      if (this.playMode.loop !== this.mode) {

        this.timeRanges = 0;
      }
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
      var lyric = await this.currentSong.getLyric();
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

      this.$nextTick(() => {

        this.audio.pause()
      })
      // }
    },
    onupdateTime(e) {
      if (!this.songReady) {
        // this.songReady = true
      }

      // console.log(e.target.currentTime);
      // if (this.touch && !this.touch.touchstart) {
      if (!this.draging) {

        this.currentTime = Math.round(e.target.currentTime)
      }
    },
    oncanplay() {
      if (this.isBuffered) {
        return
      }

      this.waiting = false;
      this.songReady = true;

      console.log('canplay', `  waiting--${this.waiting}  `, `  songReady--${this.songReady}`)
      this.audio.play();

    },
    oncanplaythrough() {

    },
    back() {
      if (this.isShowPlaylist) {
        this.isShowPlaylist = false;
      }
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)

    },
  },
};

</script>
<style scoped lang="less">
@import './animate-rotate.less';
@height: 60vh;

.background {
  z-index: -1;
  opacity: .6;
  position: fixed;
  top: 0px;
  bottom: 0;
  right: 0;
  left: 0;

  transition-property: filter;
  // filter: blur(35px);

}

.player {
  // height: 100vh;

}

.normal-player {
  z-index: 100;
  height: 100vh;
  background: #444;
  position: fixed;
  width: 100vw;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

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
    // text-align: center;
    position: relative;

    &>[class^=middle] {
      width: 50%;
      // width: 100vw;
    }

    // height: @height;
    .middle-l {

      // 转动光盘
      .cd-wrap {
        // transform: rotate(0);
        // width: 100vw;
        margin: auto;
        width: 260px;

        img.cd {
          width: 100%;
          border: 10px solid hsla(0, 0%, 100%, .1);
        }
      }

      // 当前歌词
      .curLyric-wrapper {
        // margin-top: 100px;
        .font-dpr(12Px);
        text-align: center;
        position: fixed;
        top: 360px;
        z-index: 10;
        width: 100%;
        padding: 0 30px;
        color: hsla(0, 0%, 100%, .5);
      }

    }

    .middle-r {
      height: 100%;

      .scroll-lyric {
        text-align: center;

        .lyricLine {
          padding: 0 30px;
          margin-bottom: 16px;
          .font-dpr(14Px);
          color: hsla(130, 30%, 100%, .5);

          &:first-child {
            padding: 0 80px;
          }

          &.current {
            color: #fff;
          }
        }
      }

    }

  }

  .dots-wrap {
    position: fixed;
    bottom: 140px;
    width: 100%;
    // left: 0;
    .flexXCenter;

    .dot {
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: #ccc;
      opacity: .6;

      &:first-child {
        margin-right: 5px;

      }

      &.active {
        width: 14px;
        border-radius: 5px;
        background: #fff;
        opacity: .9;

      }
    }
  }


  .bottom {
    position: fixed;
    bottom: 30px;
    width: 100vw;

    .play-progress {
      // margin-top: 80px;
      .flexBetween;
      align-items: center;
      width: 100%;
      padding: 0 20px;

      .progress-bar {
        margin: 0 12px;
      }


      color:#fff;

      .currentTimer {
        // margin-right: 10px;

        &.draging {
          color: #ffcd32;
          // font-size: 1.3em;
          transform: scale(1.3);
        }
      }

      .totalTimer {
        // margin-left: 46px;
      }

    }

    .player-control {
      margin-top: 20px;
      color: #ffcd32;

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
    // margin-bottom: 4px;
  }

  .delete-icon {
    font-size: 20px;
  }
}

.mini-player {
  align-items: center;
  padding: 0 10px;
  height: 60px !important;


  .cd-wrap {
    img {
      width: 50px;
      border-radius: 50%;
    }

    // margin-right: 10px;
  }



  .text {
    margin-left: 12px;

    .title-wrap {
      margin-bottom: 8px;
      // color: #fff;
    }
  }

  .playing-control {
    margin-left: auto;

    .circle-progress {
      width: 50px !important;
      height: 50px !important;
    }
  }

  .playlist-icon {
    margin-left: 20px;
    // margin-right: 10px;
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
<style type="text/css">
</style>
