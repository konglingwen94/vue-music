<template>
  <div :style="pageStyle">
    <cube-index-list @select="selectItem" :speed="300" :pullUpLoad="pullUpLoad" @pulling-up="onPullingUp" ref="indexList" :data="loadList">
      <cube-index-list-group v-for="(group, index) in loadList" :key="index" :group="group">
        <router-link tag="div" v-for="(item, index) in group.items" :key="index" :to="{name: 'singerDetail',
        query: item
      }">
          <mt-cell :data-mid="item.mid" class="singer-item" :item="item" :title="item.name">
            <img class="singerPic" slot="icon" v-lazy="item.picUrl">
          </mt-cell>
        </router-link>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>
<script type="text/javascript">
export default {
  // name: 'singer',
  data() {
    return {
      singerList: [],
      title: 'singerList',
      loadList: [],
      pullUpLoad: {
        txt: {
          more: 'more',
          noMore: 'nomore'
        },
        threshold: -100,
      },
      isEnd: false,
      indexList: null,
      // y: this.$refs.indexList.scrollY
    };
  },
  computed: {
    scrollY() {
      return this.$refs.indexList.scrollY
    },
    pageStyle() {
      return {
        // transform: 'translate(0,0)',
      }
    }
  },
  created() {
    var promise = this.getSingerOriginData();
    // this.setPageState(promise)
  },
  mounted() {
    // var navbarHeight = $('.navbar').height()
    // this.emitNavbarHeight(navbarHeight);
    this.indexList = this.$refs.indexList

    // this.setScrollHeight('.page-singer')
  },
  activated() {
    if (this.$refs.indexList) {

      var $scroll = this.$refs.indexList.$refs.scroll;
      $scroll.refresh()
      $scroll.scrollTo(0, this.scrollY)
    }

    // this.$refs.indexList.$refs.scroll.scrollTo(0, this.scrollY);

  },
  methods: {
    ...(Vuex.mapMutations(['setPageOnload', 'emitNavbarHeight'])),

    ...Vuex.mapActions(['setPageState']),
    selectItem(item) {
      console.log(item);
    },
    async getSingerOriginData() {
      var options = {
        params: {
          format: 'jsonp',
          channel: 'singer',
          pagenum: 1,
          // pagesize: this.pagesize,
        },
        jsonp: 'jsonpCallback',
        jsonpCallback: 'jp0',
      }
      var data = await this.__jsonp('https://c.y.qq.com/v8/fcg-bin/v8.fcg?page=list&key=all_all_all', options)
      // (data)
      if (data.code == this.__QERR_OK) {
        this.format(data.data.list);
      }
    },
    format(list) {
      var hot = {
        name: 'hot',
        items: []
      }
      for (var i = 0; i < 10; i++) {
        hot.items.push(this.cerateSinger(list[i]))
      }
      var _list = [];
      list.forEach(singer => {
        var Ftitle = singer.Findex;
        if (!_list[Ftitle]) {
          _list[Ftitle] = Ftitle
          var category = { name: _list[Ftitle], items: [] }
          list.forEach(singer => {
            if (singer.Findex == Ftitle) {
              category.items.push(this.cerateSinger(singer))
            }
          })
          _list.push(category)
        }
      })
      this._sort(_list)
      this.singerList = [hot, ..._list];
      this.loadList = this.singerList.slice(0, 3)

    },
    cerateSinger(singer) {
      return {
        id: singer.Fsinger_id,
        mid: singer.Fsinger_mid,
        name: singer.Fsinger_name,
        picUrl: this.__singerImg(singer.Fsinger_mid)
      }
    },
    _sort(list) {
      list.sort((a, b) => {
        var codeA = a.name.charCodeAt();
        var codeB = b.name.charCodeAt();

        return codeA - codeB
      })
    },

    onPullingUp() {
      var len = this.loadList.length;

      var arr = this.singerList.slice(len, len + 3)
      this.loadList.push(...arr)
    }
  },
  updated() {
    // ('updated')
    if (this.singerList.length == this.loadList.length) {
      this.isEnd = true;
      this.$refs.indexList.forceUpdate(!this.isEnd)
    }
  },
}

</script>
<style scoped lang="less">
.page-singer {
  // height: 90vh;
  // background: #000;
}

.loadTip {
  text-align: center;
}

.singer-item {
  .singerPic {
    width: 50px;
    border-radius: 100%;
    margin: 10px 18px;
  }
}

</style>
<style>
[class^='mint-cell'] {
  /*border: none !important;*/
  /*outline: none !important;*/
  background-image: none !important;
}

</style>
