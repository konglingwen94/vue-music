<template>
  <cube-scroll ref="scrollLyric" v-if="currentLyric && currentLyric.lines.length>0" :data="currentLyric && currentLyric.lines" :self-height="true" class="scroll-lyric">
    <div class="lyric-wrapper">
      <p ref="lyricLine" :key="index" :class="[{current:index==curLine},'lyricLine','ellipsis']" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
    </div>
  </cube-scroll>
</template>
<script type="text/javascript">
export default {
  name: '',
  data() {
    return {

    };
  },
  methods: {

  },
};

</script>
<style scoped lang="less">
</style>
