<template>
  <div id="app" :style="{paddingTop:isHome?navbarHeight+'px':0}">
    <nav-bar v-show="isHome" @on-has-height="h=>navbarHeight=h" :navList="navList" namePrefix='home' ref="navbar"></nav-bar>
    <!-- <cube-loading class="loadingIcon" v-if="!pageLoaded"></cube-loading> -->
    <div class="page" v-show="!$store.state.fullScreen">
      <keep-alive>
        <!-- <router-view v-if="$route.meta.keepAlive" /> -->
        <router-view :key="$route.query.id" :class="[{fullScreenFixed},$route.name && $route.matched[0].name+'-page']" />
      </keep-alive>
    </div>
    <!-- 音乐播放器 -->
    <song-player v-show="$store.getters.playlist.length>0"></song-player>
  </div>
</template>
<script>
import SongPlayer from '@/pages/songPlayer'
export default {

  data() {
    return {
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
    // ...Vuex.mapGetters(['pageLoaded']),
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

  },
  watch: {

  },
  mounted() {},
  components: { SongPlayer },
  methods: {


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

</style>
