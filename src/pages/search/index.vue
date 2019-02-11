<template>
  <div class="">
    <x-search ref="search" :class="[{isSearch_:$refs.search && $refs.search.isFixed},'searchBox']" v-model.trim="query" :auto-fixed="true" placeholder="请输入歌曲、专辑...">
    </x-search>
    <cube-scroll v-show="!query">
      <!-- 热门搜索 -->
      <div class="hotkey">
        <div class="title-wrap">
          <p class="title">热门搜索</p>
        </div>
        <ul class="hotkey-list flexWrap">
          <li @click="addQuery(item.k.trim())" class="hotkey-item" :key="key" v-for="(item,key) in hotkeyList">
            <p>{{item.k}}</p>
          </li>
        </ul>
      </div>
    </cube-scroll>
    <div v-show="query" class="search-content" :style="`top:${clientTop}px`">
      <div class="navScrollWrap horizontal-scroll">
        <!-- <horizontal-scroll direction="horizontal"> -->
        <ul class="nav-list">
          <li :class="{active:item.type==showType}" @click="selectType(item.id)" class="nav-item" :key="key" v-for="(item,key) in navList">{{item.label}}</li>
        </ul>
        <!-- </horizontal-scroll> -->
      </div>
      <div v-if="query">
        <keep-alive>
          <component :query="query" :type="showType" :is="showType">
            <!-- <cube-scroll> -->
            <!-- </cube-scroll> -->
          </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Song from './suggest/song.vue'
import Album from './suggest/album.vue'
import List from './suggest/list.vue'
import Mv from './suggest/mv.vue'
let navList = [
  { type: 'song', label: '歌曲' },
  { type: 'album', label: '专辑' },
  { type: 'list', label: '歌单' },
  { type: 'mv', label: '视频' },
  { type: 'user', label: '用户' },
  { type: 'lrc', label: '歌词' },
];
navList.forEach((item, index) => {
  item.id = index
})
const TYPE = 'song'
export default {
  components: {
    Song,
    Album,
    List,
    Mv
  },
  data() {
    return {
      showType: TYPE,
      query: '',
      navList,
      isSearch: false,
      clientTop: 0,
      // isCancel: true,
      y: 0,
      hotkeyList: [],

    };
  },
  computed: {
    isSearch_() {
      return !this.__isEmptyObject(this.$search) && this.$search.isFixed
    }
  },
  created() {
    this.getHotkeyList()
  },
  mounted() {
    this.$search = this.$refs.search;
    this.$watch('$search.isFixed', () => {
      this.showType = TYPE
    })
    this.$nextTick(() => {
      this.clientTop = $('.searchBox').height()
    })
  },
  watch: {
    isSearch_() {

    },
    query(newQuery) {
      this.isSearch = Boolean(newQuery);
    }
  },
  methods: {
    addQuery(query) {
      this.query = query
      this.$search.isFixed = true
    },
    async getHotkeyList() {
      var { code, data } = await this.__getJson(this.__HOT_KEY)
      if (code == this.__QERR_OK) {
        this._normalizeHotkey(data)
      }
    },
    _normalizeHotkey(data) {

      this.hotkeyList = data.hotkey.splice(0, 10)
    },
    selectType(id) {
      var item = navList.find(item => item.id == id)
      this.showType = item.type
    },
    onPullingDown() {
      console.log('onPullingDown')
      this.params.offset++
      this.search({ type: this.TYPE })
    },
    onScroll({ y }) {
      this.y = y
      // console.log(y);
    },



  }
};

</script>
<style lang="less">
.isSearch_ {
  height: 53px;
}

.weui-search-bar__label {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-content {
  position: fixed;
  width: 100%;
}

.hotkey {
  padding: 10px;

  .title-wrap {
    margin: 20px 0;
  }

  .hotkey-list {
    margin-left: -18px;

    .hotkey-item {
      margin-bottom: 14px;
      margin-left: 18px;
      background: #eee;
      padding: 10px;
      border-radius: 10px;
    }
  }
}

.navScrollWrap {
  // min: inline-block;
  // border-bottom: 1Px solid #ccc;
  // margin-top: 8px;

  .nav-list {
    // white-space: nowrap;
    padding: 14px;
    // padding-bottom: 0px;
  }

  .nav-item {
    padding: 0 15px;
    padding-bottom: 8px;

    &.active {
      border-bottom: 2Px solid green;
    }

    // padding: 10px;
  }

  // }
}

</style>
