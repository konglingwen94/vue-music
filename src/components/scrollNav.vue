<template>
  <div class="scrollNav">
    <cube-scroll direction="horizontal" class="horizontal-scroll-list-wrap">
      <ul class="list-wrapper">
        <li @click="selectItem(item.id,'area')" :class="{active:item.id==area}" :key="index" v-for="(item,index) in categoryMvData.area" class="list-item">{{ item.title }}</li>
      </ul>
    </cube-scroll>
    <cube-scroll direction="horizontal" class="horizontal-scroll-list-wrap">
      <ul class="list-wrapper">
        <li @click="selectItem(item.id,'tag')" :class="{active:item.id==tag}" :key="index" v-for="(item,index) in categoryMvData.tag" class="list-item">{{ item.title }}</li>
      </ul>
    </cube-scroll>
    <cube-scroll direction="horizontal" class="horizontal-scroll-list-wrap">
      <ul class="list-wrapper">
        <li @click="selectItem(item.id,'year')" :class="{active:item.id==year}" :key="index" v-for="(item,index) in categoryMvData.year" class="list-item">{{ item.title }}</li>
      </ul>
    </cube-scroll>
  </div>
</template>
<script type="text/javascript">
export default {
  name: '',
  data() {
    return {

    };
  },
  created() {
    this.getMvListCategory()
  },
  methods: {
    selectItem(id, key) {
      console.log(id, key);
      this[key] = id;
      // this[e.target.dataset.label] = e.target.dataset.id
      // $(e.target).toggleClass('active')
    },
    getMvListCategory() {
      this.__getJson('https://api.bzqll.com/music/tencent/mvListCategory?key=579621905').then(data => {
        if (data.code == 200) {
          console.log(data);
          this.categoryMvData = data.data
        }
      })
    }
  },
};

</script>
<style lang="less">
.horizontal-scroll-list-wrap {


  .cube-scroll-content {
    // width: 2000px !important;
    display: inline-block;
  }

  .list-wrapper {
    .active {
      color: red;
    }

    padding: 0 10px;
    line-height: 60px;
    white-space: nowrap;
  }

  .list-item {
    // width: 200px;
    padding: 0 20px;
    display: inline-block
  }

}

</style>
