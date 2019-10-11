export default (Vue) => {
  Vue.directive("hidden", {
    bind() {
      // console.log('bind')
    },
    update(el, binding) {
      // el.focus();
      // console.log('inserted')
      var value = binding.value;
      var oldValue = binding.oldValue;
      if (value == oldValue) {
        return
      }
      if (value) {

        el.style = `height:0;overflow:hidden;visibility:hidden`;
      } else {
        el.style = `height:auto;overflow:visible;visibility:visible`
      }

    },

    inserted() {
      // console.log('update')
    },
    componentUpdated() {
      // console.log('componentUpdated')

    }

  })
}
