import Vue from 'vue'
// 引入vux组件
import { XCircle, Range, XTable, XHeader, Search } from 'vux'
// 全局注册vux组件
Vue.component('x-table', XTable)
// Vue.component('load-more', LoadMore)
Vue.component('x-header', XHeader)
Vue.component('x-search', Search)
Vue.component('x-range', Range)
Vue.component('x-circle', XCircle)
