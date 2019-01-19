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
      <div class="background">
      </div>
      <!-- 中间左右轮播 -->
      <div class="middle">
        <mt-swipe :auto="0" :continuous="false">
          <mt-swipe-item class='middle-l'>
            <div class="cd-wrap">
              <img :class="['cd',{rotate:playing}]" :key="currentSong.albummid" v-lazy="currentSong.picUrl" />
              </div>
              <div class="curLyric-wrapper">
                <p class="ellipsis">{{curLyric}}</p>
              </div>
          </mt-swipe-item>
          <!--滚动歌词 -->
          <mt-swipe-item>
            <cube-scroll ref="scrollLyric" v-if="currentLyric && currentLyric.lines.length>0" :data="currentLyric && currentLyric.lines" :self-height="true" class="scroll-lyric">
              <div class="lyric-wrapper">
                <p ref="lyricLine" :key="index" :class="[{current:index==curLine},'lyricLine','ellipsis']" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </cube-scroll>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 底部 -->
      <div class="bottom">
        <!-- 播放显示 -->
        <div class="play-progress">
          <div class="range">
            <mt-range @handleClick="handleClick" @change="onchange" @input="oninput" @touchstart.native="onTouchstart" @touchmove.native="onTouchmove" @touchend.native="onTouchend" v-model="currentTime" :min="0" :max="duration" :step="1" :bar-height="5*__DPR">
              <div :class="['currentTimer',{draging}]" slot="start">
                <span>{{currentTimer}}</span>
              </div>
              <div class="totalTimer" slot="end">{{totalTimer}}</div>
            </mt-range>
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
    </div>
    <!-- 播放内核 -->
    <div class="playAudio">
      <audio @play="onplay" @pause="onpause" @timeupdate="updateTime" @ended="onPlayEnd" :src="currentSong.songUrl" @canplay="canplay" ref="audio" autoplay>
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
        <cube-scroll ref="scrollPlaylist" :client-top="500">
          <music-list :list="playlist"></music-list>
        </cube-scroll>
      </div>
      <!-- 吸底播放器 -->
      <div @click="open" :class="['flex', 'mini-player' ,'border-top-1px',{hidden:fullScreen}]">
        <div class="cd-wrap">
          <img :class="['cd',{rotate:playing}]" :src="currentSong.picUrl">
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
// import Swiper from 'swiper'
import Normal from './normal.vue'
import Mini from './mini.vue'
import playerControls from './play-control.js'
import playMode from '@/common/js/config'
import { shuffle } from '@/common/js/util'
import lyricParser from 'lyric-parser'
export default {
  name: '',
  data() {
    return {
      curLyric: '',
      curLine: 0,
      currentLyric: null,
      songReady: false,
      currentTime: 0,
      duration: 0,
      isShowPlaylist: false,
      progressVal: 0,
      draging: false,
      rotate: 0,
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
    modeCls() {

      return this.mode === playMode.sequence ? 'icon-shunxubofang' : this.mode === playMode.loop ? 'icon-xunhuanbofang' : 'icon-bofangye-caozuolan-suijibofang'
    },
    favoriteCls() {
      return 'icon-shoucang'
    },
    percentProgress() {
      return Math.floor(this.currentTime / this.duration * 100)
    },
    currentTimer() {
      return this.formatTimer(this.currentTime)
    },
    totalTimer() {
      return this.formatTimer(this.duration)
    },
  },
  created() {
    this.initialed = false;
    this.touch = {};

    // this.normalPlayerHeight = 0;
  },
  mounted() {
    setTimeout(() => {
      this.miniHeight = $('.mini-player').height()
      // console.log(miniPlayerHeight)
      this.getProgressRect()
    })
    this.$nextTick(() => {
      // 获取进度条宽度
      // console.log(h)
      $('.middle').css({ height: innerHeight / 1.9 });
      // this.normalPlayerHeight = innerHeight;
      this.audio = $('audio')[0];
      this.bindProgressHandle()
    })
  },
  watch: {

    isShowPlaylist: function(newIsShow) {
      // body...
      if (newIsShow) {
        this.$nextTick(() => {

          this.$refs.scrollPlaylist.refresh()
        })
      }

    },
    percentProgress(newTime) {
      if (this.draging) {}
      this.seek()

    },
    currentLyric(newLyric, oldLyric) {
      oldLyric && oldLyric.stop()
      // console.log(newLyric, oldLyric);
    },
    fullScreen(newShow, oldShow) {
      if (!newShow) {
        this.setMiniPlayerHeight(this.miniHeight)

      }
    },
    currentSong(newSong, oldSong) {
      // console.log('watcher currentSong')
      if (this.__isPlainObject(newSong)) {
        this.setMiniPlayerHeight(0)
      }
      if (oldSong.id == newSong.id) {
        return
      }
      this.$nextTick(async () => {
        // console.log(this.currentSong.songUrl);
        this.getLyric()


        $('audio')[0].volume = 0.1
        this.rotate = 0
        $('.cd-wrap').css({ transform: `rotate(0)` })
      })
      // }
    },
    playing(newPlaying) {
      // console.log('playing')
      this.$nextTick(() => {

        if (newPlaying) {
          this.audio.play()
          // 设置cd上次旋转角度
        } else {
          this.setPrevRotate()

          this.audio.pause();
        }


      })
    }
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
    bindProgressHandle() {
      $('.mt-range-content').bind('touchstart', (e) => {
        if (!e.target.classList.contains('mt-range-thumb')) {
          // console.log(e.target.classList);
          this.setClickProgress(e)
        }
      }).bind('touchend', (e) => {
        if (!e.target.classList.contains('mt-range-thumb')) {

          this.audio.play()
        }
      });

    },
    setPrevRotate() {
      $('.cd-wrap').css({ transform: `rotate(${this.rotate}deg)` })
    },
    getProgressRect() {

      // 获取播放进度条的宽度
      this.rangeRunwayWidth = $('.mt-range-runway').width()
      console.log(this.rangeRunwayWidth);
      this.rangeRunwayOffsetX = $('.mt-range-runway')[0].getBoundingClientRect().left;
    },
    setClickProgress(e) {
      let touch = e.targetTouches[0]
      let offsetX = touch.clientX - this.rangeRunwayOffsetX;
      offsetX = Math.min(this.rangeRunwayWidth, offsetX)
      let percent = offsetX / this.rangeRunwayWidth;
      let playTime = percent * this.duration
      this.audio.currentTime = (playTime)
    },
    handleClick() {
      console.log('handleClick');
    },
    onplay() {
      this.setPlayingState(true)
    },
    onpause() {
      this.setPlayingState(false)

    },
    seek() {
      this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)

    },
    async getLyric() {
      var lyric = await this.currentSong.getLyric();
      this.currentLyric = new lyricParser(lyric, this.handleLyric)
      this.curLyric = this.currentLyric.lines[0].txt
      if (this.playing) {
        this.currentLyric.play()
      }
    },
    handleLyric({ lineNum, txt }) {
      if (this.curLine == lineNum) {
        // console.log('===');
        return
      }
      // console.log('!=');

      this.curLine = lineNum;
      this.curLyric = txt;
      let lineEl = this.$refs.lyricLine && this.$refs.lyricLine[lineNum]
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
    oninput(val) {
      if (!this.draging) {

        this.draging = true
      }
      // console.log('oninput');

    },
    onchange(val) {
      // console.log(this.draging);
      if (this.draging) {
        this.audio.currentTime = val;
      }
      this.seek()
      this.draging = false
      this.audio.play()
    },
    getCdRotate(selector) {
      var rotate = 0;
      if (this.fullScreen) {
        rotate = this.getElRotate($('.normal-player .cd-wrap')) + this.getElRotate($('.normal-player .cd'))
      } else {
        rotate = this.getElRotate($('.mini-player .cd-wrap')) + this.getElRotate($('.mini-player .cd'))
      }

      return rotate
    },
    loop() {
      this.audio.currentTime = 0;
      this.$refs.scrollLyric.scrollTo(0, 0, 1000)
      this.audio.play()

    },
    onPlayEnd() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.toggleNext()
        // this.loop()
      }
    },
    onTouchstart(e) {
      if (e.target.classList.contains('mt-range-thumb')) {
        // this.touch=e.touch
        this.thumb = e.target;
        this.touch.touchstart = true
        this.touch.touchstartX = $(this.thumb).offset().left
        this.touch.moveX = 0
      }
    },
    onTouchmove(e) {
      if (this.touch.touchstart) {
        // this.draging = true;
        this.touch.moveX = $(this.thumb).offset().left - this.touch.touchstartX
        // console.log(this.touch.moveX)
      }

    },
    onTouchend() {
      if (this.touch.touchstart) {

        // this.draging = false;
        console.log('onTouchend')
        // this.audio.currentTime = this.currentTime;
        this.touch.touchstart = false

      }
    },
    deleteList() {
      this.setPlaylist([])
      // if (this.playing) {

      this.audio.pause()
      // }
    },
    updateTime(e) {
      // console.log(e.target.currentTime);
      // if (this.touch && !this.touch.touchstart) {
      if (!this.draging) {

        this.currentTime = Math.round(e.target.currentTime)
      }
    },
    async canplay() {

      this.audio.play();
      this.duration = Math.round(this.audio.duration)
      // console.log(this.audio.duration)
      this.songReady = true;

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

.player {
  // height: 100vh;

}

.normal-player {
  height: 100vh;
  background: #ccc;
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
      // color: ;
    }
  }

  .middle {
    margin-top: 20px;
    text-align: center;
    position: relative;

    // height: @height;

    .middle-l {

      // 转动光盘
      .cd-wrap {
        transform: rotate(0);
        // width: 100vw;
        margin: auto;
        width: 260px;

        img.cd {
          width: 100%;
          border: 8px solid #aaa;

        }
      }

      // 当前歌词
      .curLyric-wrapper {
        // margin-top: 100px;
        text-align: center;
        position: fixed;
        top: 360px;
        z-index: 10;
        width: 100%;
        padding: 0 30px;
      }

    }

    .scroll-lyric {
      height: 100%;

      .lyricLine {
        margin-bottom: 16px;
        .font-dpr(14Px);

        &:first-child {
          padding: 0 80px;
        }

        &.current {
          color: #fff;
        }
      }
    }

    /deep/ .mint-swipe-item {
      display: block;
    }

    /deep/ .mint-swipe {
      overflow: visible;

      /deep/ .mint-swipe-indicators {
        bottom: 130px !important;
        position: fixed !important;
        width: 100%;

        .mint-swipe-indicator {
          opacity: .5;


          &.is-active {
            border-radius: 5px !important;

            width: 20px !important;
            background: red;
          }
        }
      }

    }
  }

  .bottom {
    position: fixed;
    bottom: 30px;
    width: 100vw;

    .play-progress {
      // margin-top: 80px;
      padding: 0 20px;

      /deep/ .mt-range-content {
        margin-right: 0 !important;
      }

      .currentTimer {
        margin-right: 10px;

        &.draging {
          color: green;
          // font-size: 1.3em;
          transform: scale(1.3);
        }
      }

      .totalTimer {
        margin-left: 46px;
      }

      /deep/ .range-handle {
        // width: 20px !important;
        // height: 20px !important;
      }

    }

    .player-control {
      margin-top: 20px;


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
  z-index: 20;

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
  height: 60px;


  .cd-wrap {
    img {
      width: 50px;
      border-radius: 50%;
    }

    margin-right: 10px;
  }



  .text {
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
