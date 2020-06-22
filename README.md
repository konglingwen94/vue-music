# vue-music

A vue mobile music project

## 线上预览

[http://123.56.124.33:4000](http://123.56.124.33:4000)

![vue-music](./screenshot/previewQrcode.png)

## 安装依赖

`npm install`

## 启动后台 API 服务

`npm run server`

## 启动一个具有热重载功能的开发环境

`npm start`

## 项目构建

`npm run build`

## 项目部署

`npm run deploy`

> 修改 deploy.sh 文件 中的部署命令 <br>
> scp -r server/\* 你的服务器用户名@你的服务器公网 IP:服务器项目存放目录

## 实现功能

- [x] 歌手

  - [x] 歌曲
  - [x] 专辑
  - [x] MV

* [x] 歌单
  - [x] 全部分类
  - [x] 歌单列表
  - [x] 歌单详情
* [x] 视频
  - [x] 视频播放
  - [x] 分类选择
* [x] 搜索
  - [x] 热门搜索
  - [x] 搜索历史
  - [x] 分页加载
* [x] 播放器
  - [x] 吸底播放
  - [x] 全屏播放
  - [x] 进度条
  - [x] 上一首
  - [x] 下一首
  - [x] 播放/暂停
  - [x] 播放模式
  - [ ] 收藏
  - [x] 音质选择
  - [x] 音量控制
  - [x] 歌词展示

## 使用技术栈

`vue + vuex + vue-router`

`express` 搭建服务端 API

`mint-ui + cube-ui + vux`

`lyric-parser`把给定的歌词字符串解析成有格式文本的一个插件

`good-storage` 快速操作 localStorage 的第三方插件

`vue-lazyload` 一个基于`Vue`的图片懒加载插件

`lib-flexible` 由淘宝开发的移动端适配方案库

## 页面截图

![singer.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/singer.png)
![songSheet.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/songSheet.png)
![mv.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/mv.png)
![search.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/search.png)
![songPlayer(1).png](<https://github.com/konglingwen94/vue-music/blob/master/screenshot/songPlayer(1).png>)
![songPlayer(2).png](<https://github.com/konglingwen94/vue-music/blob/master/screenshot/songPlayer(2).png>)
![categoryGroup.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/categoryGroup.png)
![categoryDetail.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/categoryDetail.png)
![singerDetail(1).png](<https://github.com/konglingwen94/vue-music/blob/master/screenshot/singerDetail(1).png>)
![singerDetail(2).png](<https://github.com/konglingwen94/vue-music/blob/master/screenshot/singerDetail(2).png>)
![singerDetail(3).png](<https://github.com/konglingwen94/vue-music/blob/master/screenshot/singerDetail(3).png>)
![searchResult.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/searchResult.png)
![playlist.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/playlist.png)
![mv-picker.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/mv-picker.png)
![videoRadio-picker.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/videoRadio-picker.png)
![videoRadio-picker.png](https://github.com/konglingwen94/vue-music/blob/master/screenshot/videoRadio-picker.png)
