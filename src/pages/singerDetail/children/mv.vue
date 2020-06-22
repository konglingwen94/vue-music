<template>
  <cube-scroll
    @click.native="!inited && refreshPage()"
    class="scrollWrapper"
    ref="scroll"
    @pulling-up="onPullingUp"
    :scroll-events="['scroll', 'scroll-end']"
    @scroll="onScroll"
    :options="options"
  >
    <list-view
      name="mv-list"
      hasImg
      twoColumn
      :list="list"
      :keyInfo="{ picUrl: 'pic', desc: 'singer_name' }"
    >
    </list-view>
  </cube-scroll>
</template>
<script type="text/javascript">
import mixin from "../mixin.js";
import ListView from "../listView-tpl.vue";

export default {
  name: "singerMv",
  mixins: [mixin],
  components: { ListView },
  data() {
    return {
      list: [],
      layoutColumnCount: 2,
      onloaded: false
    };
  },

  methods: {
    async getData() {
      var { data } = await this.__getJson(`/getMvData`, this.query);
      if (!this.total) {
        this.total = data.total; //记录数据总个数
      }
      // 标记网络正常
      this.netNormal = true;
      // 添加新数据
      this.list.push(...data.list);
      // 返回异步数据更新实例
      return this.forceUpdated();
    }
  }
};
</script>
