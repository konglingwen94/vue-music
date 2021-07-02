import Vue from "vue";
import Vuex from "vuex";

import util from "./util.js";
import * as config from "./config.js";
import song from "./song.js";
import remoteUrl from "./remoteUrl.js";
import * as Dom from "./dom.js";
// 监测网络变化
require("./watchNet.js");
// 检测屏幕方向
// require('./orient.js')
// 修复第三方库样式font-size
require("./repairLibStyle.js");
// Object.assign(Vue.prototype, util, { _zetpo: util }, util, config)
Object.assign(
  Vue.prototype,
  { bus: new Vue() },
  util,
  song,
  config,
  remoteUrl,
  Vuex,
  Dom
);
window.Vue = Vue;
window.Vuex = Vuex;
window.Util = util;
window.Song = song.__Song;
const ENV = process.env.NODE_ENV;
window.domain = ENV === "development" ? "localhost" : "123.57.204.48";
