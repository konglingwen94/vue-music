<template>
  <div class="player">
    <!-- 全屏播放 -->
    <normal></normal>
    <!-- 最小化播放 -->
    <mini></mini>
  </div>
</template>
<script type="text/javascript">
import Normal from './normal.vue'
import Mini from './mini.vue'
export default {
  name: '',
  data() {
    return {

    };
  },
  computed: {
    ...Vuex.mapGetters(['singer',
      'playing',
      'fullScreen',
      'playlist',
      'sequenceList',
      'mode',
      'currentIndex',
      'currentSong'
    ]),
  },
  methods: {

  },
  components: { Normal, Mini }
};

</script>
<style scoped lang="less">
</style>
