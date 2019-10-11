<template>
  <div class="">
  </div>
</template>
<script type="text/javascript">
export default {
  name: '',
  data() {
    return {

    };
  },
  methods: {
    async miniPlayerHeight(newHeight, oldHeight) {
      // var $el = this.$refs.scroll.$el;
      await this.$nextTick()
      var $wrapper = $('[data-height]');
      var height = 0;
      var _height = parseFloat($wrapper.attr('data-height'))
      if (newHeight == 0) {
        height = _height;

      } else {

        height = _height - newHeight;
      }
      $wrapper.css({ height });
      $wrapper.attr('data-mHeight', height);
      var $scroll = $wrapper.find('.cube-scroll-wrapper')
      // console.log($scroll.prop('__vue__'))
      $wrapper.find('.cube-scroll-wrapper').prop('__vue__').refresh()
      // this.$refs.scroll.refresh()
      // $($el)
    }
  },
};

</script>
<style scoped lang="less">
</style>
