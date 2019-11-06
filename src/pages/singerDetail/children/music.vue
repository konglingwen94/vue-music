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
// import { getPlayUrl } from '@/config/song'
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
      // console.log(item, index);
      await this.playPromise
      this.selectPlay({ list: this.__cloneDeep__(this.list), index })
    },
    async getData() {
      if (this.loading) {
        return
      }

      this.loading = true
      var { data, code } = await this.__getJson(`/getMusicData`, this.query)
      this.loading = false
      if (!this.total) {
        this.total = data.total
      }
      if (code == 0) {
        this.netNormal = true
        return this.getListViewData(data.list)
      } else {
        throw Error('err')
      }
    },
    async getListViewData(list) {
      const playlist = await this.getSongUrl(list.map(item => item.musicData))

      playlist.forEach(item => {
        this.list.push(new Song(item))
      })

      this.list = this.__uniqBy__(this.list, 'id')
      // this.checkMore()
      return this.forceUpdated()
    },
    async getSongUrl(list) {
      var mids = list.map(song => {
        return song.songmid
      })
      const songParams = {
        mid: mids.join(',')
      }
      var { code, req } = await this.__getJson(`/getMusicPlayData`, songParams)
      if (code == this.__QERR_OK && req.code == this.__QERR_OK) {
        var { midurlinfo } = req.data
        midurlinfo.forEach((mid, index) => {
          list[index].url = `${this.SONG_SOURCE}${mid.purl}`
          list[index].purl = mid.purl
          list[index].errorPic=this.$route.query.picUrl
        })

        return list.filter(item => item.purl)
      }
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
