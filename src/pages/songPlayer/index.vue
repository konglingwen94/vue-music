<template>
  <div class="player">
    <!-- 全屏播放 -->
    <div class="normal-player" v-show="fullScreen">
      <div class="top">
        <mt-header class="mt-top" :title="currentSong.name">
          <div slot="left" class="back" @click="back">
            <i class="cubeic-select"></i>
          </div>
        </mt-header>
      </div>
    </div>
    <!-- 最小化播放 -->
    <div @click="open" class="mini-player" v-show="!fullScreen">mini-player</div>
  </div>
</template>
<script type="text/javascript">
import Normal from './normal.vue'
import Mini from './mini.vue'
export default {
  name: '',
  data() {
    return {

    };
  },
  computed: {
    ...Vuex.mapGetters(['singer',
      'playing',
      'fullScreen',
      'playlist',
      'sequenceList',
      'mode',
      'currentIndex',
      'currentSong'
    ]),
  },
  methods: {
    ...Vuex.mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
    }),
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)

    },
  },
};

</script>
<style scoped lang="less">
.player {}

.normal-player {
  height: 100vh;
  background: #eee;
  position: fixed;
  width: 100vw;

  .mt-top {
    background: transparent;
  }
}

.mini-player {
  border-top: 1px solid orange;
  position: fixed;
  bottom: 0px;
  height: 70px;
  width: 100%;
  background: #eee;
}

</style>
