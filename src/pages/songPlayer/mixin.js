import playMode from "@/common/js/config";

export default {
  computed: {
    ...Vuex.mapGetters([
      "singer",
      "playing",
      "playlist",
      "sequenceList",
      "mode",
      "currentIndex",
      "currentSong"
    ]),
    modeCls() {
      return this.mode === playMode.sequence
        ? "icon-shunxubofang"
        : this.mode === playMode.loop
        ? "icon-xunhuanbofang"
        : "icon-bofangye-caozuolan-suijibofang";
    }
  },
  methods: {
    ...Vuex.mapMutations({
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlaylist: "SET_PLAYLIST",
      setPlayMode: "SET_PLAY_MODE"
    }),

    changeMode() {
      var mode = (this.mode + 1) % 3;
      var list = null,
        message = "";
      if (mode === playMode.random) {
        list = this.__shuffle__(this.sequenceList);
        message = "随机播放";
      } else {
        if (mode === playMode.loop) {
          message = "循环播放";
        } else {
          message = "顺序播放";
        }
        list = this.sequenceList;
      }
      if (this.$options.name === "song-player") {
        this.Toast({
          message
        });
      }
      this.resetCurrentIndex(list);
      this.setPlaylist(list);
      this.setPlayMode(mode);
    },
    resetCurrentIndex(list) {
      var index = list.findIndex(item => {
        return item.id == this.currentSong.id;
      });
      this.setCurrentIndex(index);
    }
  }
};
