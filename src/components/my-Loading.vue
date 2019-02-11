<template>
  <div :class="['my-loading']">
    <cube-loading :size="30*__DPR" class="loading"></cube-loading>
    <p class="text">正在加载</p>
  </div>
</template>
<script type="text/javascript">
export default {};

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
