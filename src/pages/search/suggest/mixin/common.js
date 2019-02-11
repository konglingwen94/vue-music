export default {
  data() {
    return {
      list: [],
      offset: 0,
      originLimit: 20,
      pulldownLimit: 0,
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 40,
          txt: '更新成功'
        }
      }
    };
  },
  computed: {
    params() {
      return {
        type: this.type,
        limit: this.originLimit,
        offset: this.offset,
        s: this.query
      }
    }
  },
  props: {

    query: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    query: {
      handler: 'coverData',
      immediate: true,
      // console.log(newQuery);
      // this.search()
    },
    'offset': 'addData'
  },
  methods: {
    onPullingDown() {
      // console.log('onPullingDown');
      this.pulldownLimit = this.randomFrom(this.originLimit / 3, this.originLimit)
      this.offset++;
    },
    async search(limit = this.originLimit) {
      // console.log(limit);
      var res = await this.__getJson(this.__SEARCH_URL, { ...this.params, limit })
      if (res.code == this.__BERR_OK) {
        return res.data

      }
    },
    async coverData() {

      this.list = []
      this.list = await this.search()

    },
    async addData() {
      // console.log('addData');
      // var limit = this.shuffeLimit(this.limit)
      this.list.unshift(...await this.search(this.pulldownLimit))
    },

  }
}
