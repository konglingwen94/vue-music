<template>
  <div class="category">
    <div class="pubTitle">
      <span class="title-left">推荐分类</span>
      <router-link to="/categoryGroup" class="icon-arrow">
        <i class="cubeic-arrow icon-right-allCategory"></i>
      </router-link>
    </div>
    <!-- content -->
    <div class="category-wrap">
      <div :key="item.id" @click="toDetail(item)" class="category-cell" v-for="item in category">
        {{item.categoryName}}
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'category',
   
  props: {
    category: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        query: {
          ...item,
          id: item.categoryId
        },
        name: 'categoryDetail'
      })
    }
  }
};

</script>
<style scoped lang="less">
.category {
  .pubTitle {
    margin-bottom: 6px;
    padding-top: 6px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    .title-left {
      .font-dpr(14Px)
    }

    .icon-arrow {
       
      padding: 9px;

      .icon-right-allCategory {
        border: 1Px solid;
        border-radius: 50%;
        padding: 2px;
        margin-top: -6px;
      }
    }

  }

  .category-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .category-cell {
    width: 30%;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    background: #eee;
    margin: 3px 5px;
  }
}

</style>
