<template>
  <div class="list-wrap" >
    <div
      :style="{marginTop:$attrs.marginTop+'px'}"
      @click="selectItem(item,index)"
      :class="['list-item']"
      :key="index"
      v-for="(item,index) in list"
    >
      <div :class="['sortIndex',{newLoad:item.newLoad}]">{{index+preIndex+1}}</div>
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
</template>
<script type="text/javascript">
import { mapActions } from 'vuex'
export default {
  name: 'music-list',
  data() {
    return {}
  },
  props: {
    preIndex: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    const height = $('.list-item').height()
    this.$emit('hasHeight', height)
  },
  methods: {
    ...mapActions(['selectPlay']),
    
    keys({ id }) {
      return id
       
    },
    async selectItem(item, index) {
    
      this.selectPlay({ list: this.__cloneDeep__(this.list), index })
    }
  }
}
</script>
<style scoped lang="less">
.list-wrap {
  padding: 0 10px;
}

.list-item {
  padding: 0 12px;
  background: #fff;
  display: flex;
  align-items: center;
  height: 40px;

  border-radius: 3px;

  .sortIndex {
    
    margin-right: 10px;

    &.newLoad {
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
        .font-dpr(14Px);
      }
    }

    .text-singer {
      width: 50%;
       
      text-align: right;
       

      min-width: 0;

       
    }
  }
}
</style>
