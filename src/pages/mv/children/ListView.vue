<template>
  <!-- <div class=""> -->
  <list :pickerData="merge" :videoParams="videoParams" :data="mvList">
  </list>
  <!-- </div> -->
</template>
<script type="text/javascript">
import List from './list.vue'
const pickerData = [{ text: '流畅', value: '360' }, { text: '标清', value: '480' }, { text: '高清', value: '720' }, { text: '超清', value: '1080' }];
const videoParams = [{ index: 0, r: 1 }, { index: 1, r: 2 }, { index: 2, r: 3 }, { index: 3, r: 4 }]

const r = 1;
const merge = _.merge([], pickerData, videoParams)
const videoType = merge.find(item => item.r === r)
// console.log(_.merge([], pickerData, videoParams))
// const videoType = { index: 1, r, text: '标清', value: 480 }

export default {
  name: '',
  components: { List },
  data() {
    return {
      mvList: [],
      merge,
      videoParams
    };
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
  watch: {},
  created() {
    // this.
    this.initData()
    // console.log('created')
    this.$emit('created')
  },
  mounted() {
    $(document).bind(
      'fullscreenchange webkitfullscreenchange mozfullscreenchange',
      function() {
        //todo code
        console.log(document.webkitIsFullScreen)
      }
    );
  },
  methods: {
    async getMvList(type) {
      var { data, code } = await this.__getJson(this.__HOT_MV_LIST_URL, this.query)
      if (code == this.__BERR_OK) {
        // console.log(data)
        return data.map(item => {
          item.videoType = this.__clone__(videoType)
          return item
        })

      }
    },
    async initData() {
      this.mvList = await this.getMvList()
    },
    async addData(list) {
      this.mvList.push(...await this.getMvList())
    },

  },
};

</script>
<style scoped lang="less">
</style>
