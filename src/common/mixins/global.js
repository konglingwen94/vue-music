import Vue from 'vue'
Vue.mixin({
  created() {
    // 设置自定义组件name
    this.setCompName()
    // if (this.$route && this.$route.name) {

    // console.log(this.$option.name);
    // }
  },
  beforeMounte() {},
  mounted() {
    // 设置页面class
    // this.setPageClass()
    // 设置滚动容器高度
    this.setScrollWrapHeight()
    // this.setAppPadTop()
  },
})
