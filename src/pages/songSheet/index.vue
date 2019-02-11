<template>
  <div>
    <my-loading v-if="hotSongList.length===0"></my-loading>
    <!-- 推荐分类 -->
    <cube-scroll :data="hotSongList" class="cube-scroll" ref="scroll" :options="options" @pulling-up="onPullingUp">
      <recommend-category :isLoading="isLoading" :recommendCategory="recommendCategory"></recommend-category>
      <!-- 精品歌单 -->
      <hot-song-list :hotSongList="hotSongList"></hot-song-list>
      <load-more v-if="hotSongList.length>=100" :show-loading="false" tip="暂无数据"></load-more>
    </cube-scroll>
  </div>
  <!-- </transition> -->
</template>
<script type="text/javascript">
import HotSongList from './hotSongList.vue'
import RecommendCategory from './recommendCategory.vue'
import options from '@/common/mixins/pullUpLoad'
export default {
  name: 'songSheet',
  data() {
    return {
      slide: false,
      enter_active_class: 'slideInRight',
      leave_active_class: '',
      category: [],
      isLoading: true,
      recommendCategory: [],
      hotSongList: [],
      options: this.options,
      sin: 0,
      ein: 9

    };
  },
  created() {

    this.getCategoryOriginData();
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

      var { code, data } = await this.__getJson(`http://${domain}:3000/getHotSongList`, option)
      // (data) 
      let list = data.list
      list.forEach(item => {
        // console.log(item)
        item.id = item.dissid
      })
      if (code == this.__QERR_OK) {
        this.hotSongList.push(...list)
        this.sin += 10;
        this.ein += 10;
      }

    },

    async getCategoryOriginData() {
      var { code, data } = await this.__getJson(`http://${domain}:3000/getCategoryTags`)
      // (data)
      if (code == 0) {
        this.category = data.categories
        this.getRecommendCategory()
      }
    },
    async getRecommendCategory() {
      let num = 3,
        len = this.category.length - 1;
      this.category.forEach((item, index) => {
        if (index == 0) return

        var arr = item.items.slice(0, num)
        this.recommendCategory.push(...arr)
        this.recommendCategory.sort((a, b) => {
          return a.categoryId + b.categoryId
        })
      })

    },

  },
  components: {
    HotSongList,
    RecommendCategory
  },



};

</script>
<style scoped lang="less">
.my-loading {
  top: 50%;
}


.songSheet-page {}

.cube-scroll {
  padding: 14px;
  // height: 90vh;
}

</style>
