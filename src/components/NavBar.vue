<template>
  <!-- <div> -->
  <mt-navbar :style="`min-height:${h}px`" ref="navbar" class="navbar">
    <router-link tag="div" ref="item" v-for="(item, index) in navList" :key="index" class="nav-item" :to="{name:item.name,query:query}">{{item.label}} {{item.total}}</router-link>
  </mt-navbar>
  <!-- </div> -->
</template>
<script type="text/javascript">
export default {
  inheritAttrs: false,
  data() {
    return {
      // style: null,
      h: 0
    };
  },
  props: {

    query: {
      type: Object,
      default: () => ({})

    },
    navList: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {

  },
  created() {

    var name = this.$attrs.namePrefix;
    // console.log(name);
    if (name) {

      var _name = _.toLower(this.$options.name.replace('-', ''))
      this.$options.name = name + '-' + _name
    }
  },

  mounted() {
    // console.log(this.$el.style.display = 'block');
    setTimeout(() => {
      this.h = this.getElEvenHeight(this.$el)
      this.$emit('on-has-height', this.h)

      // 找到所有dom

    })
  },
  watch: {

  }
};

</script>
<style scoped lang="less">
.router-link-active {
  color: lightgreen;
  border-color: lightgreen !important;
}

.navbar {
  // display: flex;
  // position: fixed;
  top: 0;
  right: 0;
  left: 0;

}

.nav-item {
  padding: 10px 0;
  width: 100%;
  border-bottom: 3px solid transparent;
}

</style>
