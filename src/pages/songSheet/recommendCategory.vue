<template>
  <div class="category">
    <div class="pubTitle" v-if="true">
      <span class="title-left">推荐分类</span>
      <p @click="toCategoryGroup" class="icon-arrow">
        <i class="cubeic-arrow icon-right-allCategory"></i>
      </p>
    </div>
    <!-- content -->
    <div class="category-wrap">
      <router-link :key="item.categoryId" tag="div" :to="{name:'categoryDetail',query:item}" class="category-cell" v-for="item in recommendCategory">
        <!-- <cube-button :inline="1">{{item.categoryName}}</cube-button> -->
        {{item.categoryName}}
      </router-link>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'recommendCategory',
  data() {
    return {
      // recommendCategory: []
    };
  },
  props: {
    recommendCategory: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: true,
    }
  },
  updated() {
    // ('3')
    // this.getRecommendCategory()
  },
  methods: {
    toCategoryGroup() {
      this.$router.push({
        path: '/categoryGroup',

      })
      // this.position = "categoryGroup"
    },
  },
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
      // float: right;
      // border: 4px solid transparent;
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
