<template>
  <transition>
    <div class="list-wrap" v-if="showFlag">
      <list :pickerData="merge" :videoParams="videoParams" :data="mvList"></list>
      <my-loading :error="error" v-if="mvList.length==0"></my-loading>
      <!-- <my-error v-if="error"></my-error> -->
    </div>
  </transition>
</template>
<script type="text/javascript">
import List from './list.vue'
const pickerData = [
  { text: '流畅', value: '360' },
  { text: '标清', value: '480' },
  { text: '高清', value: '720' },
  { text: '超清', value: '1080' }
]
const videoParams = [
  { index: 0, r: 1 },
  { index: 1, r: 2 },
  { index: 2, r: 3 },
  { index: 3, r: 4 }
]

const r = 1
const merge = _.merge([], pickerData, videoParams)
const videoType = merge.find(item => item.r === r)

export default {
  name: '',
  components: { List },
  data() {
    return {
      mvList: [],
      merge,
      showFlag: false,
      videoParams,
      error: false
    }
  },
  props: {
    label: {
      type: Object,
      default: () => ({})
    },
    query: {
      type: Object,
      default: () => ({})
    }
  },
  activated() {
    this.showFlag = true
  },
  deactivated() {
    this.showFlag = false
  },
  created() {
    // this.
    this.initData()
    this.$emit('created')
  },
  mounted() {
    $(document).bind(
      'fullscreenchange webkitfullscreenchange mozfullscreenchange',
      function() {
        //todo code
        console.log(document.webkitIsFullScreen)
      }
    )
  },
  methods: {
    async getMvList() {
      var { mv_list = [], code } = await this.__getJson(
        this.__HOT_MV_LIST_URL,
        this.query
      ).catch(err => {
        console.log(err)
        this.error = true
      })
      if (code == this.__QERR_OK) {
        console.log(mv_list)
        return mv_list.data.list.map(item => {
          item.videoType = this.__clone__(videoType)
          return item
        })
      } else {
        console.log(data)
      }
    },
    async initData() {
      this.mvList = await this.getMvList()
    },
    async addData(list) {
      this.mvList.push(...(await this.getMvList()))
    }
  }
}
</script>
<style scoped lang="less">
.my-loading,
.my-error {
  top: 52vh;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
  position: fixed;
  width: 100%;

  .my-loading,
  .my-error {
    top: 30vh;
  }
}

.v-enter {
  transform: translate3d(100vw, 0, 0);
}

.v-leave-to {
  transform: translate3d(-100vw, 0, 0);
}

.v-leave,
.v-enter-to {
  transform: translate3d(0, 0, 0);
}
</style>
