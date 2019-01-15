<template>
  <!-- <div class=""> -->
  <mv-list :dataKey="{picUrl:'pic',title:'name',desc:'singer'}" :data="mvList">
  </mv-list>
  <!-- </div> -->
</template>
<script type="text/javascript">
export default {
  name: '',
  data() {
    return {
      // limit: 40,
      // offset: 0,
      mvList: [],

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
  methods: {
    async getMvList(type) {
      var { data, code } = await this.__getJson(this.__HOT_MV_LIST_URL, this.query)
      if (code == this.__BERR_OK) {
        // console.log(data)
        return data

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
