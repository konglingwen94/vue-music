export default {
  data() {
    return {
      scroll: {},
      // 设置数据加载索引
      begin: 0,
      // num: 20,

      // 是否有更多数据
      hasMore: true,
      // 没有数据时记录上拉次数
      noMorepullUpCount: 0,
      // 当前路由离开时是否滚动到顶部
      leaveIsTop: false,
      // 加载数据更新完成状态
      updatedPromise: null,
      // 当前页面离开时的滚动位置
      // leaveY: 0,
      // 是否等待当前页更新完成后切换新页面
      isDelayToggle: false,
      // 记录页面初始完成状态
      inited: false,
      // 记录当前网络状态
      // netNormal: true,
      layoutColumnCount: 1,
      y: 0,
    }
  },
 
  computed: {
    ...Vuex.mapGetters(['miniPlayerHeight']),
    options() {
      
      return {
        // 设置滚动初始位置
        startY: this.translateY,
        pullUpLoad: {
          // 设置上拉加载文案
          txt: {
            noMore: '没有更多数据了',
            // 根据页面加载状态设置加载更多文案
            more: !this.inited ? '' : '加载更多数据',
          },
          // 设置距离底部阈值触发上拉功能
          threshold: -60,
        },
        // 设置滚动条
        scrollbar: true,
      }
    },
    query() {
      var num = 0
      switch (true) {
        case this.total >= 500:
          num = 40
          break
        case this.total > 200:
          num = 30
          break
        default:
          num = 20
      }
      return {
        singermid: this.$route.query.mid,
        begin: this.begin,
        num: this.layoutColumnCount * num, // 设置数据加载个数
      }
    },
    total() {
      const result = this.navList.find(item => item.name === this.$options.name)
      return (result && result.total) || -1
    },
  },
  props: {
    navList: {
      type: Array,
      default: [],
    },
    // 滚动容器实际偏移位置
    translateY: {
      type: Number,
      default: 0,
    },
    // 当期容器是否滚动到顶部
    offsetToTop: {
      type: Boolean,
      default: false,
    },

    // 实时滚动位置
    scrollY: {
      type: Number,
      default: 0,
    },
    // 页面加载状态
    pageState: {},
  },
  created() {
    // 设置页面初始化状态
    // this.$emit('update:pageState.isLoading', true)
    this.$emit('update:pageState', { isLoading: true, isAbort: false })
    // 获取页面初始数据
    this.updatedPromise = this.getData()
    // 捕获请求错误处理
    this.updatedPromise.catch(errType => {
      // 判断错误类型
      var isAbort = errType == 'abort'
      // 发送页面加载状态信息
      this.$emit('update:pageState', { isLoading: !isAbort, isAbort })
    })
  },
  mounted() {
    // console.log('mounted');
    this.$nextTick(() => {
      this.scroll = this.$refs.scroll.scroll
      // 页面加载时禁用滚动
      this.$refs.scroll.disable()
    })
  },
  updated() {
    this.$nextTick(() => {
      // 判断页面初始化状态
      if (!this.inited) {
        // 触发页面加载完成
        this.$emit('update:pageState', { isLoading: false, isAbort: false })

        // 启用滚动
        this.$refs.scroll.enable()
        // 设置上拉加载更多文案
        // this.options.pullUpLoad.txt.more = '加载更多数据'
        // 设置页面初始化完成
        this.inited = true
      }
    })
  },
  activated() {
    if (this.inited && this.pageState.isLoading) {
      this.$emit('update:pageState', { isLoading: false, isAbort: false })
    }

    // 判断子页面是否初始化完成，是否禁用滚动
    !this.inited && this.$refs.scroll.disable()
    // 判断滚动容器切换时不在顶部
    if (!this.offsetToTop || this.backToCurY) {
      // 设置激活页面滚动到偏移位置
      this.$refs.scroll.scrollTo(0, this.translateY)
      // 判断当前页激活时偏移到顶部时
    } else if (this.offsetToTop && this.scroll.y > this.translateY) {
      // 滚动到离开时位置
      this.$refs.scroll.scrollTo(0, this.translateY)
    }
    // 页面切回时刷新滚动
    this.$refs && this.$refs.scroll.refresh()
  },
  // 当前页离开之前
  async beforeRouteLeave(to, from, next) {
    // 标记页面是否在上拉状态中
    var isPullUpLoad = this.$refs.scroll.isPullUpLoad
    if ((isPullUpLoad || this.isLoading) && this.isDelayToggle) {
      await this.updatedPromise
      // console.log(this.updatedPromise)
    }
    // 停止滚动
    this.$refs.scroll.scroll.stop()
    // 记录滚动位置
    // this.leaveY = this.$refs.scroll.scroll.y
    // 标记页面是否偏移到顶部
    // this.leaveIsTop = this.offsetToTop;

    this.backToCurY = this.isLoading
    // 切换到下个页面
    next()
  },

  methods: {
    ...Vuex.mapMutations({
      addList: 'ADD_PLAY_LIST',
    }),
    refreshPage() {
       

      this.getData()
    },
    onScroll({ y }) {
      // 实时更新滚动位置
      this.$emit('update:scrollY', y)
    },
    async onPullingUp() {
      // 没有更多数据时
      if (!this.hasMore) {
        // 设置上拉次数递增
        this.noMorepullUpCount++
        //标记上拉结束
        setTimeout(this.forceUpdated, 500)
        // 判断上拉次数
        if (this.noMorepullUpCount >= 4) {
          // 延时关闭上拉功能
          setTimeout(() => {
            this.$refs.scroll.scroll.closePullUp()
          }, 1000)
        }
        // 有更多数据时
      } else {
        // 获取页面更新状态实例
        this.updatedPromise = this.getData()
        // 错误处理
        this.updatedPromise
          .then(() => {
            // 捕获到错误
          })
          .catch(errType => {
            // 错误类型是否为网络错误
            if (errType == 'abort') {
              // 标记网络错误
              // this.netNormal = false
              setTimeout(this.forceUpdated, 500)
              // this.forceUpdated()
            }
          })
      }
    },
    //异步标记上拉结束
    async forceUpdated() {
      // 检查是否有更多数据
      this.checkMore()
      // 等待dom更新完成更新滚动
      this.$nextTick(() => {
        // setTimeout(() => {
        // 计算滚动
        this.$refs.scroll.refresh()
        // 标记上拉完成状态
        this.$refs.scroll.forceUpdate(this.hasMore)
      })
    },
    checkMore() {
      // 判断已加载数据列表个数和总个数
      if (this.list.length >= this.total) {
        // 记录是否有更多数据
        this.hasMore = false
        // 网络正常且有更多数据时准备下次加载
      } else if (navigator.onLine && this.hasMore) {
        // 计算数据开始位置
        this.begin += this.query.num
      }
    },
  },
}
