<template>
  <div>
    <!-- 顶部导航 -->
    <mt-header class="mt-header" fixed :title="$route.query.name">
      <!-- 返回到上一级按钮 -->
      <mt-button @click="$router.push({name:'singer'})" slot="left" icon="back">返回</mt-button>
      <!-- 右侧显示更多按钮 -->
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- 主题背景 -->
    <div :style="[themeBgStyle]" class="themeBg" v-lazy:background-image="$route.query.picUrl">
      {{$route.matche}}
      <!-- 背景遮罩 -->
      <div :style="[themeFilterStyle]" class="themeFilter"></div>
    </div>
    <!-- 偏移容器 -->
    <div class="offsetBody" :style="offsetBodyStyle">
      <!-- 导航栏 -->
      <nav-bar @on-has-height="h=>navbarHeight=h" :style="[translateYStyle]" :query="$route.query" :navList="navList" class="navbar"></nav-bar>
      <!-- 偏移遮罩 -->
      <div :style="[translateYStyle,layerStyle]" class="layer">
        <!-- 子页面初始化状态提示 -->
        <div class="sonPageState">
          <!-- 加载中 -->
          <cube-loading v-if="pageState.isLoading" class="loadingIcon" :size="50*__DPR"></cube-loading>
          <!-- 无网络提示 -->
          <p class="abortInfo" v-else-if="pageState.isAbort">网络未连接，检查网络后点击页面尝试重新加载</p>
        </div>
      </div>
      <!-- 滚动容器 -->
      <div class="scroll-contain">
        <!-- 子页面保持状态 -->
        <keep-alive>
          <!-- 子页面载体 -->
          <router-view ref="child" :pageState.sync="pageState" :offsetToTop="offsetToTop" :translateY="translateY" :scrollY.sync="scrollY" class="scroll-wrapper" :style="scrollStyle"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { prefixStyle } from '@/config/dom.js'
const filter = prefixStyle('backdrop-filter')
export default {
  // name: 'singerDetail',

  data() {
    return {
      // scroll: {},
      navList: [], //子页面切换导航列表
      topNavHeight: 0, //顶部导航高度
      translateY: 0, //页面偏移距离
      scrollMinY: 0, //页面偏移最小距离
      offsetToTop: false, //页面是否偏移到最小距离
      picHeight: 0, //主题背景图高度
      scrollY: 0, //实时滚动位置
      scrollWrapHeight: 0, //滚动容器高度
      // 子页面初始化状态
      pageState: {
        isLoading: false, //加载中
        isAbort: false //加载中断
      },
      navbarHeight: 0 //导航列表高度
    };
  },
  computed: {
    // 偏移主体
    offsetBodyStyle() {
      return {
        top: `${this.picHeight}px`
      }
    },
    // 滚动容器
    scrollStyle() {
      return {
        // height: `${this.scrollWrapHeight}px`
      }
    },
    // 偏移遮罩
    layerStyle() {
      return {
        height: `${this.scrollWrapHeight + Math.abs(this.translateY)}px`
      }
    },
    // 实时偏移
    translateYStyle() {
      return {

        transform: `translateY(${this.translateY}px)`
      }
    },
    themeBgStyle() {
      var height = '40vh';
      height = this.offsetToTop ? this.topNavHeight + 'px' : height
      return {
        height,
        zIndex: this.zIndex,
        transform: `scale(${this.scrollY > 0 ? this.scale : 1})`
      }
    },
    themeFilterStyle() {
      return {
        'backdrop-filter': `blur(${this.scrollY < 0 ? this.blur : 0}px)`
      }
    },
  },
  watch: {

    scrollY(y) {
      // 设置向上滚动实际偏移距离
      this.translateY = Math.max(y, this.scrollMinY)

      // 获取滚动距离相对于背景图片高度的比例
      var percent = Math.abs(y / this.picHeight)
      // 设置图片放大倍数
      this.scale = 1 + percent
      // 设置图片模糊值
      this.blur = Math.min(30, 30 * percent)
      // 如果容器向下滚动，放大图片
      this.zIndex = 0;
      // 判断是否滚动到顶部
      if (y <= this.scrollMinY) {
        this.zIndex = 10;
        this.offsetToTop = true
      } else {
        this.offsetToTop = false

      }
      if (y > 0) {
        this.zIndex = 10
      }
    },
  },
  created() {

    // 获取当前歌手列表信息总数
    this.getSingerTotal()
    // 获取歌手子路由信息
    // console.log(this.$options.__file);
    var name = this.$route.matched[0].name
    var curRoute = this.$router.options.routes.find(item => item.name == _.camelCase(name))
    // 获取当前列表导航项列表名称
    // console.log(curRoute.children);
    this.navList = curRoute.children.map((item) => {
      delete item.component;
      delete item.path;
      return item;
    })

  },
  mounted() {

    this.$nextTick(() => {
      // 获取顶部导航栏高度
      this.topNavHeight = $('.mt-header').height()
      // 获取背景图片高度
      this.picHeight = $('.themeBg').height();
      // 获取滚动容器高度
      this.scrollWrapHeight = innerHeight - this.picHeight - this.navbarHeight;

      // 设置向上滚动最小偏移距离
      this.scrollMinY = this.topNavHeight - this.picHeight;
    })
  },

  methods: {
    onScroll(y) {
      // this.scrollY = y;
      // console.log(y)
    },

    getSingerTotal() {
      let singermid = this.$route.query.mid;
      let num = 1;
      Promise.all([this.__getJson(`http://${domain}:3000/getMusicData`, {
        singermid,
        num,
      }), this.__getJson(`http://${domain}:3000/getAlbumData`, {
        singermid,
        num,
      }), this.__getJson(`http://${domain}:3000/getMvData`, {
        singermid,
        num,
      })]).then(res => {

        res.forEach((item, key) => {
          if (!item.singerAlbum) {
            Vue.set(this.navList[key], 'total', item.data.total);
            // totalInfo.push(item.data.total)

          } else {
            Vue.set(this.navList[key], 'total', item.singerAlbum.data.total)
            // totalInfo.push(item.singerAlbum.data.total)

            // this.navList[key].total = 

          }
        })

      })

    },
  }
};

</script>
<style scoped lang="less">
.mt-header {
  z-index: 30;
  background: transparent !important;
}

.themeBg {
  position: relative;
  // height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  transform-origin: top;

  .themeFilter {
    background: rgba(0, 0, 0, .2);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

.bgBox {
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  // width: 100%;
}

.navbar {
  position: relative;
  // top: 50px;
  z-index: 30;
  min-height: 30px;
  width: 100%;
}

// 遮罩
.layer {

  .posCenter(sonPageState);

  .sonPageState {
    // height: 100%;
    z-index: 10;
  }

  background: #eee;
  height: 100vh;
  z-index: 1;
  // transform: scaleY(10);
  position: absolute;
  width: 100%;

  border: 1px solid blue;
}

// 滚动主体
.offsetBody {
  position: absolute;
  width: 100%;
}

// 滚动容器
.scroll-contain {
  // padding-top: 40px;
  // position: absolute;
  width: 100%;

}

.scroll-wrapper {
  // height: 350px;
  overflow: visible;
  background-color: #eee;
  border: 1Px solid red;
}

</style>
