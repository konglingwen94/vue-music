import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./state.js', './mutations', './actions', './getters.js'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newState = require('./state').default
    const newMutations = require('./mutations').default
    const newActions = require('./actions').default
    const newGetters = require('./getters').default
    // 加载新模块
    store.hotUpdate({
      state: newState,
      getters: newGetters,
      mutations: newMutations,
      actions: newActions,
      modules: {
        // a: newModuleA
      }
    })
  })
}

export default store
