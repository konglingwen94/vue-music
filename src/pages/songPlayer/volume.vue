<template>
  <transition name="volume">
    <div v-show="showFlag" @click="hide" class="volume fullScreenFixed">
      <div class="volume-wrapper" @click.stop>
        <div class="volume-content">
          <mt-range v-model="volume" v-on="$listeners" class="volume-range">
            <div slot="start" class="volume-icon">
              <i :class="volumeCls"></i>
            </div>
          </mt-range>
        </div>
        <cube-button light class="1close" @click="hide">关闭</cube-button>
      </div>
    </div>
  </transition>
</template>
<script type="text/javascript">
export default {
  name: '',
  data() {
    return {
      showFlag: false,
      volume: 100
    };
  },
  computed: {

    volumeCls() {
      return this.volume === 0 ? 'cubeic-mute' : 'cubeic-volume'
    },
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
  }
};

</script>
<style scoped lang="less">
.volume-enter-active,
.volume-leave-active {
  transition: all .3s;

  .volume-wrapper {
    transition: inherit;
  }
}

.volume-enter,
.volume-leave-to {
  background: transparent !important;

  .volume-wrapper {

    transform: translate3d(0, 100%, 0);
  }
}

.volume {
  position: fixed;
  background: rgba(0, 0, 0, .2);
}

.volume-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  // height: 100px;
  background: #fff;

}

.volume-content {
  padding: 20px;

  .volume-icon {
    margin-right: 10px;
    font-size: 2em;
  }
}

// margin-bottom: 10px;
.volume-range {}

.close {
  text-align: center;
  line-height: 3;
  background: #eee;
}

</style>
