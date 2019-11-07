<template>
  <cube-scroll class="song-page" :data="list" @pulling-down="onPullingDown" :options="options">
    <my-loading v-if="list.length===0"></my-loading>
    <pull-down-refresh
      :limit="pulldownList.length"
      :props="props"
      slot="pulldown"
      slot-scope="props"
    ></pull-down-refresh>

    <transition @enter="enter" @after-enter="afterEnter">
      <music-list @hasHeight="getItemHeight" :key="list.length" :list="list"></music-list>
    </transition>
  </cube-scroll>
</template>
<script type="text/javascript">
export default {
  name: 'song',
  data() {
    return {
      itemHeight: 0,
      list: [],
      pulldownList: [],
      offset: 1,
      originLimit: 20,
      pulldownLimit: 0,
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 40,
          txt: '更新成功'
        }
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

  computed: {
    params() {
      return {
        type: this.type,
        limit: this.originLimit,
        offset: this.offset,
        w: this.query
      }
    },
    pulldownLen() {
      return this.pulldownList.length
    }
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
      immediate: true
    },
    query: {
      handler: (() => {
        let timer
        return function() {
          if (timer) {
            clearTimeout(timer)
          }

          timer = setTimeout(this.coverData, 300)
        }
      })(),
      immediate: true
    },
    offset: 'addData'
  },
  methods: {
    getItemHeight(height) {
      // this.done()
      this.itemHeight = height
    },
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
      const result = await this.__getJson(this.__SEARCH_URL, {
        ...this.params,
        limit
      })
      return result.map(item => {
        return new this.__Song(item)
      })
    },

    async coverData() {
      this.list = []
      this.list = await this.search()
      this.$emit('search', this.query)
    },
    async addData() {
      this.pulldownList = (await this.search(this.pulldownLimit)).filter(
        newItem => {
          return !this.list.find(item => item.id === newItem.id)
        }
      )

      this.list.unshift(...this.pulldownList)
    },

    async enter(el, done) {
      const len = this.pulldownLen === 0 ? this.list.length : this.pulldownLen
      const offsetHeight = len * this.itemHeight
      setTimeout(async () => {
        $(el).css({ transform: `translate3d(0,${-offsetHeight}px,0)` })
        // console.log(offsetHeight, $(el).css('transform'));
        await new Promise(resolve => setTimeout(resolve, 70))
        $(el)
          .css({
            transition: `all ${offsetHeight}ms`,
            transform: 'translate3d(0,0,0)'
          })
          .bind('transitionend', done)
      }, 50)
    },
    afterEnter(el) {
      // this.transition = ''
      $(el).css({ transition: '', transform: '' })
    }
  }
}
</script>
<style scoped lang="less">
.my-loading {
  top: calc(100vh / 2 - 100px);
}
</style>
