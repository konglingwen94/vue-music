<template>
  <cube-scroll class="song-page" :data="list" @pulling-down="onPullingDown" :options="options">
    <my-loading v-if="list.length===0"></my-loading>
    <pull-down-refresh :limit="pulldownLimit" :props="props" slot="pulldown" slot-scope="props"></pull-down-refresh>
    <transition @enter="enter" @after-enter="afterEnter">
      <music-list @hasHeight="getItemHeight" :key="list.length" :list="list"></music-list>
    </transition>
  </cube-scroll>
</template>
<script type="text/javascript">
import common from './mixin/common.js'
export default {
  name: 'song',
  mixins: [common],
  data() {
    return {
      itemHeight: 0
    };
  },
  computed: {
    pulldownLen() {
      return this.pulldownList.length
    },
  },
  methods: {
    getItemHeight(height) {
      // this.done()
      this.itemHeight = height
    },
    async enter(el, done) {
      const len = this.pulldownLen === 0 ? this.list.length : this.pulldownLen
      const offsetHeight = len * this.itemHeight;
      setTimeout(async () => {
        $(el).css({ transform: `translate3d(0,${-offsetHeight}px,0)` })
        // console.log(offsetHeight, $(el).css('transform'));
        await new Promise(resolve => setTimeout(resolve, 70))
        $(el).css({ transition: `all ${offsetHeight}ms`, transform: 'translate3d(0,0,0)', }).bind('transitionend', done)
      }, 50)

    },
    afterEnter(el) {
      // this.transition = ''
      $(el).css({ transition: '', transform: '' })
    },
  }
};

</script>
<style scoped lang="less">
.my-loading {
  top: calc(100vh / 2 - 100px);
}

</style>
