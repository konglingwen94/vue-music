<template>
  <div class="categoryGroup">
    <cube-loading class="icon-loading" v-if="loading"></cube-loading>
    <x-header class="header-nav">全部分类</x-header>
    <div class="table-wrapper native-vertical-scroll">
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
  mounted() {
    const navHeight = $('.header-nav').height();
    console.log(navHeight);
    const height = window.innerHeight - navHeight;
    $('.table-wrapper').css({ height })
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
    async getCategoryOriginData() {
      const { data, code } = await this.__getJson(`http://${domain}:3000/getCategoryTags`)
      if (code == 0) {
        // (data.data)
        this.category = data.categories
        // this.getRecommendCategory()
        this.loading = false
      }
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
  vertical-align: middle
}

</style>
