<template>
  <div>
    <mt-progress v-show="progressPer<100" :value="progressPer" class="progressBar"></mt-progress>
    <keep-alive>
      <cube-scroll :keye="0" :data="mvList" ref="scroll" :options="options" @pulling-up="onPullingUp">
        <!-- 滚动导航 -->
        <div class="scrollNav">
          <cube-scroll :key="index" v-for="(category,label,index) in categoryMvData" direction="horizontal" class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper">
              <h2 class="list-item categoryTitle">年份</h2>
              <!-- <template v-for="(value,k) in label"> -->
              <li v-tap="{methods:selectItem,id:item.id,label}" :class="setClass(label,item.id)" :key="index" v-for="(item,index) in category">{{ item.title }}</li>
              <!-- </template> -->
            </ul>
          </cube-scroll>
        </div>
        <!-- mv列表 -->
        <div class="mvList">
          <router-link :key="item.id" tag="div" class="mv-item" :to="{name:'mvPlayer'}" v-for="item in mvList">
            <div v-lazy:background-image="item.pic" :key="item.pic" class="picBg">
              <!-- <img v-lazy:background-image="item.pic" :key="item.pic" alt=""> -->
            </div>
            <div class="desc">
              <p class="name">{{item.name}}</p>
              <p class="singer">{{item.singer}}</p>
            </div>
          </router-link>
        </div>
      </cube-scroll>
    </keep-alive>
    <i @click="backTop" class="cubeic-arrow backtop"></i>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'mv',
  data() {
    return {
      label: {

        area: 0,
        tag: 0,
        year: 0,
      },
      limit: 40,
      offset: 0,
      categoryMvData: {},
      mvList: [],
      options: {
        pullUpLoad: true
      },
      progressPer: 0
    };
  },
  beforeCreate() {
    // console.log('beforeCreate', this._options);
  },
  created() {

    this.getMvListCategory()
    this.getMvList().catch(console.log)
    // var promise = Promise.all([, ])
    // this.setPageState(promise)
  },
  computed: {
    // ...Vuex.mapGetters(['getLoadingState'])
  },
  mounted() {
    // console.log(this.$options);

  },
  watch: {
    label: {
      deep: true,
      handler() {
        this.progressPer = 0

        var timer = setInterval(() => {
          this.progressPer += 4;
          if (this.progressPer >= 100) {
            clearInterval(timer);
          }
        })
      }
    }
  },
  methods: {
    // ...(Vuex.mapMutations(['setPageOnload'])),
    // ...Vuex.mapActions(['setPageState']),
    setClass(label, id) {
      // var cate = {};
      var _class = {};
      // cate[label] = true;
      _class['list-item'] = true;
      _class.active = this.label[label] == id
      return _class
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 400)
    },
    onPullingUp() {
      this.offset++
      this.getMvList().catch(console.log)
    },
    async getMvList(type) {
      var paramsData = {
        year: this.label.year,
        tag: this.label.tag,
        area: this.label.area,
        limit: this.limit,
        offset: this.offset
      }
      var data = await this.__getJson('https://api.bzqll.com/music/tencent/hotMvList?key=579621905', paramsData)
      if (data.code == 200) {
        // console.log(data)
        // this.mvList = data.data
        if (type == 'filter') {
          // 获取新数据
          this.mvList = data.data
          // 刷新滚动

          // this.refresh()

        } else {

          this.addItem(data.data)
        }
      }
    },
    addItem(list) {
      this.mvList.push(...list)
      // this.refresh()
    },
    // 刷新滚动
    refresh() {

      this.$nextTick(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.forceUpdate()
      })
    },
    selectItem(param) {
      // debugger;
      // console.log(id, key);
      this.label[param.label] = param.id;
      this.getMvList('filter').catch(console.log)
    },
    async getMvListCategory() {

      var data = await this.__getJson('https://api.bzqll.com/music/tencent/mvListCategory?key=579621905')
      if (data.code == 200) {
        // console.log(data);
        this.categoryMvData = data.data;
      }
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

  .backtop {
    position: fixed;
    bottom: 20px;
    right: 10px;
    transform: rotate(-90deg);
    font-size: 20px;
    z-index: 10;
  }
}

.horizontal-scroll-list-wrap {

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
    line-height: 60px;
    white-space: nowrap;
  }

  .list-item {
    // width: 200px;
    padding: 0 20px;
    display: inline-block
  }

}

.mvList {
  .mv-item {
    margin: 20px 10px;

    .picBg {
      background-size: cover;
      height: 200px;
    }

    .desc {
      display: flex;
      margin-top: 20px;
      justify-content: space-around;
    }
  }
}

</style>
