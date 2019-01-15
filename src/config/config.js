// 获取屏幕dpr
function getDpr(argument) {
  // body...
  var rootDpr = document.documentElement.dataset.dpr;
  return isNaN(Number(rootDpr)) ? 1 : Number(rootDpr)

}

function getRootSize(argument) {
  // body...
  let fontSize = getComputedStyle(document.documentElement).fontSize;
  return parseFloat(fontSize)
}
const DOMAIN = '192.168.1.5'

export const __QERR_OK = 0 //qq音乐api状态码
export const __NET_ERR_TEXT = '网络异常' //网络中断提示文案

export const __DPR = getDpr() //手机屏幕dpr
export const __BERR_OK = 200 //鼻子亲了脸音乐api状态码
export const __ROOT_SIZE = getRootSize()

// api url
export const __SEARCH_URL = 'https://api.bzqll.com/music/tencent/search?key=579621905'
export const __MV_LIST_CATEGORY_URL = 'https://api.bzqll.com/music/tencent/mvListCategory?key=579621905'
export const __HOT_MV_LIST_URL = 'https://api.bzqll.com/music/tencent/hotMvList?key=579621905'
export const __HOT_KEY = `http://${DOMAIN}:3000/getHotKey` //热门搜索

export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}
