<template>
  <cube-scroll class="scrollWrapper" ref="scroll" @pulling-up="onPullingUp" :scroll-events="['scroll','scroll-end']" @scroll="onScroll" :options="options">
    <list-view hasIndex name="music-list" :list="list" :keyInfo="{title:'name',desc:'singer'}">
    </list-view>
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
    };
  },
  methods: {
    async getData() {

      var data = await this.__getJson(`http://${domain}:3000/getMusicData`, this.query);
      if (!this.total) {
        this.total = data.data.total
      }
      if (data.code == 0) {
        this.netNormal = true;
        return this.getListViewData(data.data.list)
      } else {
        throw Error('err')
      }

    },
    async getListViewData(list) {

      list.forEach(item => {
        this.list.push(new Song(item.musicData))

      })
      // this.checkMore()

      return this.forceUpdated()
    }
  }
};

</script>
<style scoped lang="less">
.musicIcon {
  width: 40px;
  border-radius: 50%;
  height: 40px;
}

.loading-wrap {
  height: 100%;
  .posCenter(loadingIcon)
}

.stop {
  position: fixed;
  right: 80px;
  bottom: 150px;
  z-index: 100;
}

</style>
