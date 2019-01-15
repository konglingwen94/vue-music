<template>
  <div class="scroll-list-wrap">
    <router-link tag="div" :to="{
      name:'songList',
      query:data,
  }" class="swipeItem" :key="data.id" v-for="data in hotSongList" ref="swipeItem">
      <div>
        <img class="icon" v-lazy="data.imgurl">
      </div>
        <div class="text">
          <h2 class="item-name" v-html="data.creator.name
"></h2>
          <p class="item-desc line2" v-html="data.dissname"></p>
        </div>
    </router-link>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'hotSongList',
  data() {
    return {
      lasttime: '',
    };
  },
  props: {
    hotSongList: {
      type: Array,
      default: [],
    }

  },
  created() {
    // this.getHotSongList()
  },
  updated() {
    // (this.__$('.swipeItem').length)
    this.$nextTick(() => {
      // ('nextTick---', this.__$('.swipeItem').length)

      this.$emit('updated')
    })
  },
  methods: {

  }
};

</script>
<style scoped lang="less">
.scroll-list-wrap {}



.swipeItem {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .icon {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }

  .text {
    .item-name {
      margin-bottom: 20px;
    }

    .item-desc {
      line-height: 1.5;
    }
  }
}

</style>
