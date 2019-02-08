<template>
  <div @click.once="initPlay" id="app" style="">
    <div class="page">
      <nav-bar class="home-navbar" :navList="navList" namePrefix='home' ref="navbar"></nav-bar>
      <!-- <cube-loading class="loadingIcon" v-if="!pageLoaded"></cube-loading> -->
      <transition :name="transitionName" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
        <keep-alive>
          <router-view ref="page" @transitionend.native="ontransitionend" :style="zIndex" :key="$route.query.id" :class="[{fullScreenFixed},pageCls]" />
        </keep-alive>
      </transition>
    </div>
    <!-- 音乐播放器 -->
    <!-- <keep-alive> -->
    <song-player></song-player>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import SongPlayer from '@/pages/songPlayer'
export default {

  data() {
    return {
      transitionName: '',
      navbarHeight: 0,
      navList: [{
        label: '歌手',
        name: 'singer',
        // link: '/singer'
      }, {
        label: '歌单',
        name: 'songSheet',
        // link: '/songSheet'
      }, {
        label: '视频',
        name: 'mv',
        link: '/mv'
      }, {
        label: '搜索',
        name: 'search',
        link: '/search'
      }],
      // names: []
    }
  },
  computed: {
    zIndex() {
      console.log(this.$refs.page);
      return {
        zIndex: this.$route.name ? this.$route.matched[0].meta.index : 0
      }
    },
    pageCls() {
      return this.$route.name ? this.$route.matched[0].name + '-page' : ''
    },
    fullScreenFixed() {
      // console.log(this.$route);
      var matchRoutes = this.$route.matched;
      return matchRoutes[0] && matchRoutes[0].meta.fullScreenFixed
    },
  },
  created() {
    // this.canplayPromise = null;
  },
  watch: {
    '$route': function(to, from) {
      if (!to.name || !from.name) {
        return
      }

      this.setTransitionName(to, from);
    }
  },
  components: { SongPlayer },
  methods: {
    enter(el, done) {
      console.log('enter');
      setTimeout(done, 300)
    },
    afterEnter() {
      console.log('afterEnter');
    },
    leave(el, done) {
      console.log('leave');
      setTimeout(done, 300)

    },
    afterLeave() {
      console.log('after-leave');
    },
    ontransitionend() {
      // console.log('ontransitionend')

    },
    setTransitionName(to, from) {
      to = to.matched[0]
      from = from.matched[0]

      const fromIndex = from.meta.index
      const toIndex = to.meta.index
      if (toIndex < fromIndex) {
        this.transitionName = 'prev'
        if (fromIndex >= 4) {

          this.transitionName = 'back'

        }
      } else {
        this.transitionName = 'next'
        if (!to.meta.isHome) {
          this.transitionName = 'forward'

        }

      }

    },
    initPlay() {
      try {
        $('audio')[0].play()

      } catch (err) {
        console.error(err);
      }
    }
  }
}

</script>
<style scoped lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .posCenter(loadingIcon);

  .page {
    position: fixed;
    width: 100vw;
    top: 0;
    // overflow-y: auto;
  }

  .home-navbar {
    line-height: 2;
  }
}

.loadingIcon {
  font-size: 80px !important;
  z-index: 10;
}



.next-enter-active,
.next-leave-active,
.prev-leave-active,
.prev-enter-active,
.back-enter-active,
.back-leave-active,
.forward-enter-active,
.forward-leave-active,
  {
  transition: all .3s;
  width: 100vw;

  position: fixed;

}

.next-enter,
.prev-leave-to,
.back-leave-to,
.forward-enter {
  transform: translate3d(100vw, 0, 0)
}

.next-leave-to,
.prev-enter {
  transform: translate3d(-100vw, 0, 0)
}

.next-enter-to,
.prev-leave {
  transform: translate3d(0, 0, 0)
}

</style>
