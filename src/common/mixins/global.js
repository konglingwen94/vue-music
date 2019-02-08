import Vue from 'vue'
Vue.mixin({
  computed: {
    ...Vuex.mapGetters(['miniPlayerHeight', 'hasPlaylist'])
  },
  created() {
    // 设置自定义组件name
    this.setCompName()

    this.hasVerticalScroll = !!this.findVerticalScroll()
    if (this.$attrs.hasOwnProperty('local')) {
      return
    }
    if (this.hasVerticalScroll) {

      this.$watch('hasPlaylist', () => {
        console.log('hasplaylist')
      })
    }
    // if (this.$route && this.$route.name) {

    // console.log(this.$option.name);
    // }
  },
  beforeMounte() {},
  mounted() {
    // this.$scroll = this.findVerticalScroll();
    // 设置页面class
    // this.setPageClass()
    // 设置滚动容器高度
    this.setScrollWrapHeight()



  },
  deactivated() {
    if (this.$attrs.hasOwnProperty('local')) {
      return
    }

    this.hasVerticalScroll && this.unwatch()
  },
  methods: {
    async setWrapHeight(newVal) {

      await this.$nextTick()


      var height = parseFloat(this.wrapperEl.dataset.height);
      var mHeight = parseFloat(this.wrapperEl.dataset.mheight),
        newheight = 0;
      if (newVal) {

        newheight = mHeight;
        $(this.wrapperEl).attr('hasplaylist', '')
      } else {
        newheight = height;
        $(this.wrapperEl).removeAttr('hasplaylist')

      }
      $(this.wrapperEl).css({ height: newheight })
      // this.hasPlaylist
      // console.log(this.wrapperEl)
      this.refresh()
    }
  },
  async activated() {

    if (this.$attrs.hasOwnProperty('local')) {
      return
    }
    // this.$scroll = this.findVerticalScroll();
    if (this.hasVerticalScroll) {
      await this.$nextTick()
      if (!this.wrapperEl) {

        this.wrapperEl = this.$el.dataset.height ? this.$el : this.$el.parentElement

        // this.hasMHeight = this.wrapperEl.hasAttribute('data-mHeight')
      }
      // if (this.hasPlaylist && ) {}
      var hasplaylist = this.wrapperEl.hasAttribute('hasplaylist')
      var initialed = this.wrapperEl.hasAttribute('initialed')
      var immediate = (this.hasPlaylist != hasplaylist)
      // console.log(this.hasPlaylist, hasplaylist, immediate)
      // this.setWrapHeight()
      this.unwatch = this.$watch('hasPlaylist', (newVal) => {


        this.setWrapHeight(newVal)
        console.log(' watch immediate')

      }, { immediate })
    }
  }
})
