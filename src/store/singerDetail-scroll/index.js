export default {
  namespaced: true,
  state: {
    scrollY: 0,
    picHeight: 0,
    navbarHeight: 0
  },
  getters: {
    scrollWrapperHeight({ navbarHeight, picHeight }) {
      var h = innerHeight - picHeight - navbarHeight
      // console.log(navbarHeight);
      return h;
    }
  },
  mutations: {

    emitHeight(state, { pageHeight, picHeight }) {
      state.picHeight = picHeight
      state.pageHeight = pageHeight
    }
  },

  actions: {}
}
