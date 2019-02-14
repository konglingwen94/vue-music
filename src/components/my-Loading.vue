<template>
  <div :class="['my-loading']">
    <cube-loading v-if="!error" :size="30*__DPR" class="loading"></cube-loading>
    <p class="text">{{message}}</p>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      message: '正在加载...',
    }
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    error(newError) {
      this.message = newError ? "加载错误" :
        "正在加载..."
    }
  }
};

</script>
<style scoped lang="less">
.my-loading {
  position: fixed !important;
  z-index: 40;

  .posCenterX(loading);
  width: 100%;

  .loading {}
}

.text {
  margin-top: 50px;
  text-align: center;
}

</style>
