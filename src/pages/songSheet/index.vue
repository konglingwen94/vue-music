<template>
  <div>
    <my-loading v-if="hotSongList.length===0"></my-loading>
    <!-- 推荐分类 -->
    <cube-scroll
      :data="hotSongList"
      class="scroll-wrapper"
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    >
      <category :category="recommend"></category>
      <!-- 精品歌单 -->
      <hot-song-list :hotSongList="hotSongList"></hot-song-list>
    </cube-scroll>
  </div>
</template>
<script type="text/javascript">
import HotSongList from './hotSongList.vue'
import Category from './category.vue'
export default {
  name: 'songSheet',
  data() {
    return {
      recommend: [],
      hotSongList: [],
      options: this.options,
      sin: 0,
      ein: 9
    }
  },
  created() {
    this.getCategoryData()
    this.getHotSongList()
  },
  activated() {
    this.$refs.scroll && this.$refs.scroll.refresh()
  },
  methods: {
    onPullingUp() {
      this.getHotSongList()
    },
    async getHotSongList() {
      var option = {
        sin: this.sin,
        ein: this.ein
      }
      if (this.lasttime) {
        option.lasttime = this.lasttime
      }

      var { code, data } = await this.__getJson(this.__SONG_SHEET_LIST, option)
       
      let list = data.list
      list.forEach(item => {
         
        item.id = item.dissid
      })
      if (code == this.__QERR_OK) {
        this.hotSongList.push(...list)
        this.sin += 10
        this.ein += 10
      }
    },

    async getCategoryData() {
      var { code, data } = await this.__getJson(
        `/getCategoryTags`
      )
    
      if (code == 0) {
        this.category = data.categories
        this._formatCategory()
      }
    },
    async _formatCategory() {
      let num = 3
      this.category.forEach((item, index) => {
   
        if (index == 0) return

        const arr = item.items.slice(0, num)
        this.recommend.push(...arr)
        this.recommend.sort((a, b) => {
          return a.categoryId + b.categoryId
        })
      })
    }
  },
  components: {
    HotSongList,
    Category
  }
}
</script>
<style scoped lang="less">
.my-loading {
  top: 50%;
}

 

.scroll-wrapper {
  margin-top: 14px;
  padding: 0 14px;
}
</style>
