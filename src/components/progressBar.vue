<template>
  <div v-if="initiated" class="progress-bar" @click="onProgressClick">
    <div class="bar-inner">
      <div :style="{transition}" @transitionend.stop="transition=''" class="timeRanges"></div>
      <div :style="progressStyle" class="progress">
      </div>
      <!-- <div class="progress-container"> -->
      <div @transitionend.stop="transition=''" :style="{transform:`translate3d(${offsetWidth}px,-50%,0)`,transition}" class="progress-btn-wrapper" @touchstart.prevent="onProgressBtnStart" @touchmove.prevent="onProgressBtnMove" @touchend.prevent="onProgressBtnEnd">
        <div :style="btnStyle" class="progress-btn"></div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script type="text/javascript">
const btnWidth = 20
export default {
  name: '',
  data() {
    return {
      transition: '',
      initiated: true,
      progressWidth: 0,
      progressTotalWidth: 0,
      barWidth: 0,
      offsetWidth: 0,
    };
  },
  computed: {
    progressStyle() {
      return {
        width: `${this.offsetWidth}px`,
        transition: this.transition
      }
    },
    btnStyle() {
      return {
        height: `${this.btnWidth}px`,
        width: `${this.btnWidth}px`,
      }
    },
    changeTime() {
      return Math.round(this.offsetWidth / this.progressTotalWidth * this.duration)

    }
  },
  props: {
    timeRanges: {
      type: Number,

      default: 0

    },
    currentTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,

      default: 0

    }
  },
  created() {
    this.btnWidth = btnWidth * this.__DPR;

    // this.currentTime = 0
  },
  async mounted() {
    // this.btnWidth = $('.progress-btn-wrapper').width()
    this.touch = {}
    setTimeout(() => {

      this.barWidth = $('.progress-bar').width();
      this.progressTotalWidth = this.barWidth - this.btnWidth;
      this.barOffsetLeft = $('.progress-bar')[0].getBoundingClientRect().left;
    })
  },
  watch: {
    timeRanges(newRange) {
      const width = newRange / this.duration * this.barWidth
      $('.timeRanges').css({ width })
    },
    currentTime(curTime) {
      if (!this.touch.initiated) {

        const percent = curTime / this.duration
        this.offsetWidth = this.progressTotalWidth * percent
        // console.log(curTime, width)
      }
    },
  },
  methods: {
    onProgressBtnStart(e) {
      this.$emit('btnTouchStart', this.offsetWidth)

      this.touch.initiated = true;
      this.touch.offsetX = this.offsetWidth;
      this.touch.startX = e.touches[0].pageX;
    },
    onProgressBtnMove(e) {
      if (this.touch.initiated) {
        const deltaX = e.touches[0].pageX - this.touch.startX;
        // console.log(deltaX)
        this.offsetWidth = Math.max(0, Math.min(this.progressTotalWidth, this.touch.offsetX + deltaX))
        this.$emit('input', this.changeTime)
      }
    },
    onProgressBtnEnd() {
      this.touch.initiated = false;
      this._triggerChange();
      // this.$emit('change', this.offsetWidth)
    },
    onProgressClick(e) {
      this.transition = 'all .2s';
      // console.log(e)
      this.offsetWidth = e.pageX - this.barOffsetLeft - btnWidth
      this._triggerChange();

    },
    _triggerChange() {
      this.$emit('progressChange', this.changeTime)
    }
  }
};

</script>
<style scoped lang="less">
.progress-bar {
  width: 100%;

}

.bar-inner {
  height: 7px;
  background: #eee;
  width: 100%;
  // position: relative;
  .posCenterY(progress-btn-wrapper);

  .timeRanges {
    background: #aaa;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    // z-index: -1;
  }

  .progress {
    position: relative;
    z-index: 10;
    height: 100%;
    background: yellow;
  }

  .progress-container {}

  .progress-btn-wrapper {
    left: -8px;
    padding: 8px;

    .progress-btn {
      border: 3px solid #fff;

      // width: 20px;
      // height: 20px;
      border-radius: 50%;
      background: lightgreen;
    }
  }
}

</style>
