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
      @selectPlay="selectItem"
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
      list: []
    }
  },
  async created() {},
  methods: {
    ...Vuex.mapActions(['selectPlay']),
    async selectItem(item, index) {
      // console.log(item, index);
      await this.playPromise
      this.selectPlay({ list: this.__cloneDeep__(this.list), index })
    },
    async getData() {
      var { data, code } = await this.__getJson(`/getMusicData`, this.query)
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
      list.forEach(item => {
        this.list.push(new Song(item.musicData))
      })
      // this.checkMore()
      this.playPromise = this.getSongUrl(this.list)
      return this.forceUpdated()
    },
    async getSongUrl(list) {
      var mids = list.map(song => {
        return song.mid
      })
      const songParams = {
        mid: mids.join(',')
      }
      var { code, req } = await this.__getJson(`/getMusicPlayData`, songParams)
      if (code == this.__QERR_OK && req.code == this.__QERR_OK) {
        var { midurlinfo } = req.data
        midurlinfo.forEach((mid, index) => {
          list[index].url = `${this.SONG_SOURCE}${mid.purl}`
        })
        // console.log(list)
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
