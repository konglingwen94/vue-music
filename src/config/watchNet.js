// import Vue from 'vue'
import { Toast } from 'mint-ui';
import { __NET_ERR_TEXT } from './config.js'
// console.log(__DPR);
window.__ON_LINE = true;
var onLineTip, offLineTip, duration = 2000;
window.addEventListener("offline", () => {
  window.__ON_LINE = false;

  onLineTip && onLineTip.close()
  offLineTip = Toast({
    message: __NET_ERR_TEXT,
    // position: 'bottom',
    duration,
    className: 'toast-tip'
    // duration: 2000,
  })
}, false);
window.addEventListener("online", () => {
  window.__ON_LINE = true
  offLineTip && offLineTip.close()
  onLineTip = Toast({
    message: '网络已连接',
    className: 'toast-tip',
    // position: 'bottom',
    duration
  })
}, false);
