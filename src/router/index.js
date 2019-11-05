import Vue from 'vue'
import Router from 'vue-router'

const SongList = r =>
  require.ensure([], () => r(require('@/pages/songList')), 'SongList')
const CategoryGroup = r =>
  require.ensure(
    [],
    () => r(require('../pages/categoryGroup')),
    'CategoryGroup'
  )
const Singer = r =>
  require.ensure([], () => r(require('@/pages/singer')), 'Singer')

// const SingerDetail = resolve => require(['@/pages/singerDetail'], resolve)
const SingerDetail = r =>
  require.ensure([], () => r(require('@/pages/singerDetail')), 'SingerDetail')
const SongSheet = r =>
  require.ensure([], () => r(require('@/pages/songSheet')), 'SongSheet')
const Mv = r => require.ensure([], () => r(require('@/pages/mv')), 'mv')
// const Mv = resolve => require(['@/pages/mv'], resolve)
// const CategoryDetail = resolve => require(['@/pages/categoryDetail'], resolve)
const CategoryDetail = r =>
  require.ensure(
    [],
    () => r(require('@/pages/categoryDetail')),
    'CategoryDetail'
  )

const ListView = () =>
  import(/* webpackChunkName: "listView" */ '@/pages/mv/children/ListView.vue')
const Music = () =>
  import(/* webpackChunkName: "music" */ '@/pages/singerDetail/children/music.vue')
const Album = () =>
  import(/* webpackChunkName: "album" */ '@/pages/singerDetail/children/album.vue')
const SingerMv = () =>
  import(/* webpackChunkName: "singermv" */ '@/pages/singerDetail/children/mv.vue')
const Search = () => import(/* webpackChunkName: "search" */ '@/pages/search')

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
  routes: [
    { path: '*', redirect: '/singer' },

    {
      path: '/songList',
      name: 'songList',
      component: SongList,
      meta: { fullScreenFixed: true, useSlide: true, index: 7 },
    },
    {
      path: '/categoryGroup',
      name: 'categoryGroup',
      component: CategoryGroup,
      meta: { fullScreenFixed: true, index: 5, useSlide: true },
    },
    {
      path: '/categoryDetail',
      name: 'categoryDetail',
      component: CategoryDetail,
      meta: { fullScreenFixed: true, useSlide: true, index: 6 },
    },
    {
      path: '/songSheet',
      name: 'songSheet',
      component: SongSheet,
      meta: { isHome: true, index: 1, useSlide: true },
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      meta: { index: 0, useSlide: true, isHome: true },
    },
    {
      path: '/singerDetail/',
      name: 'singerDetail',
      component: SingerDetail,

      redirect: '/singerDetail/music',
      meta: { index: 5, useSlide: true, fullScreenFixed: true },
      children: [
        {
          path: 'music',
          name: 'music',
          label: '单曲',
          component: Music,
        },
        {
          path: 'album',
          name: 'album',
          label: '专辑',
          component: Album,
        },
        {
          path: 'mv',
          name: 'singerMv',
          label: 'mv',
          component: SingerMv,
        },
      ],
    },
    {
      path: '/mv',
      name: 'mv',
      component: Mv,
      meta: { isHome: true, index: 2, useSlide: true },
      children: [{ name: 'listView', path: 'listView', component: ListView }],
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: { isHome: true, index: 3, fullScreenFixed: false, useSlide: true },
    },
  ],
})
