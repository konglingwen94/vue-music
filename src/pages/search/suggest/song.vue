<template>
  <cube-scroll :data="list" @pulling-down="onPullingDown" :options="options">
    <my-loading v-if="showList.length===0"></my-loading>
    <pull-down-refresh :limit="pulldownLimit" :props="props" slot="pulldown" slot-scope="props"></pull-down-refresh>
    <music-list :list="showList"></music-list>
  </cube-scroll>
</template>
<script type="text/javascript">
import common from './mixin/common.js'
export default {
  name: 'song',
  mixins: [common],
  data() {
    return {};
  },
  computed: {
    showList() {
      return this.list.map((item, index) => {
        if (index < this.pulldownLimit) {
          item.addItem = true
        } else {
          item.addItem = false

        }
        return item;
      })
    }
  },
  methods: {

  },
};

</script>
<style scoped lang="less">
.my-loading {
  top: calc(100vh / 2 - 100px);
}

</style>
