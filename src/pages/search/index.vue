<template>
  <div class>
    <x-search
      ref="search"
      :class="[{isSearch_:$refs.search && $refs.search.isFixed},'searchBox']"
      v-model.trim="query"
      :auto-fixed="true"
      placeholder="请输入歌曲、专辑..."
    ></x-search>
    <cube-scroll ref="scrollContainer" v-show="!query">
      <!-- 热门搜索 -->
      <div class="hotkey">
        <div class="title-wrap">
          <p class="title">热门搜索</p>
        </div>
        <ul class="hotkey-list flexWrap">
          <li
            @click="addQuery(item.k.trim())"
            class="hotkey-item"
            :key="key"
            v-for="(item,key) in hotkeyList"
          >
            <p>{{item.k}}</p>
          </li>
        </ul>
      </div>

      <div v-if="historyList.length" class="history">
        <div class="title-wrap">
          <h3>搜索历史</h3>
          <div class @click="clearHistory">
            <i class="cubeic-delete clear"></i>
          </div>
        </div>

        <ul>
          <li class="history-item" v-for="(item ,key) in historyList" :key="key">
            <div @click="addQuery(item)">
              <span class="item-text">{{item}}</span>
              <i @click.stop="deleteOneHistory(item)" class="item-icon cubeic-close"></i>
            </div>
          </li>
        </ul>
      </div>
    </cube-scroll>
    <div v-if="query">
      <Song @search="storeUpQuery" :query="query"></Song>
    </div>
  </div>
</template>
<script type="text/javascript">
import Song from './suggest/song.vue'
import storage from 'good-storage'

export default {
  components: {
    Song
  },
  data() {
    const self = this
    return {
      query: '',
      isSearch: false,
      clientTop: 0,
      y: 0,
      hotkeyList: [],
      get historyList() {
        return self.__uniq__(storage.get('history')).slice(0, 20)
      },
      set historyList(list) {
        storage.set('history', self.__uniq__(list).slice(0, 20))
      }
    }
  },
  computed: {
    isSearch_() {
      return !this.__isEmptyObject(this.$search) && this.$search.isFixed
    }
  },
  created() {
    this.getHotkeyList()
  },
  destroyed() {
    this.unwatch()
  },
  mounted() {
    this.$search = this.$refs.search
    this.unwatch = this.$search.$watch('isFixed', () => {
      console.log('search component watching isFixed')
      this.$nextTick(() => {
        this.$refs.scrollContainer.refresh()
      })
    })
    this.$nextTick(() => {
      this.clientTop = $('.searchBox').height()
    })
  },
  watch: {
    isSearch_() {
      this.$nextTick(() => {
        this.$refs.scrollContainer.refresh()
        console.log('refresh scroll')
      })
    },
    query(newQuery) {
      this.isSearch = Boolean(newQuery)
    }
  },
  methods: {
    deleteOneHistory(value) {
      this.historyList = this.__pull__(this.historyList, value)
    },
    clearHistory() {
      this.MessageBox.confirm('您确定要清空搜索记录吗')
        .then(result => {
          if (result === 'confirm') {
            this.historyList = []
          }
        })
        .catch(console.log)
    },
    storeUpQuery(keyword) {
      this.historyList = [keyword].concat(this.historyList)
    },
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
    onPullingDown() {
      // console.log('onPullingDown')
      this.params.offset++
      this.search({ type: this.TYPE })
    },
    onScroll({ y }) {
      this.y = y
      // console.log(y);
    }
  }
}
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

.hotkey,
.history {
  padding: 10px;
  .title-wrap {
    margin: 20px 0;
  }
}

.hotkey {
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

.history {
  .title-wrap {
    display: flex;
    justify-content: space-between;
    .clear {
      font-size: 18px;
    }
  }
  .history-item {
    .font-dpr(12Px);
    margin-bottom: 14px;
    .item-icon {
      float: right;
    }
  }
}
</style>
