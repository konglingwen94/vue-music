<template>
  <div class="">
    <div class="bgBox" v-lazy:background-image="$route.query.picUrl"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'themeBg',
  data() {
    return {

    };
  },
  props: {
    singerInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {

  },
};

</script>
<style scoped lang="less">
.bgBox {
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  // width: 100%;
}

</style>
