import 'lib-flexible'
// 注册全局组件
import './registerComp/custom.js'
import './registerComp/cube.js'
import './registerComp/mint.js'
import './registerComp/vux.js'

// 引入全局自定义样式
// import './style/global.less'
import './style'
// import 'swiper/dist/css/swiper.css'
// 引入第三方库样式
import 'vue2-animate/dist/vue2-animate.min.css';

// 引入布局框架
import './config/index.js'
import Resource from 'vue-resource'
import store from './store/index.js'
import Vue from 'vue'

// 引入调试工具
import vconsole from 'vconsole'

import App from './App'
// import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// import Cube from 'cube-ui'
import vueTap from 'v-tap';

// 全局设置mixin
import './common/mixins/global.js'
import './jsx'

Vue.use(vueTap);

Vue.use(Resource)


// new vconsole()


Vue.use(VueLazyLoad, {
  // preLoad: 1,
  error: require('./assets/logo.png'),
  loading: require('./assets/logo.png')
})



if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


Vue.config.productionTip = false

/* eslint-disable no-new */
window.store = store


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
