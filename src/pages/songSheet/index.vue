<template>
  <div>
    <!-- 推荐分类 -->
    <cube-scroll class="cube-scroll" ref="scroll" :options="options" @pulling-up="onPullingUp">
      <recommend-category :isLoading="isLoading" :recommendCategory="recommendCategory"></recommend-category>
      <!-- 精品歌单 -->
      <hot-song-list @updated="refresh" :hotSongList="hotSongList"></hot-song-list>
      <load-more v-if="hotSongList.length>=100" :show-loading="false" tip="暂无数据"></load-more>
    </cube-scroll>
  </div>
</template>
<script type="text/javascript">
import HotSongList from './hotSongList.vue'
import RecommendCategory from './recommendCategory.vue'
export default {
  name: 'songSheet',
  data() {
    return {
      category: [],
      isLoading: true,
      recommendCategory: [],
      hotSongList: [],
      options: {
        pullUpLoad: true
      },
      sin: 0,
      ein: 9

    };
  },
  created() {

    // setTimeout(this.getHotSongList)

    var promise = Promise.all([this.getCategoryOriginData(), this.getHotSongList()]).then(() => {
      // this.isLoading = false
      // this.setPageOnload({ pageLoaded: true })
    })
    this.setPageState(promise)

  },
  activated() {
    this.$refs.scroll && this.$refs.scroll.refresh()
  },
  methods: {
    ...Vuex.mapMutations(['setPageOnload']),
    ...Vuex.mapActions(['setPageState']),

    onPullingUp() {

      // ('pullUpLoad')
      this.getHotSongList()

    },
    getHotSongList() {
      var option = {
        sin: this.sin,
        ein: this.ein
      }
      if (this.lasttime) {
        option.lasttime = this.lasttime
      }
      /*var url = 'https://api.bzqll.com/music/netease/highQualitySongList?key=579621905';
      var params = '';
      for (var key in option) {
        params += `&${key}=${option[key]}`
      }*/

      return new Promise((resolve, reject) => {

        this.__getJson(`http://${domain}:3000/getHotSongList`, option).then(data => {
          // (data) 
          let list = data.data.list
          list.forEach(item => {
            // console.log(item)
            item.id = item.dissid
          })
          if (data.code == 0) {
            this.hotSongList.push(...list)
            // this.lasttime = data.data.lasttime
            this.sin += 10;
            this.ein += 10;
            resolve()
            // this.refresh()
            if (this.hotSongList.length >= 100) {
              this.options.pullUpLoad = false
            }
          } else {
            reject('data err')
          }
        })
      })

    },
    refresh() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.forceUpdate()
      /*setTimeout(() => {
this.$refs.scroll.refresh()
this.$refs.scroll.forceUpdate()
('refresh')
}, 100)
*/
    },
    getCategoryOriginData() {
      this.__getJson(`http://${domain}:3000/getCategoryTags`).then(data => {
        // (data)
        if (data.code == 0) {
          this.category = data.data.categories
          this.getRecommendCategory()
        }
      })
    },
    getRecommendCategory() {
      let num = 3,
        len = this.category.length - 1;
      return new Promise((resolve, reject) => {
        console.log()
        this.category.forEach((item, index) => {
          if (index == 0) return

          var arr = item.items.slice(0, num)
          this.recommendCategory.push(...arr)
          this.recommendCategory.sort((a, b) => {
            return a.categoryId + b.categoryId
          })
        })

        if (this.recommendCategory.length >= num * len) {
          resolve()
        } else {
          reject('data err')
        }
      })
    }
  },
  components: {
    HotSongList,
    RecommendCategory
  }
};

</script>
<style scoped lang="less">
.icon-loading {
  display: flex;
  justify-content: center;
  margin-top: 140px;
  font-size: 130px;
}

.songSheet-page {
  padding: 14px 20px;
}

.cube-scroll {
  // height: 90vh;
}

</style>
