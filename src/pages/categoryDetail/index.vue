<template>
  <div>
    <my-loading v-if="detailList.length===0"></my-loading>
    <x-header class="header-navbar" ref="header">{{$route.query.categoryName}}</x-header>
    <div ref="container" class="native-vertical-scroll panel-wrap">
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
  async mounted() {
    // await this.$nextTick();
    const top = this.$refs.header.$el.getBoundingClientRect().height
    const height = window.innerHeight - top
    console.log(top)
    $('.panel-wrap').css({ height })
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
  z-index: 10
}

.panel-wrap {
  // height: calc(100vh - 50px);

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
