export default {
  setPageState(ctx, promise) {
    if (ctx.state.pageLoaded) {

      ctx.commit('resetPageState');
    }
    promise.then(() => {
      ctx.commit('setPageOnload')
    })
  }
}
