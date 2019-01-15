<template>
  <div class="list-wrap">
    <!-- <cube-scroll v-bind="$attrs" v-on="$listeners" class="musicList"> -->
    <!-- <slot name="pullDownRefresh"></slot> -->
    <div :class="['list-item']" :key="index" v-for="(item,index) in list">
      <div :class="['sortIndex',{addItem:item.addItem}]">{{index+1}}</div>
      <div class="text-wrap">
        <div class="text-name">
          <h2 v-text="item.name" class="name ellipsis"></h2>
        </div>
        <div class="text-singer">
          <p v-text="item.singer" class="singer ellipsis"></p>
        </div>
      </div>
    </div>
  </div>
  <!-- </cube-scroll> -->
</template>
<script type="text/javascript">
export default {
  name: 'music-list',
  data() {
    return {

    };
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {

  },
  // render(h) {

  // }
};

</script>
<style scoped lang="less">
.list-wrap {
  padding: 10px;
}

.list-item {

  padding: 12px;
  margin-bottom: 10px;
  background: #fff;
  display: flex;
  // height: 70px;
  align-items: center;

  border-radius: 3px;

  .sortIndex {
    // width: 20px;
    margin-right: 10px;

    &.addItem {
      color: orange;
    }
  }

  .text-wrap {
    width: 100%;
    min-width: 0;
    display: flex;

    justify-content: space-between;

    .text-name {
      width: 140px;

      .name {
        color: #333;
        .font-dpr(14Px)
      }
    }

    .text-singer {
      width: 50%;
      // margin-left: auto;
      text-align: right;
      // padding-right: 5px;

      min-width: 0;

      .singer {
        // color: #ccc;
      }

    }
  }
}

</style>
