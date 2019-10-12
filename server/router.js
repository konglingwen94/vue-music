const router = require('express').Router()
const Callback = require('./callback.js')
const singerCallback = require('./singerCallback.js')
const searchCb = require('./searchCb.js')
const musicPlayDataCb = require('./musicPlayData.js')
const mvCb = require('./mv.js')

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

module.exports = router
