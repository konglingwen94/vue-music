<template>
  <div>
    <div>
      <!-- 顶部导航 -->
      <mt-header class="mt-header" fixed :title="cd.dissname">
        <!-- <router-link to="/" slot="left"> -->
        <mt-button @click="$router.back()" slot="left" icon="back">返回</mt-button>
        <!-- </router-link> -->
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <!-- 背景图片 -->
      <div class="themePic" v-lazy:background-image="cd.logo">
        <div v-show="Math.abs(scrollY)<picHeight-reserved" class="playBtn">
          <mt-button class="mt-button-play" :light="true" :primary="true" :outline="true">播放全部</mt-button>
        </div>
        <div class="bg-layer"></div>
      </div>
      <!-- 滚动遮罩 -->
      <div class="layer"></div>
      <!-- 歌曲列表 -->
      <cube-scroll :options="options" @pulling-up="onPullingUp" :scroll-events="['scroll']" :probeType="2" @scroll="onScroll" class="scrollWrap" ref="scroll">
        <cube-loading class="icon-loading" v-if="!musicList.length"></cube-loading>
        <music-list v-if="musicList.length" :list="musicList"></music-list>
      </cube-scroll>
      <!-- </mt-loadmore> -->
    </div>
  </div>
</template>
<script type="text/javascript">
import MusicList from '../../components/musicList.vue'
// import ThemeBg from '../../components/themeBg.vue'
export default {
  name: 'songList',
  components: {
    MusicList,
    // ThemeBg
  },
  data() {
    return {
      options: {
        pullUpLoad: {
          txt: { more: 'more', noMore: '没有更多数据了' }
        },
        // pullDownRefresh: true
      },
      isLoading: true,
      loadEnd: false,
      total_song_num: 0,
      song_begin: 0,
      song_num: 20,
      // allLoaded: false,
      cd: {},
      musicList: [],
      scrollY: 0,
      picHeight: 0,
      reserved: 0
    };
  },
  props: ['mid'],
  created() {
    // this.mid = this.$route.params.mid
    this.cd = {}
    this.getSongList()
    // this.reserved = 60
  },
  mounted() {
    // debugger
    this.reserved = $('.mt-header').height()
    this.$nextTick(() => {
      this.picHeight = $('.themePic').height()
      $('.scrollWrap').css('top', this.picHeight)
      this.minTranslateY = this.reserved - this.picHeight

      // (this.picHeight)
    })
  },
  methods: {
    onScroll({ x, y }) {
      this.scrollY = y
      var zIndex = 0
      var percent = Math.abs(y / this.picHeight)
      var translateY = Math.max(this.minTranslateY, y)
      var scale = 0
      var blur = Math.min(30, 30 * percent)
      if (y > 0) {
        // (y, $('.themePic').height() - this.picHeight)

        scale = 1 + percent
        $('.themePic').css({
          transform: `scale(${scale})`,
          // height: this.picHeight + y,
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
      $('.layer').css('transform', `translate3d(0,${translateY}px,0)`)
      if (y < this.minTranslateY) {
        $('.themePic').css({ 'z-index': 10, height: this.reserved })
      } else if (y < 0 && y > this.minTranslateY) {
        // (33)
        $('.themePic').css({ 'z-index': 0, height: this.picHeight })

      }
    },
    onPullingUp() {
      ('pullingUp')
      // 加载更多数据
      this.song_begin += this.song_num
      if (this.musicList.length >= this.total_song_num) {
        // (this.total_song_num)
        // this.options.pullUpLoad = false
        // this.$refs.scroll.forceUpdate(!this.loadEnd)

        // return false
      }

      this.getSongList();

    },
    initCd(cd) {
      this.$set(this.cd, 'dissname', cd.dissname)
      this.$set(this.cd, 'logo', cd.logo)
    },
    getMusicList(list) {
      $.each(list, (key, item) => {
        // (item, key)
        this.musicList.push(new this.__Song(item))
      })
    },
    getSongList() {
      this.__getJson(`http://${domain}:3000/getSongList`, {
        disstid: this.$route.query.id,
        song_begin: this.song_begin,
        song_num: this.song_num
      }).then(data => {
        if (!this.total_song_num) {
          console.log()
          this.total_song_num = data.cdlist[0].total_song_num
        }
        // (data)
        // if (data.code == 0) {
        this.originData = data.cdlist[0];
        // this.cd.dissname = data.cdlist[0].dissname;
        if (this.__isEmptyObject(this.cd)) {

          this.initCd(data.cdlist[0])
        }
        // this.musicList.push(...data.cdlist[0].songlist)
        this.getMusicList(data.cdlist[0].songlist)
        // }
        this.$nextTick(() => {
          // this.options.pullUpLoad = this.songList.length >= this.total_song_num ? false : true
          if (this.musicList.length >= this.total_song_num) {
            this.loadEnd = true
            this.options.pullUpLoad = false
            // this.$refs.scroll.finishPullUp()
          }
          this.$refs.scroll.refresh()
          this.$refs.scroll.forceUpdate()
        })
      }).catch()
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
    // position: fixed;
    // top: 100px;
    width: 60%;
    // z-index: 0;

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
  // padding-top: 70%;
  transform-origin: top;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  position: relative;

  .coverImg {}
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
  // padding: 10px;
  // padding-top: 18px;



  .loadTip {
    text-align: center;
  }
}

</style>
