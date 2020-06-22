const router = require('express').Router()
const Callback = require('./controller/songSheet.js')
const singerCallback = require('./controller/singerCallback.js')
const searchCb = require('./controller/searchCb.js')
const musicPlayDataCb = require('./controller/musicPlayData.js')
const mvCb = require('./controller/mv.js')



router.get('/getCategoryTags', Callback.getCategoryTags)
router.get('/getSongSheetList', Callback.getSongSheetList)
router.get('/getSongList', Callback.getSongList)
// 获取歌手数据

router.get('/getSingerTotalInfo', singerCallback.getTotalInfo)

router.get('/getMusicData', singerCallback.getMusicData)

router.get('/getAlbumData', singerCallback.getAlbumData)

router.get('/getMvData', singerCallback.getMvData)

router.get('/getMusicPlayData', musicPlayDataCb.getMusicPlayData)

router.get('/getLyric', musicPlayDataCb.getLyric)

router.get('/getAlbumSongList', singerCallback.getAlbumSongList)
 
// 获取搜索热词
router.get('/getHotKey', searchCb.getHotKey)
router.get('/getSongSearchResult', searchCb.getSongSearchResult)
// 获取热门MV 列表

router.get('/getHotMvList', mvCb.getHotMvList)
router.get('/getMvTagList', mvCb.getMvTagList)
router.get('/getMvPlayUrl', mvCb.getMvPlayUrl)

module.exports = router
