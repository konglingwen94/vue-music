<template>
  <div class="list">
    <!-- 列表容器 -->
    <ul :class="['list-wrapper',{twoColumn}]">
      <!-- 列表项 -->
      <li
        @click="selectPlay(item,key)"
        :class="['list-item',{twoColumn}]"
        v-for="(item,key) in list"
        :key="key"
      >
        <!-- 图片插槽 -->
        <div :style="picWrapStyle" :class="['pic-wrap',{twoColumn}]" v-if="hasImg">
          <slot name="img">
            <img class="pic"  v-lazy="item[bind_key.picUrl]" />
          </slot>
        </div>
        <!-- 文案内容 -->
        <div :class="['text-wrap',{isVertical:hasImg,twoColumn}]">
          <!-- 编号 -->
          <p v-text="key+1" v-if="hasIndex"></p>
          <!-- 标题 -->
          <h2 class="title ellipsis">{{item[bind_key.title]}}</h2>
          <!-- 描述 -->
          <p class="desc ellipsis">{{item[bind_key.desc]}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
   
  props: {
    hasIndex: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'list-view'
    },
    list: {
      type: Array,
      default: () => []
    },
    twoColumn: {
      type: Boolean,
      default: false
    },
    imgHeight: {
      type: Number,
      default: 100
    },
    hasImg: {
      type: Boolean,
      default: false
    },
    keyInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    picWrapStyle() {
      return {
        height: this.imgHeight * this.__DPR + 'px'
      }
    },
    bind_key() {
      return {
        title: 'title',
        desc: 'desc',
        picUrl: 'picUrl',
        ...this.keyInfo
      }
    }
  },
  created() {
    this.$options.name = this.name
  },
  methods: {
    selectPlay(item, index) {
      switch (this.name) {
        case 'music-list':
          this.$emit('music-selected', item, index)
          break
        case 'album-list':
          this.$emit('album-selected', item)
          break
        case 'mv-list':
          this.$emit('mvSelected', item)
      }
    }
  }
}
</script>
<style scoped lang="less">
.list {
  padding: 14px;

  .list-wrapper {
    &.twoColumn {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

// 列表项
.list-item {
  &.twoColumn {
    width: 50%;
    margin-bottom: 14px;
    display: block;

    &:nth-child(odd) {
      padding-right: 10px;
    }
  }

  &:not(.twoColumn) {
    margin-bottom: 15px;
    display: flex; //弹性盒子
    align-items: center;
  }

  .twoColumn .title {
    margin: 14px 0;
  }

  // 图片
  .pic-wrap {
    &:not(.twoColumn) {
      margin-right: 20px; //右边距
      width: 220px;
    }

    .pic {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  // 文案

  .text-wrap {
    min-width: 0;

    // 单列布局
    &:not(.twoColumn) {
      width: 100%;
      display: flex;
      background: #fff;
      padding: 20px 7px;
      border-radius: 5px;

      .title {
        margin: 0;
        margin-left: 20px;
      }

      .desc {
        margin-left: auto;
        margin-right: 20px;
      }
    }

    // 竖向布局
    &.isVertical {
      display: block;
      margin-bottom: 0;
      background: transparent;

      // 文案间距
      .title {
        margin-bottom: 20px;
        margin-left: 0;
      }
    }
  }
}
</style>
