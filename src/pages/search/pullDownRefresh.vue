<template>
  <!-- <cube-page type="scroll-view" title="Scroll" class="toutiao"> -->
  <header ref="topHeader"><img src="https://dpubstatic.udache.com/static/dpubimg/0K9-YvWB-Q/toutiao_header2.png"></header>
    <div class="nav-scroll-list-wrap">
      <cube-scroll ref="navScroll" direction="horizontal">
        <ul class="nav-wrapper">
          <li v-for="(item, index) in navTxts" :key="index" class="nav-item">{{ item }}</li>
        </ul>
      </cube-scroll>
      <div class="more-wrapper">
        <span class="more"></span>
      </div>
    </div>
    <div class="content-scroll-wrapper">
      <div class="content-scroll-list-wrap" ref="scrollWrapper">
        <cube-scroll ref="contentScroll" :data="content" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
          <ul class="imgs-wrapper">
            <li v-for="(item, index) in content" :key="index" class="imgs-item">
              <img :src="item.url" @load="onImgLoad">
              </li>
          </ul>
          <template slot="pulldown" slot-scope="props">
            <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style="props.pullDownStyle">
              <div v-if="props.beforePullDown" class="before-trigger" :style="{paddingTop: props.bubbleY + 'px'}">
                <span :class="{rotate: props.bubbleY > 0}">↓</span>
              </div>
              <div class="after-trigger" v-else>
                <div v-show="props.isPullingDown" class="loading">
                  <cube-loading></cube-loading>
                </div>
                <transition name="success">
                  <div v-show="!props.isPullingDown" class="text-wrapper"><span class="refresh-text">今日头条推荐引擎有x条更新</span></div>
                </transition>
              </div>
            </div>
          </template>
        </cube-scroll>
      </div>
    </div>
    <footer ref="footer"><img src="https://dpubstatic.udache.com/static/dpubimg/1KRE2YnAim/toutiao_footer2.png"></footer>
      <!-- </cube-page> -->
</template>
<script>
// import CubePage from '../../components/cube-page.vue'

const imgs = [{
    url: 'https://dpubstatic.udache.com/static/dpubimg/7EzIhoEvnG/toutiao_12.JPG'
  },
  {
    url: 'https://dpubstatic.udache.com/static/dpubimg/GR0Piaf5sz/toutiao_21.JPG'
  },
  {
    url: 'https://dpubstatic.udache.com/static/dpubimg/K1JqUN8HSA/toutiao_31.JPG'
  }
]

const txts = ['关注', '推荐', '新时代', '热点', '体育', '娱乐', '科技', '头条号', '问答', '国际', 'cube-ui666']

let cnt = 1
export default {
  data() {
    return {
      content: imgs.slice(),
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true
      },
      navTxts: txts,
      secondStop: 26
    }
  },
  components: {
    // CubePage
  },
  methods: {
    onPullingDown() {
      setTimeout(() => {
        this.content.unshift(imgs[cnt++ % 3])
        this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
      }, 1000)
    },
    onPullingUp() {
      setTimeout(() => {
        this.content = this.content.concat(imgs)
      }, 1000)
    },
    onImgLoad() {
      const contentScroll = this.$refs.contentScroll
      contentScroll.scroll.beforePullDown && contentScroll.refresh()
    }
  },
  mounted() {}
}

</script>
<style src="./toutiao.styl" lang="stylus" rel="stylesheet/stylus">
</style>
