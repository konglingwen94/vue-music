import { Toast } from "mint-ui";
import { __NET_ERR_TEXT } from "./config.js";

window.__ON_LINE = true;
var onLineTip,
  offLineTip,
  duration = 2000;
window.addEventListener(
  "offline",
  () => {
    window.__ON_LINE = false;

    onLineTip && onLineTip.close();
    offLineTip = Toast({
      message: __NET_ERR_TEXT,

      duration,
      className: "toast-tip"
    });
  },
  false
);
window.addEventListener(
  "online",
  () => {
    window.__ON_LINE = true;
    offLineTip && offLineTip.close();
    onLineTip = Toast({
      message: "网络已连接",
      className: "toast-tip",

      duration
    });
  },
  false
);
