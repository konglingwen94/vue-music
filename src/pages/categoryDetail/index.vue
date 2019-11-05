<template>
  <div>
    <my-loading v-if="detailList.length===0"></my-loading>
    <x-header class="header-navbar" ref="header">{{$route.query.categoryName}}</x-header>
    <div class="sort-wrap flex">
      <div
        @click="sort(item)"
        :class="['sort-item',{current:item.id===sortId}]"
        :key="key"
        v-for="(item,key) in sorts"
      >{{item.text}}</div>
    </div>
    <div
      :style="{paddingBottom:miniPlayerHeight+'px'}"
      ref="container"
      class="native-vertical-scroll panel-wrap"
    >
      <transition-group tag="div" class="panel-content">
        <div @click="toDetail(item)" :key="item.dissid" v-for="(item) in detailList" class="panel">
          <div class="picBox">
            <img :key="item.id" class="layPic" v-lazy="item.imgurl" />
            <p class="playCount">{{format(item.listennum)}}</p>
            <p class="createTime">{{item.createTime}}</p>
          </div>
          <div class="desc">
            <p class="name ellipsis">{{item.dissname}}</p>
            <p class="creator ellipsis">{{item.creator.name}}</p>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script type="text/javascript">
const sorts = [
  {
    text: '默认',
    id: 0,
    handler() {
      this.detailList = this.sequenceList.slice()
    }
  },
  {
    text: '最热',
    id: 1,
    handler() {
      this.detailList.sort((a, b) => {
        return Number(b.playCount) - Number(a.playCount)
      })
    }
  },
  {
    text: '最新',
    id: 2,
    handler() {
      this.detailList.sort((a, b) => {
        const timeA = a.createTime.split('-').join('')
        const timeB = b.createTime.split('-').join('')
        return Number(timeB) - Number(timeA)
      })
    }
  }
]
export default {
  name: 'categoryDetail',
  data() {
    return {
      detailList: [],
      sorts,
      sortId: 0,
      sequenceList: [],
      pagination: { sin: 0, ein: 20 }
    }
  },
  created() {
    this.getSongSheetList()
  },
  deactivated() {
    this.scrollTop = $('.panel-wrap').scrollTop()
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.index > from.meta.index) {
      next()
      return
    }
    next(vm => {
      if (vm.scrollTop !== undefined) {
        $('.panel-wrap')[0].scrollTo(0, vm.scrollTop)
      }
    })
  },
  async mounted() {
    const top = this.$refs.container.getBoundingClientRect().top
    const height = window.innerHeight - top
    // console.log(top)
    $('.panel-wrap').css({ height })
    const threshold = 30
    this.$refs.container.onscroll = function() {
      if (this.scrollTop + this.clientHeight + threshold > this.scrollHeight) {
        console.log('scroll to bottom')
      }
    }
  },
  methods: {
    format(count) {
      const num = this.__round__(count / 10000, 1)
      return num + '万'
    },
    toDetail(item) {
      this.$router.push({
        name: 'songList',
        query: item
      })
    },
    sort({ handler, id }) {
      handler.call(this)
      this.sortId = id
    },
    async getSongSheetList() {
      const { categoryId } = this.$route.query
      var param = {
        categoryId,
        sin: this.pagination.sin,
        ein: this.pagination.ein
      }
      var { code, data } = await this.__getJson(this.__SONG_SHEET_LIST, param)

      if (code == 0) {
        this.sequenceList = data.list
        this.detailList = data.list.map(item => {
          item.id = item.dissid
          return item
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
.v-move {
  transition: all 0.5s;
}

.my-loading {
  top: 50%;
}

.categoryDetail-page {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: pink;
  overflow: auto;
  padding-top: 50px;
}

.header-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.sort-wrap {
  margin: 20px;

  .sort-item {
    &.current {
      color: red;
    }

    margin-right: 14px;
  }
}

.panel-wrap {
  // height: calc(100vh - 50px);

  .panel-content {
    // padding: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .panel {
      width: 44%;
      margin-bottom: 20px;

      .picBox {
        color: #fff;

        .posXY(playCount, 5px, auto, auto, 10px);
        .posXY(createTime, auto, auto, 5px, 10px);

        .createTime {
        }
      }

      .layPic {
        width: 100%;
      }

      .name {
        margin: 10px 0;
      }
    }
  }
}
</style>
