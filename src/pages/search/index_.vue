<template>
  <div class="search-page">
    <!-- 顶部搜索块 -->
    <div class="search-wrap">
      <!-- 搜索框 -->
      <!-- <cube-input ref="comInput" autocomplete autofocus placeholder="placeholder" v-model.trim="params.s" :clearable="true">
        搜索图标
        <i class="cubeic-search search-icon" slot="prepend"></i>
      </cube-input> -->
      <search></search>
    </div>
    <!--  -->
    <cube-scroll>
      <div v-show="!params.s">
        <!-- 热门搜索块 -->
        <div class="hotSearch">
          <p class="title">热门搜索</p>
          <!--  -->
          <ul class="list">
            <li @click="handleHotKey(item.k.trim())" class="item" :key="key" v-for="(item,key) in hotkey">{{item.k}}</li>
          </ul>
        </div>
        <!-- 搜索历史 -->
        <div v-if="0" class="searchHistory" v-show="history.length>0">
          <div class="title-wrap">
            <h2 class="title">搜索历史</h2>
            <i class="cubeic-delete"></i>
          </div>
          <!-- 列表 -->
          <ul class="list">
            <li class="item" :key="key" v-for="(item,key) in history">
              <mt-cell :title="item.title">
                <i class="cubeic-time" slot="icon"></i>
                <i class="cubeic-close" @click="deleteItem(item.id)"></i>
              </mt-cell>
            </li>
          </ul>
        </div>
      </div>
    </cube-scroll>
    <!-- 滚动容器 -->
    <div class="scroll-wrap">
      <cube-scroll ref="scroll" :style="scrollStyle" class="scrollWrap">
      </cube-scroll>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'search',
  data() {
    return {
      result: [],
      params: {
        s: '',
        limit: '100',
        offset: '0',
        type: 'song'
      },
      hotkey: [],
      scrollWrapHeight: 0,
      history: []
    };
  },
  computed: {
    ...Vuex.mapState(['navbarHeight']),

    scrollStyle() {
      return {

        // height: `${this.scrollWrapHeight}px`
      }
    }
  },
  created() {
    this.getHotKey()
  },
  mounted() {
    // this.getScrollWrapHeight()
  },
  methods: {
    onCancel() {},
    handleHotKey(k) {
      this.params.s = k;
      this.$refs.comInput.isFocus = true
    },
    getScrollWrapHeight() {
      this.$nextTick(() => {

        var searchHeight = $('.search-wrap').height()
        // this.scrollWrapHeight = innerHeight - this.navbarHeight - searchHeight
        // setTimeout(() => {

        var top = $('.hotSearch')[0].getBoundingClientRect().top
        console.log(top)
        // }, 10)
        this.scrollWrapHeight = innerHeight - top;
      })

    },
    async getHotKey() {
      var res = await this.__getJson(`http://${domain}:3000/getHotKey`);
      if (res.code == this.__QERR_OK) {
        var { hotkey } = res.data
        this.hotkey = hotkey.slice(0, 10)
      }
    },

    updateScroll() {

      this.$nextTick(() => {

        this.$refs.scroll.refresh()
      })
    }
  },
  watch: {
    'params.s': function(newQuery) {
      // body...
      if (newQuery) {
        this.search();
        console.log(newQuery, newQuery.length)
        debugger;
        // this.history.unshift(newQuery)
        this.history.unshift({
          title: newQuery,
          id: this.history.length++
        })

      }
    }
  }
};

</script>
<style scoped lang="less">
.search-wrap {
  padding: 14px;
  background: #eee;

  .search-icon {
    font-size: 22px;
    margin-left: 4px;
  }
}

.scroll-wrap {
  padding: 10px 0 0 10px;
}

// 热门搜索
.hotSearch {

  .title {
    margin-bottom: 20px;

  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -12px;

    .item {
      margin-left: 12px;
      background: #eee;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 9px;
    }
  }
}

.searchHistory {
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
}

</style>
