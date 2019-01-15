<template>
  <!-- 搜索结果列表 -->
  <div class="suggest-list">
    <mt-cell :key="key" v-for="(item,key) in list" :title="item.name" :value="item.singer">
    </mt-cell>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'suggest',
  data() {
    return {
      options: {}
    };
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    onPullingDown() {
      // this.$emit()
    },
  }
};

</script>
<style scoped lang="less">
</style>
