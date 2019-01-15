import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'


import singerDetail from './singerDetail-scroll'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV == 'production'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    singerDetail
  },
  state,
  getters,
  mutations,
  actions,
  strict: debug,

  plugins: debug ? [createLogger()] : []

})

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./getters', './mutations.js', './actions.js'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newGetters = require('./getters').default
    const newMutations = require('./mutations').default
    const newActions = require('./actions').default
    // const singerDetail = require('./singerDetail-scroll').default
    // 加载新模块
    store.hotUpdate({
      getters: newGetters,
      mutations: newMutations,
      actions: newActions,
      modules: {
        // singerDetail
      }
    })
  })
}
export default store
