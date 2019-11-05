export default {
  data() {
    return {
      list: [],
      pulldownList: [],
      offset: 1,
      originLimit: 20,
      pulldownLimit: 0,
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 40,
          txt: '更新成功',
        },
      },
    }
  },
  computed: {
    params() {
      return {
        type: this.type,
        limit: this.originLimit,
        offset: this.offset,
        w: this.query,
      }
    },
  },
  props: {
    query: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  watch: {
    pulldownList: {
      handler(newList, oldList) {
        oldList && oldList.forEach(item => delete item.newLoad)
        if (newList) {
          newList.forEach(item => {
            item.newLoad = true
          })
        }
      },
      immediate: true,
    },
    query: {
      handler: 'coverData',
      immediate: true,
    },
    offset: 'addData',
  },
  methods: {
    onPullingDown() {
      // console.log('onPullingDown');
      this.pulldownLimit = this.randomFrom(
        this.originLimit / 3,
        this.originLimit
      )
      this.offset++
    },
    async search(limit = this.originLimit) {
      // console.log(limit);
      var { code, data } = await this.__getJson(this.__SEARCH_URL, {
        ...this.params,
        limit,
      })
      if (code == this.__QERR_OK) {
        const vm = this
        this.playPromise = await this.getSongUrl(data.song.list)
        return data.song.list.map(item => {
          return new this.__Song(
            this.__pick__(item, [
              'songid',
              'songmid',
              'albummid',
              'albumid',
              'singer',
              'url',
              'songname',
            ])
          )
        })
      }
    },
    async getSongUrl(list) {
      var mids = list.map(song => {
        return song.songmid
      })
      const songParams = {
        mid: mids.join(','),
      }
      var { code, req } = await this.__getJson(`/getMusicPlayData`, songParams)
      if (code == this.__QERR_OK && req.code == this.__QERR_OK) {
        var { midurlinfo } = req.data
        midurlinfo.forEach((mid, index) => {
          list[index].url = `${this.SONG_SOURCE}${mid.purl}`
        })
      }
    },
    async coverData() {
      this.list = []
      this.list = await this.search()
    },
    async addData() {
      this.pulldownList = await this.search(this.pulldownLimit)
      this.list.unshift(...this.pulldownList)
    },
  },
}
