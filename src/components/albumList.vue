<template>
  <div class="albumList">
    <router-link tag="div" :to="{
      name:'songList',
      // params:{id:data.dissid},
  }" class="album-item" :key="key" v-for="(album,key) in albumList">
      <div>
        <img class="albumIcon" v-lazy="album.albumImg">
      </div>
        <div class="albumDesc">
          <h2 class="albumName ellipsis" v-html="album.name
"></h2>
          <p class="albumCreator ellipsis" v-html="album.creator"></p>
        </div>
    </router-link>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'albumList',
  data() {
    return {};
  },
  props: {
    albumList: {
      type: Array,
      default: () => [],
    }

  },
  created() {
    // this.getHotSongList()
  },
  updated() {
    // (this.__$('.swipeItem').length)
    this.$nextTick(() => {
      // ('nextTick---', this.__$('.swipeItem').length)

      // this.$emit('updated')
    })
  },
  methods: {

  }
};

</script>
<style scoped lang="less">
.albumList {
  padding-left: 20px;
}



.album-item {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .albumIcon {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }

  .albumDesc {
    .albumName {
      margin-bottom: 20px;
    }

    .albumCreator {
      line-height: 1.5;
    }
  }
}

</style>
