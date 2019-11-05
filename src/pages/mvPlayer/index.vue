<template>
  <div @click="oncanplay" class>
    <mt-header :title="$route.query.name">
      <div @click="$router.back()" slot="left">
        <i class="cubeic-back"></i>
      </div>
    </mt-header>
    <div @click.stop="toggleShowPlayIcon" class="player-wrapper">
      <video
        :key="$route.query.id"
        @play="onplay"
        @pause="onpause"
        @waiting="onwaiting"
        :poster="$route.query.pic"
        @canplay="oncanplay"
        @progress="onprogress"
        @error="onerror"
        @abort="onabort"
        style="width: 100%;"
        ref="video"
        autoplay
        controls
        :src="$route.query.url"
      ></video>
      <div class="showLoadState">
        <mt-spinner type="snake" :size="40" color="blue" v-if="!mvReady"></mt-spinner>
        <div v-else @click.stop="togglePlaying" v-show="showPlayIcon">
          <i :class="['iconfont' ,{'icon-bofang2':!playing},{'icon-zanting':playing}]"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: '',
  data() {
    return {
      mvReady: false,
      playing: false,
      showPlayIcon: true,
      timer: -1
    }
  },
  created() {},
  deactivated() {
    this.video.src = ''
    this.$destroy()
    // this.mvReady = false
  },
  mounted() {
    this.video = this.$refs.video
    console.log(this.$route.query)
    this.$nextTick(() => {
      // this.$refs.video.load()
    })
  },
  watch: {
    showPlayIcon(newShow) {
      if (newShow) {
        // setTimeout
      } else {
      }
    }
  },
  methods: {
    delayHiddenPlayIcon() {
      var timer = setTimeout(() => {
        this.showPlayIcon = false
        this.timer = -1
        console.log('delayHiddenPlayIcon')
      }, 8000)
      this.timer = timer
    },
    toggleShowPlayIcon() {
      // console.log('toggleShowPlayIcon')

      if (this.showPlayIcon) {
        clearTimeout(this.timer)
        // console.log(this.timer.length)
        this.timer = -1
        this.showPlayIcon = false
      } else {
        this.showPlayIcon = true
        this.delayHiddenPlayIcon()
      }
    },
    togglePlaying() {
      this.video.paused ? this.video.play() : this.video.pause()
    },
    onpause() {
      this.playing = false
    },
    onplay() {
      this.playing = true
    },
    onabort() {
      console.log('onabort')
    },
    onerror() {
      console.log('onerror')
    },
    onprogress() {
      // console.log(this.video.buffered.end(0));
    },
    onwaiting() {
      this.mvReady = false
    },
    oncanplay() {
      this.mvReady = true
      this.video.play()
      console.log('oncanplay')
      this.delayHiddenPlayIcon()
    }
  }
}
</script>
<style scoped lang="less">
.player-wrapper {
  .posCenter(showLoadState);

  .iconfont {
    font-size: 5em;
    color: #fff;
  }
}
</style>
