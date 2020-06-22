<template>
  <div class="songSheet-list">
    <router-link
      tag="div"
      :to="{
        name: 'songList',
        params: { id: data.dissid }
      }"
      class="swipeItem"
      :key="data.id"
      v-for="data in songSheetList"
      ref="swipeItem"
    >
      <div>
        <img class="icon" v-lazy="data.imgurl" />
      </div>
      <div class="text">
        <h2 class="item-name" v-html="data.creator.name"></h2>
        <p class="item-desc line2" v-html="data.dissname"></p>
      </div>
    </router-link>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "hotSongList",

  props: {
    songSheetList: {
      type: Array,
      default: () => []
    }
  },

  updated() {
    this.$nextTick(() => {
      this.$emit("updated");
    });
  }
};
</script>
<style scoped lang="less">
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
