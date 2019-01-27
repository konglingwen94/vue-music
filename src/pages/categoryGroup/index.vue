<template>
  <div class="categoryGroup">
    <cube-loading class="icon-loading" v-if="loading"></cube-loading>
    <x-header class="header-nav">全部分类</x-header>
    <div class="table-wrap" @touchmove.stop>
      <x-table class="categoryTable" full-bordered v-for="(categoryGroupList,key)
 in category" :key="key">
        <tbody>
          <td valign="middle" class="categoryGroupName">
            {{categoryGroupList.categoryGroupName}}
          </td>
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
    };
  },

  created() {

    this.getCategoryOriginData()
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'categoryDetail') {

      // this.$emit('back')
      to.meta.back = true
    } else {
      to.meta.back = false

    }
    if (from.name === 'songSheet') {
      to.meta.forward = true

    } else {
      to.meta.forward = false

    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'songSheet') {
      // to.meta.back = true
      // to.meta.forward = false
    } else {
      // to.meta.back = false
      // to.meta.forward = true

    }
    next()
  },
  methods: {
    targetRouter(item) {
      // console.log(item)
      var query = { id: item.categoryId, ...item };
      return {
        name: 'categoryDetail',
        query
      }
    },
    getCategoryOriginData() {
      this.__getJson(`http://${domain}:3000/getCategoryTags`).then(data => {
        if (data.code == 0) {
          // (data.data)
          this.category = data.data.categories
          // this.getRecommendCategory()
          this.loading = false
        }
      })
    },
  }
};

</script>
<style scoped lang="less">
.categoryGroup {
  // position: fixed;
  // overflow: auto;
  padding-top: 50px;

  .header-nav {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
  }

  .table-wrap {
    overflow: auto;
    height: 90vh;
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
  vertical-align: middle
}

</style>
