<template>
  <transition name="volume">
    <div v-show="showFlag" @click="hide" class="volume fullScreenFixed">
      <div class="volume-wrapper" @click.stop>
        <div class="radio-wrapper flex Around">
          <li
            @click.stop="toggleRadio(item)"
            :class="{ current: item.value === radio }"
            class="radio-item"
            :key="key"
            v-for="(item, key) in radios"
          >
            {{ item.text }}
          </li>
        </div>
        <div class="volume-content">
          <mt-range v-model="volume" v-on="$listeners" class="volume-range">
            <div @click="muteVolume" slot="start" class="volume-icon">
              <i :class="volumeCls"></i>
            </div>
          </mt-range>
        </div>
        <cube-button light class="1close" @click="hide">关闭</cube-button>
      </div>
    </div>
  </transition>
</template>
<script type="text/javascript">
const radios = [
  { text: "标准", value: 48 },
  { text: "高清", value: 96 },
  { text: "高品质", value: 320 },
  { text: "无损音质", value: "flac" },
  { text: "压缩无损音质", value: "ape" }
];
export default {
  name: "",
  data() {
    return {
      muted: false,
      radios,
      showFlag: false,
      volume: 20
    };
  },
  props: {
    radio: {
      type: [Number, String],
      default: 96
    },
    muted1: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit("input", this.volume);
    });
  },
  computed: {
    ...Vuex.mapGetters(["currentSong"]),
    volumeCls() {
      return this.volume === 0 || this.muted ? "cubeic-mute" : "cubeic-volume";
    }
  },
  watch: {
    volume(newV, oldV) {
      this.oldV = oldV;
    }
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    toggleRadio(item) {
      if (this.radio === item.value) {
        return;
      }
      if (!this.currentSong.hasOwnProperty("time")) {
        this.Toast({
          message: "此音质不可用",
          duration: 1000
        });
        return;
      }
      this.$emit("toggleRadio", item);
      this.hide();
      this.showToast = this.Toast({
        message: "切换为" + item.text,
        duration: 2000
      });
    },
    muteVolume() {
      this.muted = !this.muted;
      this.$emit("operate", this.muted);
    }
  }
};
</script>
<style scoped lang="less">
.volume-enter-active,
.volume-leave-active {
  transition: all 0.3s;

  .volume-wrapper {
    transition: inherit;
  }
}

.volume-enter,
.volume-leave-to {
  background: transparent !important;

  .volume-wrapper {
    transform: translate3d(0, 100%, 0);
  }
}

.volume {
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
}

.radio-wrapper {
  padding: 10px;

  .radio-item {
    &.current {
      color: red;
    }
  }
}

.volume-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;

  background: #fff;
}

.volume-content {
  padding: 20px;

  .volume-icon {
    margin-right: 10px;
    font-size: 2em;
  }
}

.close {
  text-align: center;
  line-height: 3;
  background: #eee;
}
</style>
