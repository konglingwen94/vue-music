<template>
  <div class="categoryGroup">
    <my-loading v-if="category.length===0"></my-loading>
    <x-header class="header-nav">全部分类</x-header>
    <div
      :style="{paddingBottom:miniPlayerHeight+'px'}"
      class="table-wrapper native-vertical-scroll"
    >
      <x-table
        class="categoryTable"
        full-bordered
        v-for="(categoryGroupList,key)
 in category"
        :key="key"
      >
        <tbody>
          <td valign="middle" class="categoryGroupName">{{categoryGroupList.categoryGroupName}}</td>
          <tr class="categoryGroupList">
            <td width="33%" :key="key" v-for="(item,key) in categoryGroupList.items">
              <router-link tag="div" :to="targetRouter(item)">{{item.categoryName}}</router-link>
            </td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'categoryGroup',
  data() {
    return {
      category: [],
      loading: true
    }
  },

  created() {
    this.getCategoryOriginData()
  },
  mounted() {
    const navHeight = $('.header-nav').height()
     
    const height = window.innerHeight - navHeight
    this.maxHeight = height
    $('.table-wrapper').css({ height })
  },
  deactivated() {
    this.scrollTop = $('.table-wrapper').scrollTop()
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.index > from.meta.index) {
      next()
      return
    }
    next(vm => {
      if (typeof vm.scrollTop === 'number') {
        $('.table-wrapper')[0].scrollTo(0, vm.scrollTop)
      }
    })
  },

  methods: {
    targetRouter(item) {
      // console.log(item)
      var query = { id: item.categoryId, ...item }
      return {
        name: 'categoryDetail',
        query
      }
    },
    async getCategoryOriginData() {
      const { data, code } = await this.__getJson(`/getCategoryTags`)
      if (code == 0) {
        // (data.data)
        this.category = data.categories
        // this.getRecommendCategory()
        this.loading = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.my-loading {
  top: 50%;
}

.categoryGroup {
  padding-top: 50px;

  .header-nav {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
  }

  .table-wrap {
    // height: calc(100vh - 1.33rem);
  }
}

.categoryTable {
  margin: 10px 0;
}

.categoryGroupList {
  display: flex;
  flex-wrap: wrap;
}

.categoryGroupName {
  width: 100px;
  vertical-align: middle;
}
</style>
