import playMode from '@/common/js/config'
import { loadSearch, loadPlay, loadFavorite } from '@/common/js/cache'
import { __DPR as DPR } from '@/config/config'

const state = {
  singer: {},
  initialed: false,
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  miniPlayerHeight: 0,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
