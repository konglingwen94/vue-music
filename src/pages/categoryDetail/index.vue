<template>
  <div>
    <cube-loading class="icon-loading" v-if="loading"></cube-loading>
    <x-header class="header-nav">{{$route.query.categoryName}}</x-header>
    <div class="scroller panel-wrap">
      <div class="panel-content">
        <div @click="toDetail(item)" :key="key" v-for="(item,key) in detailList" class="panel">
          <div class="picBox">
            <img class="layPic" v-lazy="item.pic">
          </div>
            <div class="desc">
              <p class="name ellipsis">{{item.name}}</p>
              <p class="creator ellipsis">{{item.creator}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
export default {
  name: 'categoryDetail',
  data() {
    return {
      detailList: [],
      // id: null,
      loading: true

    };

  },
  created() {
    // this.id = id;
    this.getDetailList(this.$route.query.categoryId)
    // console.log('created')
  },
  activated() {
    // console.log('activated')

  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'songList') {
      to.meta.forward = true

    } else {
      to.meta.forward = false

    }
    next()
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'songList') {
      to.meta.back = true
      to.meta.forward = false
    } else {
      to.meta.back = false
      to.meta.forward = true

    }
    next()
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        name: 'songList',
        query: item
      })
    },
    async getDetailList(id) {
      // (id)
      var param = {
        categoryId: id,
        // limit: 19,
        sortId: 3
      }
      var { code, data } = await this.__getJson(this.__HOT_SONG_LIST, param)
      if (code == 200) {
        this.detailList = data
        if (this.loading) {
          // console.log(this.loading)
          this.loading = false
        }
      }
    },
  }
};

</script>
<style scoped lang="less">
/* .icon-loading {
  display: flex;
  justify-content: center;
  margin-top: 140px;
  font-size: 130px;
}
 */
.categoryDetail-page {
  // position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: pink;
  // overflow: auto;
  padding-top: 50px;

}

.header-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10
}

.panel-wrap {
  height: calc(100vh - 50px);

  .panel-content {
    // padding: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .panel {
      width: 40%;
      margin-bottom: 20px;

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
