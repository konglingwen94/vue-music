import Vue from 'vue'

Vue.component('jsx-music', {
  data() {
    return {}
  },
  props: {
    useCubeScroll: {
      type: Boolean,
      default: false
    }
  },
  render(createElement) {
    // console.log(this.$attrs)
    // let rootTag = this.useCubeScroll ? 'cube-scroll' : 'div';
    /*return createElement(rootTag, {
      'class': 'music-list'
    }, [this.$slots.default, Array.apply(null, { length: 10 }).map((item, key) => {
      return createElement('p', 'h' + key)
    })])*/
    return <cube-scroll>
        <mark>Hello</mark>
        <span> world!</span>
      </cube-scroll>
  }
})
