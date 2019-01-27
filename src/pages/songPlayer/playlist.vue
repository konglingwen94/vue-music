<template>
  <cube-scroll local ref="scrollPlaylist" :client-top="500" :data="playlist" class="playlist">
    <transition-group tag="ul">
      <li @click="playItem(item)" :class="['play-item', 'flex',{current:currentSong.id===item.id}]" v-for="(item,index) in playlist" :key="item.id">
        <div class="index-wrapper">
          <p class="text">{{index+1}}</p>
        </div>
        <div class="name-wrappper">
          <p class="name">{{item.name}}</p>
        </div>
        <div @click="handleClose(item)" class="closer-wrapper">
          <i class="cubeic-close"></i>
        </div>
      </li>
    </transition-group>
  </cube-scroll>
</template>
<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: '',
  props: {
    playlist1: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['playlist', 'currentSong'])
  },
  methods: {
    ...mapMutations({
      deleteItem: 'DELETE_PLAY_LIST_ITEM',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    handleClose({ id }) {
      const index = this.playlist.findIndex(item => item.id === id)
      this.deleteItem(index)
    },
    playItem({ id }) {
      const index = this.playlist.findIndex(item => item.id === id)
      this.setCurrentIndex(index)
    }
  }
};

</script>
<style scoped lang="less">
.playlist {
  padding: 10px;
}

.play-item {
  margin-bottom: 20px;

  &.current {
    color: red;
  }

  .closer-wrapper {
    margin-left: auto;
    font-size: 1.5em;
  }
}

</style>
