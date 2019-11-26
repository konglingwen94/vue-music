<template>
  <div :class="['mv-list']">
    <!-- <slot :datakey="keys"> -->
    <div
      :class="['mv-item',{current:isCurrent(item)},{fullscreen}]"
      v-for="(item,key) in data"
      :key="key"
    >
      <!-- 图片容器 -->
      <div class="video-wrapper">
        <video
          controlslist="nodownload"
          @loadstart="onloadstart"
          @error="onerror"
          @waiting="onwaiting"
          src
          @canplay="oncanplay"
          @click="selectItem($event,item)"
          :class="['video']"
          :poster="item.picurl"
        >
          <!-- <source type="video/mp4"> -->
        </video>
        <mt-spinner
          class="waiting-snake"
          type="snake"
          :size="40"
          color="blue"
          v-if="!mvReady && currentMv===item && !error"
        ></mt-spinner>
        <!-- <div> -->
        <span v-show="currentMv===item" class="vdoType-wrapper" @click="showPicker" inline>
          {{item.videoType.text}}
          <i class="cubeic-select"></i>
        </span>
        <!-- </div> -->
        <!-- <p class="toggle-playing"> -->
        <!-- <i :class="['iconfont' ,{'icon-bofang2':!playing},{'icon-zanting':playing}]"></i> -->
        <!-- </p> 背景图 -->
      </div>
      <!-- 文案 -->
      <div :class="['text-wrap']">
        <div class="text-title">
          <p class="title ellipsis" v-text="item.title"></p>
        </div>
        <div class="text-desc">
          <p class="desc ellipsis" v-text="item.singer"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'mv-list',
  data() {
    return {
      currentMv: null,
      playing: false,
      mvReady: false,
      currentVdo: null,
      error: false,
      fullscreen: false,
      orientation: 0
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  created() {
    // this.$emit('on-key', this.keys)
  },
  mounted() {
    $(document).bind(
      'fullscreenchange webkitfullscreenchange mozfullscreenchange',
      () => {
        //todo code
        this.fullscreen =
          document.webkitIsFullScreen &&
          document.webkitCurrentFullScreenElement === this.currentVdo
      }
    )
  },
  watch: {
    'currentMv.videoType.index': function(index) {
      // body...
      if (index) {
        this.currentVdo.src = this.currentMv.playurls[index]
      }
    },
    // body...
    currentVdo(newVdo, oldVdo) {
      if (newVdo) {
        newVdo.load()
        $(newVdo).attr('controls', 'controls')

        this.reactive.$scroll.scrollToElement(newVdo, 1000, true, true)
      }
      if (oldVdo) {
        oldVdo.src = ''
        $(oldVdo).removeAttr('controls')
      }
    },
    'reactive.scrollY': function(newY) {
      if (!this.currentVdo) {
        return
      }
      // body...
      const top = this.getVdoRect().top
      const bottom = this.getVdoRect().bottom
      const clientTop = this.reactive.clientTop
      // console.log(top)
      if (bottom <= clientTop || top >= window.innerHeight) {
        this.currentVdo.src = ''

        this.currentVdo = null
        this.currentMv = null
      }
    }
  },
  inject: ['reactive'],
  inheritAttrs: false,
  computed: {
    videoType() {
      return this.currentMv ? this.currentMv.videoType : null
    },
    selected() {
      return this.currentMv ? { index: this.selectedIndex[0] } : null
    },
    selectedIndex() {
      return this.currentMv ? [this.currentMv.videoType.index] : [-1]
    }
  },
  methods: {
    isCurrent(item) {
      return this.currentMv === item
    },

    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '视频清晰度',
          $props: {
            selectedIndex: 'selectedIndex'
          },
          // alias: {
          //   value: 'r'
          // },
          data: [this.$attrs.pickerData],
          onSelect: this.selectHandle
          // onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.currentMv.videoType.index = selectedIndex[0]
      this.currentMv.videoType.text = selectedText[0]
      // this.currentMv.videoType.r = selectedVal[0]
    },

    onloadstart(e) {
      if (e.target !== this.currentVdo) {
        return
      }
      this.errToast && this.errToast.close()
      this.mvReady = false
      this.error = false
    },
    onerror(e) {
      if (e.target !== this.currentVdo) {
        return
      }
      this.error = true
      this.errToast = this.Toast({
        message: 'error',
        duration: 2000
      })
    },
    getVdoRect() {
      return this.currentVdo ? this.currentVdo.getBoundingClientRect() : {}
    },
    onwaiting() {
      this.mvReady = false
    },
    oncanplay(e) {
      this.mvReady = true
      this.currentVdo && this.currentVdo.play()
      this.playing = true
      // this.
    },
    selectItem(e, mv) {
      
      if (this.$store.state.playlist.length) {
        this.$store.dispatch('deleteSongList')
      }

      if (this.currentVdo === e.target) {
        return
      }
      e.target.src = mv.playurls[mv.videoType.index]

      this.currentVdo = e.target
      this.currentMv = mv
    }
  }
}
</script>
<style>
video:-webkit-full-screen div {
  padding-right: 40px !important;
  color: red !important;
}
</style>
<style scoped lang="less">
.mv-item {
  margin-bottom: 30px;
  height: 240px;

  &.fullscreen {
    video::-webkit-media-controls-enclosure {
      padding-right: 70px !important;
    }

    ::-webkit-media-controls-mute-button {
      display: none;
    }

    ::-webkit-media-controls-volume-slider {
      display: none;
    }

    .vdoType-wrapper {
      position: fixed;
      right: 0;
      bottom: 0;
      top: auto !important;
      transform: none !important;
      .font-dpr(16px);
      z-index: 3000000000000;
      background-color: rgb(250, 250, 250);
      color: #000;
      padding-left: 6px;
      line-height: 50.2px;
    }
  }

  &.current {
    color: red;

    .video {
      &:-webkit-full-screen {
        &:-webkit-media-controls-enclosure {
          margin-right: 30px;
        }
      }
    }
  }
}

.text-wrap {
  display: flex;
  justify-content: space-around;
  margin-top: 18px;

  [class^='text'] {
    width: 40%;
    padding-left: 40px;
    // text-align: center;
  }
}

.video-wrapper {
  .posCenter(waiting-snake);
  .posRightCen(vdoType-wrapper);

  .vdoType-wrapper {
    color: #fff;
    padding-right: 10px;
  }

  .iconfont {
    font-size: 6em;
    color: #fff;
    z-index: 10;
  }

  .video {
    width: 100%;
  }
}
</style>
