<template>
  <cube-scroll class="horizontal-scroll-list-wrap" v-bind="$attrs" v-on="$listeners" ref="scroll">
    <slot></slot>
  </cube-scroll>
</template>
<script type="text/javascript">
export default {
  name: 'horizontal-scroll',
  data() {
    return {

    };
  },
  mounted() {
    // this.$refs.scroll.initScroll()
  },
  methods: {

  },
};

</script>
<style scoped lang="less">
.cube-scroll-content {
  display: inline-block;
}

</style>
