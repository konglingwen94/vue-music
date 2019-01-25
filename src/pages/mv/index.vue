<template>
  <div>
    <mt-progress v-show="progressPer<100" :value="progressPer" class="progressBar"></mt-progress>
    <!-- 悬浮 -->
    <div @click="showMutiPicker" v-show="isShow" class="select-wrap">
      <cube-button class="select-list iflex around" outline primary>
        <span class="select-item" :key="key" v-for="(item,key) in showSelect">{{item.text}}--{{item.title}}</span>
        <i class="cubeic-select"></i>
      </cube-button>
      <!-- <i @click="closeTip(key)" class="cubeic-close"></i> -->
    </div>
    <cube-scroll :scroll-events="['scroll']" @scroll="onScroll" :data="$refs.listView?$refs.listView.mvList:[]" ref="scroll" :options="options" @pulling-up="onPullingUp">
      <!-- 滚动导航 -->
      <div class="scrollNav" v-show="1">
        <cube-scroll ref="scrollInstance" :key="index" v-for="(category,label,index) in categoryMvData" direction="horizontal" class="horizontal-scroll-list-wrap">
          <ul :class="['list-wrapper',label]">
            <!-- <h2 class="list-item categoryTitle">年份</h2> -->
            <!-- <template v-for="(value,k) in label"> -->
            <li ref="scrollItem" v-tap="{methods:selectItem,label,item}" :class="setClass(label,item.id)" :key="index" v-for="(item,index) in category">{{ item.title }}</li>
            <!-- </template> -->
          </ul>
        </cube-scroll>
      </div>
      <!-- mv列表 -->
      <keep-alive>
        <!-- <router-view :label="label" :key="__values__(label).join('')"></router-view> -->
        <list-view @created="onCreate" ref="listView" :query="query" :key="__values__(keyCode).join('') || '000'"></list-view>
      </keep-alive>
    </cube-scroll>
    <div class="backtop-wrapper" v-show="backtopShow">
      <i @click="backTop" class="cubeic-arrow backtop"></i>
    </div>
    <!-- {{mutiPickerData}} -->
  </div>
</template>
<script type="text/javascript">
import pullUpLoad from '@/common/mixins/pullUpLoad'
import ListView from './children/ListView.vue'
const labelText = ['地区', '类别', '年代']
export default {
  components: { ListView },
  mixins: [pullUpLoad],
  // name: 'mv',
  data() {
    return {
      // labelText,
      scrollY: 0,
      label: {
        // area:{}
      },
      // mutiPickerData: [],
      queryNum: {
        limit: 10,

        offset: 0

      },
      categoryMvData: {},
      progressPer: 0,
      navHeight: 0,
      isShow: false,
      ListViewIsMounted: false
    };
  },
  computed: {
    mutiPickerData() {
      console.log(this.label);
      var mutiPicker = []
      for (var key in this.categoryMvData) {
        var items = this.categoryMvData[key]
        mutiPicker.push(items)
      }
      return mutiPicker
    },
    showSelect() {
      // var showText = ''
      return this.obData.filter(item => this.__isPlainObject__(item))

    },
    obData() {
      return this.__values__({ ...this.label, ...this.queryNum })
    },
    backtopShow() {
      var wrapHeight = this.$refs.scroll ? this.$refs.scroll.wrapHeight : 0
      return Math.abs(this.scrollY) > wrapHeight * 3
    },
    isShow1: {
      get() {

        return -this.scrollY > this.navHeight
      },
      set(val) {
        // return val
        this.isShow = val
      }
    },
    keyCode() {
      var query = {};

      for (var key in this.label) {
        query[key] = this.label[key].id;
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
    this.$refs.scroll && this.$refs.scroll.refresh()
  },
  deactivated() {
    this.$refs.scroll.scroll.stop()
  },
  async mounted() {
    this.$mvList = this.$refs.listView.mvList
    await this.catePromise;

    this.navHeight = await this.getNextTickElHeight('.scrollNav')
    // this.navHeight = $('.scrollNav').height()
    // console.log(this.navHeight)
  },
  watch: {
    scrollY(newY) {
      if (-newY > this.navHeight) {
        this.isShow = true;
      } else {
        this.isShow = false;

      }
    }
  },
  methods: {
    onCreate() {
      this.isShow = false;
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0)
    },
    showMutiPicker() {
      // var selectedIndex = 
      // console.log(selectedIndex);
      if (this.mutiPicker) {
        // this.mutiPicker.selectedIndex = this.selectedIndex

      }
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createPicker({
          title: 'Multi-column Picker',
          data: this.mutiPickerData,
          onSelect: this.selectHandle,
          $props: {

            selectedIndex: 'selectedIndex',
          },
          // onCancel: this.cancelHandle,
          alias: {
            value: 'id',
            text: 'title'
          },
        })
      }
      // console.log(this.mutiPicker);
      this.mutiPicker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      // console.log(selectedVal, selectedIndex, selectedText);
      // selectedVal.forEach(id=>{})
      var i = 0;
      // var selectItems = []
      for (var key in this.label) {
        this.label[key].id = selectedVal[i]
        this.label[key].title = selectedText[i]
        var scrollInstance = this.$refs.scrollInstance[i];
        // this.$nextTick(() => {

        var selectItem = $(scrollInstance.$el).find('li')[selectedIndex[i]]
        // console.log(selectItem, );
        // setTimeout(() => {
        scrollInstance.scrollToElement(selectItem, 0, true)


        // })
        // }, 100)
        // console.log(scrollInstance);
        i++;
      }
    },

    onScroll({ y }) {
      this.scrollY = y
      // console.log(y);
    },
    setClass(label, id) {
      // var cate = {};
      var _class = ['list-item', label, {}];
      // cate[label] = true;
      _class[2].active = this.label[label].id == id
      return _class
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 400)
    },
    onPullingUp() {
      this.queryNum.offset++
      this.$refs.listView.addData().catch(console.log)
    },
    getKey(keys) {
      console.log(keys);
    },
    // 刷新滚动
    /*refresh() {

      this.$nextTick(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.forceUpdate()
      })
    },*/
    selectItem({ item, label }) {
      // debugger;
      // console.log(item)
      this.label[label].id = item.id;
      this.label[label].title = item.title;

    },
    async getMvListCategory() {

      var { data, code } = await this.__getJson(this.__MV_LIST_CATEGORY_URL)
      if (code == 200) {
        // console.log(data);
        this.categoryMvData = data;
        this.getLabel(data)
      }
    },
    getLabel() {
      var i = 0;
      for (var key in this.categoryMvData) {
        var items = this.categoryMvData[key]
        this.$set(this.label, key, { ...items[0], text: labelText[i++] })
        // this.$set(this.mutiPickerData, i, [])
        // this.mutiPickerData
        // for (var j in item) {
        // this.mutiPickerData.push(items)
        // }
        // this.label[key] = this.categoryMvData[key][0]
      }

    },
    closeTip(key) {
      console.log(key)
      this.label[key].id = 0
      this.label[key].title = '全部'
    }
  }
};

</script>
<style lang="less">
.mv-page {
  height: 100vh;
  background: #eee;
  padding: 0 0px;

  .progressBar {
    height: auto;
    z-index: 10;
  }

  .select-wrap {
    position: absolute;
    // top: 100px;
    z-index: 10;
    width: 100%;
    color: #fff;
    background: rgba(255, 255, 255, .5);

    backdrop-filter: blur(10px);

    &.backdropFilter {}

    // justify-content
    .select-list {

      .select-item {
        width: 100px;
        .font-dpr(12Px);
      }

      .cubeic-close {
        position: absolute;
        top: -3px;
        right: -6px;
        font-size: 16px;
        // border: 1Px solid orange;
        // border-radius: 50%;
      }
    }
  }

  .backtop-wrapper {
    position: fixed;
    bottom: 20px;
    right: 10px;
    transform: rotate(-90deg);
    font-size: 22px;
    z-index: 10;
    // color: red;
  }
}

.horizontal-scroll-list-wrap {
  margin-top: 8px;
  border-bottom: 1Px solid rgba(0, 0, 0, 0.1);
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
    display: inline-block
  }

}

.cube-picker-confirm,
.cube-picker-cancel {
  .font-dpr(13Px);
}

</style>
