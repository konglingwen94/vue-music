<template>
  <!-- <div class="album-page"> -->
  <cube-scroll
    @click.native="!inited && refreshPage()"
    @pulling-up="onPullingUp"
    ref="scroll"
    :scroll-events="['scroll', 'scroll-end']"
    @scroll="onScroll"
    :options="options"
  >
    <list-view
      @album-selected="onSelected"
      name="album-list"
      hasImg
      :list="list"
      :keyInfo="{ picUrl: 'albumImg', desc: 'creator', title: 'name' }"
    />
    <!-- <album-list :albumList="list"></album-list> -->
  </cube-scroll>
  <!-- </div> -->
</template>
<script type="text/javascript">
import mixin from "../mixin.js";

import ListView from "../listView-tpl.vue";

export default {
  // name: 'singerAlbum',
  mixins: [mixin],
  components: { ListView },
  data() {
    return {
      list: [],
      onloaded: false
    };
  },

  methods: {
    onSelected(item) {
      this.$router.push({
        name: "songList",
        query: {
          ...item,
          disstid: item.id,
          type: "album",
          imgurl: item.albumImg
        }
      });
    },
    async getData() {
      // 获取响应数据
      var res = await this.__getJson(`/getAlbumData`, this.query); //等待响应完成
      // 判断响应数据状态码
      if (res.code == 0) {
        // 获取专辑数据
        let albumData = res.singerAlbum.data;
        // 判断首次加载
        if (this.total == 0) {
          // 获取总数
          this.total = albumData.total;
        }
        // 标记网络正常

        this.netNormal = true;

        // 格式化新数据
        return this.normalizeData(albumData.list);
      } else {
        // 抛出数据错误
        throw new Error("data error");
      }
    },
    normalizeData(list) {
      // 遍历原始数据列表
      list.forEach(item => {
        // 向展示列表添加专辑信息
        this.list.push({
          creator: item.singer_name, //专辑歌手
          mid: item.album_mid, //专辑mid
          name: item.album_name, //专辑名称
          id: item.albumid, //专辑id
          albumImg: this.__albumImg(item.album_mid) //专辑封面
        });
      });
      // 返回页面异步更新状态对象
      return this.forceUpdated();
    }
  }
};
</script>
