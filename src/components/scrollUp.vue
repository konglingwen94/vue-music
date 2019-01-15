<template>
  <div class="scrollUp">
    <!-- 背景图片 -->
    <slot name="theme-bg">
      <div class="themePic" v-lazy:background-image="themeInfo.picUrl">
        <div v-if="0" v-show="Math.abs(scrollY)<picHeight-reserved" class="playBtn">
          <mt-button class="mt-button-play" :light="true" :primary="true" :outline="true">播放全部</mt-button>
        </div>
        <div class="bg-layer"></div>
      </div>
      <!-- 滚动遮罩 -->
      <div class="layer">
      </div>
      <slot name="navBar"></slot>
    </slot>
    <!-- 歌曲列表 -->
    <slot name="scroll">
      <cube-scroll :options="options" @pulling-up="$emit('pulling-up')" :scroll-events="['scroll']" :probeType="3" @scroll="onScroll" class="scrollWrap" ref="scroll">
        <!-- <component :is="name"> -->
        <!-- </component> -->
        <slot name="songList"></slot>
        <slot :scrollY="scrollY" name="singerDetail"></slot>
        <cube-loading class="icon-loading" v-if="!pageLoaded"></cube-loading>
        <!-- <p class="loadTip" v-if="!hasMore">没有更多数据</p> -->
      </cube-scroll>
    </slot>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  data() {
    return {
      options: {
        pullUpLoad: {
          txt: { more: 'more', noMore: '没有更多数据了' },
          threshold: -100
        },
        // loadEnd: false
      },
      // hasMore: true,
      scrollY: 0,
      picHeight: 0,
      scroll: {},
      translateY: 0,
      childrenNoMore: {
        singerMusic: false,
        singerAlbum: false,
        singerMv: false,
      }
    };
  },
  computed: {
    ...mapState('singerDetail', [
      // 'picHeight',
      'items',
      'pageLoaded'
    ]),


  },
  props: {

    themeInfo: {
      type: Object,
      default: () => ({
        picUrl: ''
      })
    },
    reserved: {
      type: Number,
      default: 50
    },
    musicList: {
      type: Array,
      default: () => []
    }
  },
  /*mounted() {

    console.log(this.$refs.scroll.scroll)

  },*/
  created() {
    // this.bus.$on('activated', (pullUpLoad) => {
    // this.options.pullUpLoad = pullUpLoad
    // console.log(Vuex.mapMutations)
    // })
    /* this.bus.$on('created', (name) => {
       // this.scroll.enabled = false
       // this.loading = true;
       // this.hasMore = true
       this.$nextTick(() => {

         $('.icon-loading').css('transform', `translateY(${this.translateY/1.5}px)`)
         // debugger;
       })
     })
     this.bus.$on('onloadEnd', (name) => {
       // this.options.loadEnd = true
       // console.log(name + ' is loadEnd')
       // this.options.pullUpLoad = false
       // this.hasMore = false
       // this.loading = false
       // this.scroll.finishPullUp()
       this.childrenNoMore[name] = true
     })*/
    // this.bus.hasMore = true

  },
  /* watch: {
     items: {
       deep: true,
       handler: function(next, prev) {
         this.$refs.scroll.scrollTo(0, this.translateY)
         // console.log(next, prev)
       }
     },
     '$route': function(argument) {
       // body...
       // var item =
       if (this.items) {}
     }
   },
   destroyed() {
     // this.resetItems()
   },*/
  mounted() {
    // console.log(this.$refs)
    // this.scrollInit(this.$refs)

    this.$nextTick(() => {
      this.scroll = this.$refs.scroll
      // this.scroll.enabled = false
      // console.log(this.scroll)

      this.picHeight = $('.themePic').height()
      $('.scrollWrap').css('top', this.picHeight)
      this.minTranslateY = this.reserved - this.picHeight
    })
  },
  methods: {
    ...mapMutations('singerDetail', ['resetItems']),
    onScroll({ x, y }) {
      // console.log(y)
      this.scrollY = y
      var zIndex = 0
      var percent = Math.abs(y / this.picHeight)
      this.translateY = Math.max(this.minTranslateY, y)
      var scale = 0
      var blur = Math.min(30, 30 * percent)
      if (y > 0) {
        scale = 1 + percent
        $('.themePic').css({
          transform: `scale(${scale})`,
          zIndex: 10
        })

      } else {
        if ($('.scrollWrap').css('overflow') != 'visible') {
          $('.scrollWrap').css('overflow', 'visible')
        }
        $('.bg-layer').css({
          '-webkit-backdrop-filter': `blur(${blur}px)`,
        })
      }
      $('.layer').css('transform', `translate3d(0,${this.translateY}px,0)`)
      if ($('.navBar-singer')[0]) {
        // console.log(this.reserved)

        $('.navBar-singer').css('transform', `translate3d(0,${this.translateY}px,0)`)
      }

      if (y < this.minTranslateY) {
        $('.themePic').css({ 'z-index': 10, height: this.reserved });
        $('.navBar-singer').css('transform', `translate3d(0,0,0)`)
      } else if (y < 0 && y > this.minTranslateY) {
        $('.themePic').css({ 'z-index': 0, height: this.picHeight })

      }
    },
    onPullingUp() {
      // console.log(this.$route.name)
      var name = this.$route.name
      // this.
      this.$nextTick(() => {
        // this.$refs.scroll.refresh()
        // this.$refs.scroll.forceUpdate(!this.options.loadEnd)
      })
      if (this.childrenNoMore[name]) {
        setTimeout(() => {
          this.$refs.scroll.forceUpdate(false)
        }, 500)
      }
    },
  }
};

</script>
<style scoped lang="less">
.mt-header {
  z-index: 20;
  background: transparent;
}

.themePic {
  .posCenterBot(playBtn, 20px);

  .playBtn {
    width: 60%;

    .cube-button-play {
      border-radius: 20px;
      border: solid orange;
      outline: none;
    }
  }

  .bg-layer {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    position: absolute;
  }

  text-align: center;
  height: 39vh;
  transform-origin: top;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  position: relative;
}

.layer {
  height: 1000px;
  background: #eee;
  position: absolute;
  width: 100%;
  z-index: 1
}

.scrollWrap {

  height: 60vh;
  position: absolute;
  background: #eee;
  width: 100%;

  .icon-loading {
    display: flex;
    justify-content: center;
    margin-top: 140px;
    font-size: 130px;
  }

  .loadTip {
    text-align: center;
  }
}

</style>
<style>
/* .cube-loading-spinners {
  width: 140px !important;
  height: 140px !important;
} */

</style>
