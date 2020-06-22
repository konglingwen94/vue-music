<template>
  <cube-scroll
    class="scrollWrapper"
    ref="scroll"
    @pulling-up="onPullingUp"
    :scroll-events="['scroll','scroll-end']"
    @scroll="onScroll"
    :options="options"
  >
    <list-view
      @music-selected="selectItem "
      hasIndex
      name="music-list"
      :list="list"
      :keyInfo="{title:'name',desc:'singer'}"
    ></list-view>
  </cube-scroll>
</template>
<script type="text/javascript">
import mixin from '../mixin.js'
 
import ListView from '../listView-tpl.vue'

export default {
  // name: 'singerMusic',
  mixins: [mixin],
  components: { ListView },
  data() {
    return {
      list: [],
      loading: false
    }
  },
  computed: {
    query() {
      var num = 50
      switch (true) {
        case this.total >= 500:
          num = 70
          break
        case this.total > 200:
          num = 40
      }
      return {
        singermid: this.$route.query.mid,
        begin: this.begin,
        num // 设置数据加载个数
      }
    }
  },
  methods: {
    ...Vuex.mapActions(['selectPlay']),
    async selectItem(item, index) {
      
      await this.playPromise
      this.selectPlay({ list: this.__cloneDeep__(this.list), index })
    },
    async getData() {
      if (this.loading) {
        return
      }

      this.loading = true
      var list = await this.__getJson(`/getMusicData`, this.query)
      this.loading = false

      return this.getListViewData(list)
    },
    async getListViewData(list) {
      list.forEach(item => {
        this.list.push(new Song(item))
      })

      this.list = this.__uniqBy__(this.list, 'id')
     
      return this.forceUpdated()
    }
  }
}
</script>
<style scoped lang="less">
.musicIcon {
  width: 40px;
  border-radius: 50%;
  height: 40px;
}

.loading-wrap {
  height: 100%;
  .posCenter(loadingIcon);
}

.stop {
  position: fixed;
  right: 80px;
  bottom: 150px;
  z-index: 100;
}
</style>
