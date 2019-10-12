const Callback = require('./callback.js')
const singerCallback = require('./singerCallback.js')
const searchCb = require('./searchCb.js')
const musicPlayDataCb = require('./musicPlayData.js')
const mvCb = require('./mv.js')

const compress = require('compression')
const history = require('connect-history-api-fallback')
const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()

app
  .use(compress({ level: 8 }))
  .use('/api', router)
  .use(history())
  .use(express.static(path.join(__dirname, '../dist')))

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.get('/getCategoryTags', Callback.getCategoryTags)
router.get('/getHotSongList', Callback.getHotSongList)
router.get('/getSongList', Callback.getSongList)
// 获取歌手数据
router.get('/getMusicData', singerCallback.getMusicData)
router.get('/getAlbumData', singerCallback.getAlbumData)
router.get('/getMvData', singerCallback.getMvData)
router.get('/getMusicPlayData', musicPlayDataCb.getMusicPlayData)
router.get('/getLyric', musicPlayDataCb.getLyric)
router.get('/getBLyric', musicPlayDataCb.getBLyric)
// 获取搜索热词
router.get('/getHotKey', searchCb.getHotKey)
router.get('/getSongSearchResult', searchCb.getSongSearchResult)
// 获取热门MV 列表

router.get('/getHotMvList', mvCb.getHotMvList)
router.get('/getMvTagList', mvCb.getMvTagList)

// 开启服务
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
