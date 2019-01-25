const Callback = require('./callback.js')
const singerCallback = require('./singerCallback.js')
const searchCb = require('./searchCb.js')
const musicPlayDataCb = require('./musicPlayData.js')
const IP = require('../config/local.js').IP

const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, '../dist')))


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/getCategoryTags', Callback.getCategoryTags)
app.get('/getHotSongList', Callback.getHotSongList)
app.get('/getSongList', Callback.getSongList)
// 获取歌手数据
app.get('/getMusicData', singerCallback.getMusicData)
app.get('/getAlbumData', singerCallback.getAlbumData)
app.get('/getMvData', singerCallback.getMvData)
app.get('/getMusicPlayData', musicPlayDataCb.getMusicPlayData)
app.get('/getLyric', musicPlayDataCb.getLyric)
app.get('/getBLyric', musicPlayDataCb.getBLyric)
// 获取搜索热词
app.get('/getHotKey', searchCb.getHotKey)
// 开启服务
app.listen(3000, () => {
  console.log(IP + ' 3000 is running')
})
