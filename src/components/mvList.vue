<template>
  <div :class="['mv-list', { twoColumn, oneColumn: !twoColumn }]">
    <!-- <slot :datakey="keys"> -->
    <div :key="key" style="" class="mv-item" v-for="(item, key) in data">
      <!-- 图片容器 -->
      <div class="pic-wrap" @click="selectPlay(item)">
        <i
          :class="[
            'iconfont',
            { 'icon-bofang2': !playing },
            { 'icon-zanting': playing }
          ]"
        ></i>
        <!-- </p> 背景图 -->
        <div
          :key="item[keys.picUrl]"
          v-if="useBackground"
          class="bgBox"
          v-lazy:background-image="item[keys.picUrl]"
        ></div>
        <img
          class="image"
          v-else
          :key="item[keys.picUrl]"
          v-lazy="item[keys.picUrl]"
        />
      </div>
      <!-- 文案 -->
      <div class="text-wrap">
        <div class="text-title">
          <p class="title ellipsis" v-text="item[keys.title]"></p>
        </div>
        <div class="text-desc">
          <p class="desc ellipsis" v-text="item[keys.desc]"></p>
        </div>
      </div>
    </div>
    <!-- </slot> -->
  </div>
</template>
<script type="text/javascript">
export default {
  name: "mv-list",
  data() {
    return {
      currentMv: null,
      playing: false
    };
  },
  computed: {
    keys() {
      return {
        picUrl: "picUrl",
        title: "title",
        desc: "desc",
        ...this.dataKey
      };
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    twoColumn: {
      type: Boolean,
      default: false
    },
    useBackground: {
      type: Boolean,
      default: false
    },
    dataKey: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    selectPlay(item) {
      this.$router.push({ name: "mvPlayer", query: item });
    },
    oncanplay() {
      this.playing = true;
    },
    playItem(e, mv) {
      e.target.autoplay = true;
      e.target.controls = true;
      this.currentMv = mv;
    }
  }
};
</script>
<style scoped lang="less">
.twoColumn {
  display: flex;
  flex-wrap: wrap;
}

.mv-item {
  margin-bottom: 30px;
}

.oneColumn {
  .text-wrap {
    display: flex;
    justify-content: space-around;
    margin-top: 18px;

    [class^="text"] {
      width: 40%;
      padding-left: 40px;
    }
  }
}

.pic-wrap {
  background-repeat: no-repeat;
  background-size: cover;

  .posCenter(iconfont);

  .iconfont {
    font-size: 6em;
    color: #fff;
    z-index: 10;
  }

  .video {
    width: 100%;
  }

  .bgBox {
    background-position: center;
    background-size: cover;
  }

  .image {
    width: 100%;
    height: 160px;
    object-position: center;

    &[lazy="loaded"] {
      object-fit: cover;
    }

    &[lazy="loading"],
    &[lazy="error"] {
      object-fit: contain;
    }
  }
}
</style>
