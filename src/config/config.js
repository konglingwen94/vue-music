// 获取屏幕dpr
function getDpr(argument) {
  // body...
  var rootDpr = document.documentElement.dataset.dpr;
  return isNaN(Number(rootDpr)) ? 1 : Number(rootDpr);
}

function getRootSize(argument) {
  // body...
  let fontSize = getComputedStyle(document.documentElement).fontSize;
  return parseFloat(fontSize);
}
const ENV = process.env.NODE_ENV;
const DOMAIN = ENV === "development" ? "localhost" : "123.57.204.48";

export const __QERR_OK = 0; //qq音乐api状态码
export const __NET_ERR_TEXT = "网络异常"; //网络中断提示文案

export const __DPR = getDpr(); //手机屏幕dpr
export const __ROOT_SIZE = getRootSize();

// api url
export const __SEARCH_URL = "/getSongSearchResult";
export const __MV_LIST_CATEGORY_URL = "/getMvTagList";
export const __HOT_MV_LIST_URL = "/getHotMvList";
export const __SONG_LIST = "/getSongList"; //歌单
export const __HOT_KEY = `/getHotKey`; //热门搜索
export const __SONG_SHEET_LIST = "/getSongSheetList";
export const __SINGER_LIST =
  "https://c.y.qq.com/v8/fcg-bin/v8.fcg?page=list&key=all_all_all";

export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};
export const options = {
  pullUpLoad: {
    txt: {
      more: "more",
      noMore: "noMore"
    },
    threshold: -70
  },
  scrollbar: true
};
