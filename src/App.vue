<template>
  <div @click.once="initPlay" id="app" :style="padTopStyle">
    <div class="page" v-show="true">
      <nav-bar v-show="isHome" @on-has-height="h=>navbarHeight=h" :navList="navList" namePrefix='home' ref="navbar"></nav-bar>
      <!-- <cube-loading class="loadingIcon" v-if="!pageLoaded"></cube-loading> -->
      <transition type="animation" :duration="1500" @before-enter="slide=true" @after-enter="slide=false" @before-leave="slide=true" @after-leave="slide=false" :enter-active-class="enter_active_class" :leave-active-class="leave_active_class">
        <keep-alive>
          <!-- <router-view v-if="$route.meta.keepAlive" /> -->
          <router-view :style="routeStyle" :key="$route.query.id" :class="[{fullScreenFixed},{slide},$route.name && $route.matched[0].name+'-page']" />
        </keep-alive>
      </transition>
    </div>
    <!-- 音乐播放器 -->
    <keep-alive>
      <song-player :class="{hidden:!$store.getters.playlist.length>0}"></song-player>
    </keep-alive>
  </div>
</template>
<script>
import SongPlayer from '@/pages/songPlayer'
export default {

  data() {
    return {
      slide: false,
      enter_active_class: '',
      leave_active_class: '',
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
    routeStyle() {
      let style = {}
      if (this.isHome) {

        style.top = this.navbarHeight + 'px'
      }
      return style
    },
    padTopStyle() {
      return { paddingTop: this.isHome && !this.fullScreen ? this.navbarHeight + 'px' : 0 }
    },
    ...Vuex.mapGetters(['fullScreen', 'initialed', 'currentSong']),
    // ...Vuex.mapState(['navbarHeight']),
    fullScreenFixed() {
      // console.log(this.$route);
      var ret;
      this.$route.matched.forEach(route => {
        // var ret;
        if (route.meta.fullScreenFixed) {
          ret = route.meta.fullScreenFixed;
        }
      })

      return ret
    },
    isHome() {
      // console.log(this.$route);

      var routeName = this.$route.name;
      var isHome = routeName ? this.$route.matched[0].meta.isHome : true;
      return isHome
    },
  },
  created() {
    // this.canplayPromise = null;
  },
  watch: {
    '$route': function(to, from) {


      // try {
      to = to.matched[0]
      from = from.matched[0]
      console.log(to, from)
      if (!to || !from) {
        return
      }
      var useSlide = to && to.meta && to.meta.useSlide
      if (!useSlide) {
        this.enter_active_class = ''

        this.leave_active_class = ''
        return
      }
      var fromIndex = from.meta.index
      var toIndex = to.meta.index
      if (toIndex < fromIndex) {
        this.enter_active_class = 'slideInLeft'
        this.leave_active_class = 'slideOutRight'

      } else {
        this.enter_active_class = 'slideInRight'
        this.leave_active_class = 'slideOutLeft'
      }
      if (to.meta && to.meta.back) {
        this.enter_active_class = ''

      }
      if (to.meta && to.meta.forward) {
        this.leave_active_class = ''

      }
      // } catch (err) {
      // console.log(err)
      // }
    }
  },
  mounted() {},
  components: { SongPlayer },
  methods: {
    onBack() {
      console.log('enter_active_class=')
      this.enter_active_class = ''
    },
    initPlay() {
      // console.log('initPlay');

      $('audio') && $('audio')[0].play().catch(err => {
        console.log(err);
      })
      // await this.canplayPromise;
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

  .navbar {
    // .font-dpr(16Px); // font-size: 16px;
  }

}

.loadingIcon {
  font-size: 80px !important;
  z-index: 10;
}

.slide {
  animation-duration: .5s !important;
  width: 100vw;
  position: fixed;
  // top: 40px;
  // transition: transform 500ms linear;
}

</style>
