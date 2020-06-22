<template>
  <div
    v-if="props.pullDownRefresh"
    class="cube-pulldown-wrapper"
    :style="props.pullDownStyle"
  >
    <div
      v-if="props.beforePullDown"
      class="before-trigger"
      :style="{ paddingTop: props.bubbleY + 'px' }"
    >
      <span
        :style="{ visibility: props.pullDownStyle ? 'visible' : 'hidden' }"
        :class="{ rotate: props.bubbleY > 0 }"
        >↓</span
      >
    </div>
    <div class="after-trigger" v-else>
      <div v-show="props.isPullingDown" class="loading">
        <cube-loading></cube-loading>
      </div>
      <transition name="success">
        <div v-show="!props.isPullingDown" class="text-wrapper">
          <span class="refresh-text">搜索引擎有{{ $attrs.limit }}条更新</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  inheritAttrs: false,
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
<style
  rel="text/stylus"
  lang="stylus"
  src="./pullDownRefresh/pullDownRefresh.styl"
></style>
