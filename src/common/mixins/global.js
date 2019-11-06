import Vue from 'vue'
import { mapGetters } from 'vuex'
Vue.mixin({
  computed: {
    miniPlayerHeight() {
      if (this.$store) {
        return this.$store.state.miniPlayerHeight
      }
    },
    hasPlaylist() {
      if (this.$store) {
        return this.$store.state.hasPlaylist
      }
    },
     
  },
  
  created() {
    // 设置自定义组件name
    this.setCompName()

    this.hasVerticalScroll = !!this.findVerticalScroll()
    if (this.hasVerticalScroll) {
      this.flagLeave = false
    }
  },
  mounted() {
    // 设置滚动容器高度
    this.setScrollWrapHeight()
  },
  deactivated() {
    if (this.$attrs.hasOwnProperty('local')) {
      return
    }

    if (this.hasVerticalScroll) {
      this.flagLeave = this.hasPlaylist
      this.unwatch && this.unwatch()
    }
  },
  methods: {
    async setWrapHeight(newVal, oldVal) {
      await this.$nextTick()

      var maxHeight = parseFloat($(this.wrapperEl).attr('maxHeight')),
        minHeight = 0
      if (newVal > 0) {
        minHeight = maxHeight - this.miniPlayerHeight
        $(this.wrapperEl)
          .css({ height: minHeight })
          .attr('minHeight', minHeight)
      } else {
        $(this.wrapperEl).css({ height: maxHeight })
      }
      // this.hasPlaylist
      // console.log(this.wrapperEl, newVal, oldVal)
      this.refresh()
    },
  },
  async activated() {
    if (this.$attrs.hasOwnProperty('local') || !this.hasVerticalScroll) {
      return
    }
  
    await this.$nextTick()

     

    var immediate = false
    if (!this.wrapperEl) {
      return
    }
    immediate = this.hasPlaylist !== this.flagLeave
    
    this.unwatch = this.$watch(
      'miniPlayerHeight',
      (newVal, oldVal) => {
        this.setWrapHeight(newVal, oldVal)
        console.log(' watch immediate')
      },
      { immediate }
    )
  },
})
