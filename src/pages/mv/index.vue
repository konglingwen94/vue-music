<template>
  <div>
    <!-- 悬浮 -->
    <transition name="picker">
      <div @click="showMutiPicker" v-show="isShow" class="select-wrapper">
        <cube-button class="iflex around" outline primary>
          <div class="select-list">
            <div class="select-item font-dpr" :key="key" v-for="(item,key) in showSelect">
              <label for>{{item.text}}</label>--
              <span>{{item.title}}</span>
            </div>
          </div>
          <i class="cubeic-select"></i>
        </cube-button>
      </div>
    </transition>
    <!-- {{undefined.a}} -->
    <cube-scroll
      :scroll-events="['scroll','scroll-end','before-scroll-start']"
      @scroll="onScroll"
      @scroll-end="onScrollEnd
"
      :data="$refs.listView? $refs.listView.mvList:[]"
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    >
      <!-- 滚动导航 -->
      <div class="scrollNav">
        <cube-scroll
          ref="scrollNavList"
          :key="key"
          v-for="(category,label,key) in categoryMvData"
          direction="horizontal"
          class="horizontal-scroll-list-wrap"
        >
          <ul :class="['list-wrapper',label]">
            <li
              ref="navItem"
              v-tap="{methods:selectItem,label,item,key}"
              :class="setClass(label,item.id)"
              :key="index"
              v-for="(item,index) in category"
            >{{ item.title }}</li>
          </ul>
        </cube-scroll>
      </div>
      <!-- mv列表 -->
      <div v-if="1" class="mvlist-wrapper">
        <keep-alive :max="3">
          <list-view @created="onCreate" ref="listView" :query="query" :key="key"></list-view>
        </keep-alive>
      </div>
    </cube-scroll>
    <div class="backtop-wrapper" v-show="showToTop">
      <i @click="backTop" class="cubeic-arrow backtop"></i>
    </div>
  </div>
</template>
<script type="text/javascript">
import ListView from './children/ListView.vue'
const labelText = ['地区', '版本']
export default {
  components: { ListView },
  provide() {
    let reactive = {}
    Object.defineProperty(reactive, 'scrollY', {
      get: () => this.scrollY,
      enumerable: true
    })
    Object.defineProperty(reactive, 'clientTop', {
      get: () => this.clientTop,
      enumerable: true
    })
    Object.defineProperty(reactive, '$scroll', {
      get: () => this.$refs && this.$refs.scroll,
      enumerable: true
    })
    return {
      reactive
    }
  },
  data() {
    return {
      scrollY: -1,
      leaveY: 0,
      clientTop: -1,
      label: {},
      queryNum: {
        limit: 10,
        offset: 0
      },
      options: this.options,
      categoryMvData: {},
      progressPer: 0,
      navHeight: 0,
      // isShow: false,
      showToTop: false
    }
  },
  computed: {
    key() {
      return this.__values__(this.keyCode).join('') || '000'
    },
    mutiPickerData() {
      // console.log(this.label);
      var mutiPicker = []
      for (var key in this.categoryMvData) {
        var items = this.categoryMvData[key]
        mutiPicker.push(items)
      }
      return mutiPicker
    },
    showSelect() {
      return this.obData.filter(item => this.__isPlainObject__(item))
    },
    obData() {
      return this.__values__({ ...this.label, ...this.queryNum })
    },
    isShow() {
      return -this.scrollY > this.navHeight
    },
    keyCode() {
      var query = {}

      for (var key in this.label) {
        query[key] = this.label[key].id
      }
      return query
    },
    query() {
      return {
        ...this.keyCode,
        ...this.queryNum
      }
    },
    selectedIndex() {
      return this.showSelect.map((select, index) => {
        return this.mutiPickerData[index].findIndex(item => {
          return item.id == select.id
        })
      })
    }
  },

  created() {
    this.catePromise = this.getMvListCategory()
  },
  activated() {
    if (this.$refs.scroll && this.$refs.scroll.scroll) {
      this.scrollY = this.$refs.scroll.scroll.y
    }
  },

  deactivated() {
    this.$refs.scroll.scroll.stop()
  },
  async mounted() {
    return
    this.$nextTick(() => {
      this.clientTop = this.$el.getBoundingClientRect().top
    })
    this.$mvList = this.$refs.listView.mvList
    await this.catePromise

    this.navHeight = await this.getNextTickElHeight('.scrollNav')
  },

  methods: {
    onCreate() {
      // this.isShow = false;
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0)
      this.scrollY = 0
    },
    showMutiPicker() {
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createPicker({
          title: '分类标签',
          data: this.mutiPickerData,
          onSelect: this.selectHandle,
          $props: {
            selectedIndex: 'selectedIndex'
          },
          // onCancel: this.cancelHandle,
          alias: {
            value: 'id',
            text: 'title'
          }
        })
      }
      this.mutiPicker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      var i = 0
      for (var key in this.label) {
        this.label[key].id = selectedVal[i]
        this.label[key].title = selectedText[i]
        var scrollNavList = this.$refs.scrollNavList[i]

        var selectItem = $(scrollNavList.$el).find('li')[selectedIndex[i]]
        // console.log(selectItem, );
        scrollNavList.scrollToElement(selectItem, 0, true)
        i++
      }
      this.$refs.scroll.scrollTo(0, 0, 300)
      setTimeout(() => {
        this.scrollY = 0
      }, 300)
    },
    onScrollEnd({ y }) {
      // console.log('onScrollEnd');
      const wrapperHeight = this.$refs.scroll.scroll.wrapperHeight
      this.showToTop = Math.abs(y) > wrapperHeight * 3
    },
    onScroll({ y }) {
      this.scrollY = y
    },
    setClass(label, id) {
      var _class = ['list-item', label, {}]
      _class[2].active = this.label[label].id == id
      return _class
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 400)
    },
    onPullingUp() {
      this.queryNum.offset += this.queryNum.limit

      this.$nextTick(() => {
        this.$refs.listView.addData().catch(console.error)
      })
    },

    selectItem({ item, label, key, event }) {
      this.label[label].id = item.id
      this.label[label].title = item.title
      const scrollNavList = this.$refs.scrollNavList[key]
      scrollNavList.scrollToElement(event.currentTarget, 300, true)
    },
    async getMvListCategory() {
      var { mv_tag, code } = await this.__getJson(this.__MV_LIST_CATEGORY_URL)
      if (code == this.__QERR_OK) {
        const data = {}
        for (let key in mv_tag.data) {
          data[key] = mv_tag.data[key].map(item => {
            return {
              title: item.name,
              id: item.id
            }
          })
        }
        this.categoryMvData = data
        this.getLabel(this.categoryMvData)
      }
    },
    getLabel() {
      var i = 0

      for (var key in this.categoryMvData) {
        var items = this.categoryMvData[key]

        this.$set(this.label, key, { ...items[0], text: labelText[i++] })
      }
    },
    closeTip(key) {
      this.label[key].id = 0
      this.label[key].title = '全部'
    }
  }
}
</script>
<style lang="less">
.mv-page {
  // height: 100vh;
  background: #eee;
  padding: 0 0px;
  overflow: hidden;
  position: relative;

  .select-wrapper {
    position: absolute;
    // top: 100px;
    z-index: 10;
    width: 100%;
    color: #fff;
    background: rgba(255, 255, 255, 0.5);

    backdrop-filter: blur(10px);

    .select-list {
      display: flex;
      width: 100%;
      justify-content: space-around;
      .select-item {
        width: 100px;
        .font-dpr(12Px);
      }

      .cubeic-close {
        position: absolute;
        top: -3px;
        right: -6px;
        font-size: 16px;
      }
    }
  }

  .backtop-wrapper {
    position: fixed;
    bottom: 20px;
    right: 10px;
    transform: rotate(-90deg);
    font-size: 22px;
    z-index: 30;
    // color: red;
  }
}

.horizontal-scroll-list-wrap {
  padding-top: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  // border-radius: 5px;

  .cube-scroll-content {
    // width: 2000px !important;
    display: inline-block;
  }

  .list-wrapper {
    .active {
      color: red;
    }

    padding: 0 10px;
    line-height: 36px;
    white-space: nowrap;
  }

  .list-item {
    // width: 200px;
    padding: 0 20px;
    display: inline-block;
  }
}

.cube-picker-confirm,
.cube-picker-cancel,
.cube-picker-title {
  .font-dpr(13Px);
}

.picker-enter-active,
.picker-leave-active {
  transition: all 0.4s;
}

.picker-enter,
.picker-leave-to {
  transform: translate3d(0, -100%, 0);
  // opacity: 0;
}
</style>
