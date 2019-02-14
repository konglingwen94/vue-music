<template>
  <transition-group tag="div" class="list-wrap">
    <div @click="selectItem(item,index)" :class="['list-item']" :key="keys(item.id)" v-for="(item,index) in list">
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
  </transition-group>
</template>
<script type="text/javascript">
import { mapActions } from 'vuex'
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
    ...mapActions(['selectPlay']),
    keys(id) {
      const key = this.__shuffle__(id.split('')).join('');
      return key
    },
    async selectItem(item, index) {
      this.selectPlay({ list: this.__cloneDeep__(this.list), index })
    },

  },
};

</script>
<style scoped lang="less">
.v-enter-active {
  transition: all 1s;
  // position: absolute;
}

.v-move {
  // transition: all 1s;
  // height: 20px;
}

.v-enter {
  transform: translate3d(0, -80vh, 0);
  // height: 0 !important;
  margin-bottom: 0px !important;

}

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
