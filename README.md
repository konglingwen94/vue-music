# vue-music

A vue mobile music project

## 线上预览

[http://123.57.204.48:4000](http://123.57.204.48:4000)

![previewQrcode](https://user-images.githubusercontent.com/46000016/92676323-ea7b3680-f353-11ea-8e97-6d6e605746ba.png)

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

![videoRadio-picker](https://user-images.githubusercontent.com/46000016/92676327-ec44fa00-f353-11ea-911c-28dc31e5404f.png)
![songlist](https://user-images.githubusercontent.com/46000016/92676334-eea75400-f353-11ea-8e41-283d1245983b.png)
![songSheet](https://user-images.githubusercontent.com/46000016/92676337-ef3fea80-f353-11ea-8600-24c39e858231.png)
![songPlayer(2)](https://user-images.githubusercontent.com/46000016/92676339-efd88100-f353-11ea-8862-13cb10e79d08.png)
![songPlayer(1)](https://user-images.githubusercontent.com/46000016/92676342-f0711780-f353-11ea-9251-5264a9a2b5e3.png)
![singerDetail(3)](https://user-images.githubusercontent.com/46000016/92676344-f109ae00-f353-11ea-8aa4-cd4a54b5c2ea.png)
![singerDetail(2)](https://user-images.githubusercontent.com/46000016/92676349-f23adb00-f353-11ea-957c-37613b6cb3dd.png)
![singerDetail(1)](https://user-images.githubusercontent.com/46000016/92676353-f4049e80-f353-11ea-9e45-9283c01829ca.png)
![singer](https://user-images.githubusercontent.com/46000016/92676359-f535cb80-f353-11ea-8590-d8d453fe7916.png)
![searchResult](https://user-images.githubusercontent.com/46000016/92676360-f666f880-f353-11ea-97df-8fbfe0edfa95.png)
![search](https://user-images.githubusercontent.com/46000016/92676362-f6ff8f00-f353-11ea-8fe5-9a858addbc3f.png)
![playlist](https://user-images.githubusercontent.com/46000016/92676367-f7982580-f353-11ea-9056-03c5d2d441a1.png)
![mv](https://user-images.githubusercontent.com/46000016/92676369-f830bc00-f353-11ea-8bec-2ebdb98d794a.png)
![mv-picker](https://user-images.githubusercontent.com/46000016/92676371-f9fa7f80-f353-11ea-9a2e-f0326e1422d4.png)
![miniPlayer](https://user-images.githubusercontent.com/46000016/92676373-fa931600-f353-11ea-8698-8f0d426c23cc.png)
![categoryGroup](https://user-images.githubusercontent.com/46000016/92676376-fb2bac80-f353-11ea-864e-b8352fd1e968.png)
![categoryDetail](https://user-images.githubusercontent.com/46000016/92676378-fbc44300-f353-11ea-98cd-75dab3f3d3d2.png)
