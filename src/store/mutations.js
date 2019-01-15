export default {
  resetPageState(state) {

    state.pageLoaded = false
  },
  setPageOnload(state, payload) {
    state.pageLoaded = true;
  },
  emitNavbarHeight(state, navbarHeight) {
    state.navbarHeight = navbarHeight
  }

}
