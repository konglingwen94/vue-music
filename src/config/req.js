import $ from "zepto";

function __getJson(url, option = {}) {
  // debugger
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/api${url}`,
      dataType: "json",
      method: "get",
      data: option,

      success(_res) {
        resolve(_res);
      },
      error(xhr, errType, err) {
        reject(errType);
      }
    });
  });
}

function __get(url, option = {}) {
  // debugger
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method: "get",
      data: option,

      dataType: "text",
      success(_res) {
        resolve(_res);
      },
      error(xhr, errType, err) {
        reject(errType);
      }
    });
  });
}

function __jsonp(url, option = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      dataType: "jsonp",
      data: option.params,
      jsonp: option.jsonp,
      jsonpCallback: option.jsonpCallback,
      success(res) {
        if (res.code == 0) {
          resolve(res);
        } else {
          reject("data error");
        }
      },
      error(xhr, errType, err) {
        reject(err);
      }
    });
  });
}

export default {
  __getJson,
  __jsonp,

  __get
};
