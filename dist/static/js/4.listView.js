webpackJsonp([4],{"8cXC":function(e,n,t){var a=t("bOhr");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("e5072136",a,!0,{})},QfRI:function(e,n,t){var a=t("fn0f");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("0a7974fd",a,!0,{})},VqoV:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("Gu7T"),i=t.n(a),r=t("Xxa5"),s=t.n(r),o=t("exGp"),A=t.n(o),c={name:"mv-list",data:function(){return{currentMv:null,playing:!1,mvReady:!1,currentVdo:null,error:!1,fullscreen:!1,orientation:0}},props:{data:{type:Array,default:function(){return[]}}},created:function(){},mounted:function(){var e=this;$(document).bind("fullscreenchange webkitfullscreenchange mozfullscreenchange",function(){e.fullscreen=document.webkitIsFullScreen&&document.webkitCurrentFullScreenElement===e.currentVdo})},watch:{"currentMv.videoType.index":function(e){e&&(this.currentVdo.src=this.currentMv.urls[e])},currentVdo:function(e,n){e&&(e.load(),$(e).attr("controls","controls"),this.reactive.$scroll.scrollToElement(e,1e3,!0,!0)),n&&(n.src="",$(n).removeAttr("controls"))},"reactive.scrollY":function(e){if(this.currentVdo){var n=this.getVdoRect().top;(this.getVdoRect().bottom<=this.reactive.clientTop||n>=window.innerHeight)&&(this.currentVdo.src="",this.currentVdo=null,this.currentMv=null)}}},inject:["reactive"],inheritAttrs:!1,computed:{videoType:function(){return this.currentMv?this.currentMv.videoType:null},selected:function(){return this.currentMv?{index:this.selectedIndex[0]}:null},selectedIndex:function(){return this.currentMv?[this.currentMv.videoType.index]:[-1]}},methods:{isCurrent:function(e){return this.currentMv===e},showPicker:function(){this.picker||(this.picker=this.$createPicker({title:"Picker",$props:{selectedIndex:"selectedIndex"},data:[this.$attrs.pickerData],onSelect:this.selectHandle})),this.picker.show()},selectHandle:function(e,n,t){this.currentMv.videoType.index=n[0],this.currentMv.videoType.text=t[0]},onloadstart:function(e){e.target===this.currentVdo&&(this.errToast&&this.errToast.close(),this.mvReady=!1,this.error=!1)},onerror:function(e){e.target===this.currentVdo&&(this.error=!0,this.errToast=this.Toast({message:"error",duration:2e3}))},getVdoRect:function(){return this.currentVdo?this.currentVdo.getBoundingClientRect():{}},onwaiting:function(){this.mvReady=!1},oncanplay:function(e){this.mvReady=!0,this.currentVdo&&this.currentVdo.play(),this.playing=!0},selectItem:function(e,n){this.currentVdo!==e.target&&(e.target.src=n.urls[n.videoType.index],this.currentVdo=e.target,this.currentMv=n)}}},l={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{class:["mv-list"]},e._l(e.data,function(n,a){return t("div",{key:a,class:["mv-item",{current:e.isCurrent(n)},{fullscreen:e.fullscreen}]},[t("div",{staticClass:"video-wrapper"},[t("video",{class:["video"],attrs:{controlslist:"nodownload",src:"",poster:n.picurl},on:{loadstart:e.onloadstart,error:e.onerror,waiting:e.onwaiting,canplay:e.oncanplay,click:function(t){e.selectItem(t,n)}}}),e._v(" "),e.mvReady||e.currentMv!==n||e.error?e._e():t("mt-spinner",{staticClass:"waiting-snake",attrs:{type:"snake",size:40,color:"blue"}}),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:e.currentMv===n,expression:"currentMv===item"}],staticClass:"vdoType-wrapper",attrs:{inline:""},on:{click:e.showPicker}},[e._v("\n        "+e._s(n.videoType.text)+"\n        "),t("i",{staticClass:"cubeic-select"})])],1),e._v(" "),t("div",{class:["text-wrap"]},[t("div",{staticClass:"text-title"},[t("p",{staticClass:"title ellipsis",domProps:{textContent:e._s(n.title)}})]),e._v(" "),t("div",{staticClass:"text-desc"},[t("p",{staticClass:"desc ellipsis",domProps:{textContent:e._s(n.singer)}})])])])}))},staticRenderFns:[]};var d=t("VU/8")(c,l,!1,function(e){t("g5K8"),t("QfRI")},"data-v-05e1acbe",null).exports,b=[{index:0},{index:1},{index:2},{index:3}],C=_.merge([],[{text:"流畅",value:"360"},{text:"标清",value:"480"},{text:"高清",value:"720"},{text:"超清",value:"1080"}],b),v=C[0],p={name:"",components:{List:d},data:function(){return{mvList:[],merge:C,showFlag:!1,videoParams:b,error:!1}},props:{label:{type:Object,default:function(){return{}}},query:{type:Object,default:function(){return{}}}},activated:function(){this.showFlag=!0},deactivated:function(){this.showFlag=!1},created:function(){this.initData(),this.$emit("created")},mounted:function(){$(document).bind("fullscreenchange webkitfullscreenchange mozfullscreenchange",function(){})},methods:{getMvList:function(){var e=this;return A()(s.a.mark(function n(){var t,a,i,r,o,A,c;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.__getJson(e.__HOT_MV_LIST_URL,e.query).catch(function(n){console.error(n),e.error=!0});case 2:if(t=n.sent,a=t.mv_list,i=void 0===a?[]:a,t.code!=e.__QERR_OK){n.next=16;break}return r=i.data.list,o=r.map(function(e){return e.vid}),n.next=11,e.__getJson("/getMvPlayUrl",{vids:o});case 11:return A=n.sent,c=A.getMvUrl.data,n.abrupt("return",r.map(function(n){return n.videoType=e.__clone__(v),n.singer=e.__format(n.singers),n.url=c[n.vid].mp4[1].freeflow_url[0],n.urls=c[n.vid].mp4.filter(function(e,n){return n>0}).map(function(e){return e.freeflow_url[0]}),n}));case 16:case"end":return n.stop()}},n,e)}))()},initData:function(){var e=this;return A()(s.a.mark(function n(){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.getMvList();case 2:e.mvList=n.sent;case 3:case"end":return n.stop()}},n,e)}))()},addData:function(e){var n=this;return A()(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=(t=n.mvList).push,e.t1=t,e.t2=i.a,e.next=5,n.getMvList();case 5:e.t3=e.sent,e.t4=(0,e.t2)(e.t3),e.t0.apply.call(e.t0,e.t1,e.t4);case 8:case"end":return e.stop()}},e,n)}))()}}},u={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",[e.showFlag?t("div",{staticClass:"list-wrap"},[t("list",{attrs:{pickerData:e.merge,videoParams:e.videoParams,data:e.mvList}}),e._v(" "),0==e.mvList.length?t("my-loading",{attrs:{error:e.error}}):e._e()],1):e._e()])},staticRenderFns:[]};var f=t("VU/8")(p,u,!1,function(e){t("8cXC")},"data-v-542b057b",null);n.default=f.exports},bOhr:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,'\n.fullBox[data-v-542b057b] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n}\n.flexYCenter[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.flexAround[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n}\n.flexBetween[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.flexXCenter[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.flexCenter[data-v-542b057b] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.mint-msgbox[data-v-542b057b] {\n  z-index: 300;\n}\n.mint-msgbox-btns button[data-v-542b057b] {\n  font-size: 12Px;\n  /* no*/\n}\n[data-dpr="2"] .mint-msgbox-btns button[data-v-542b057b] {\n  font-size: 24Px;\n  /* no  */\n}\n[data-dpr="3"] .mint-msgbox-btns button[data-v-542b057b] {\n  font-size: 36Px;\n  /* no  */\n}\n.my-loading[data-v-542b057b],\n.my-error[data-v-542b057b] {\n  top: 52vh;\n}\n.v-enter-active[data-v-542b057b],\n.v-leave-active[data-v-542b057b] {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  position: fixed;\n  width: 100%;\n}\n.v-enter-active .my-loading[data-v-542b057b],\n.v-leave-active .my-loading[data-v-542b057b],\n.v-enter-active .my-error[data-v-542b057b],\n.v-leave-active .my-error[data-v-542b057b] {\n  top: 30vh;\n}\n.v-enter[data-v-542b057b] {\n  -webkit-transform: translate3d(100vw, 0, 0);\n          transform: translate3d(100vw, 0, 0);\n}\n.v-leave-to[data-v-542b057b] {\n  -webkit-transform: translate3d(-100vw, 0, 0);\n          transform: translate3d(-100vw, 0, 0);\n}\n.v-leave[data-v-542b057b],\n.v-enter-to[data-v-542b057b] {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n',"",{version:3,sources:["I:/vue-music/src/pages/mv/children/ListView.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,OAAO;CACR;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,0BAA0B;EAC1B,4BAA4B;UACpB,oBAAoB;CAC7B;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,sCAAsC;UAC9B,8BAA8B;CACvC;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,0BAA0B;EAC1B,uCAAuC;UAC/B,+BAA+B;CACxC;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,yBAAyB;EACzB,gCAAgC;UACxB,wBAAwB;CACjC;AACD;EACE,0BAA0B;EAC1B,4BAA4B;UACpB,oBAAoB;EAC5B,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,yBAAyB;EACzB,gCAAgC;UACxB,wBAAwB;CACjC;AACD;EACE,aAAa;CACd;AACD;EACE,gBAAgB;EAChB,OAAO;CACR;AACD;EACE,gBAAgB;EAChB,SAAS;CACV;AACD;EACE,gBAAgB;EAChB,SAAS;CACV;AACD;;EAEE,UAAU;CACX;AACD;;EAEE,6BAA6B;EAC7B,qBAAqB;EACrB,gBAAgB;EAChB,YAAY;CACb;AACD;;;;EAIE,UAAU;CACX;AACD;EACE,4CAA4C;UACpC,oCAAoC;CAC7C;AACD;EACE,6CAA6C;UACrC,qCAAqC;CAC9C;AACD;;EAEE,wCAAwC;UAChC,gCAAgC;CACzC",file:"ListView.vue",sourcesContent:['\n.fullBox[data-v-542b057b] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n}\n.flexYCenter[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.flexAround[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n}\n.flexBetween[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.flexXCenter[data-v-542b057b] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.flexCenter[data-v-542b057b] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.mint-msgbox[data-v-542b057b] {\n  z-index: 300;\n}\n.mint-msgbox-btns button[data-v-542b057b] {\n  font-size: 12Px;\n  /* no*/\n}\n[data-dpr="2"] .mint-msgbox-btns button[data-v-542b057b] {\n  font-size: 24Px;\n  /* no  */\n}\n[data-dpr="3"] .mint-msgbox-btns button[data-v-542b057b] {\n  font-size: 36Px;\n  /* no  */\n}\n.my-loading[data-v-542b057b],\n.my-error[data-v-542b057b] {\n  top: 52vh;\n}\n.v-enter-active[data-v-542b057b],\n.v-leave-active[data-v-542b057b] {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  position: fixed;\n  width: 100%;\n}\n.v-enter-active .my-loading[data-v-542b057b],\n.v-leave-active .my-loading[data-v-542b057b],\n.v-enter-active .my-error[data-v-542b057b],\n.v-leave-active .my-error[data-v-542b057b] {\n  top: 30vh;\n}\n.v-enter[data-v-542b057b] {\n  -webkit-transform: translate3d(100vw, 0, 0);\n          transform: translate3d(100vw, 0, 0);\n}\n.v-leave-to[data-v-542b057b] {\n  -webkit-transform: translate3d(-100vw, 0, 0);\n          transform: translate3d(-100vw, 0, 0);\n}\n.v-leave[data-v-542b057b],\n.v-enter-to[data-v-542b057b] {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n'],sourceRoot:""}])},fn0f:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,'\n.fullBox[data-v-05e1acbe] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n}\n.flexYCenter[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.flexAround[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n}\n.flexBetween[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.flexXCenter[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.flexCenter[data-v-05e1acbe] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.mint-msgbox[data-v-05e1acbe] {\n  z-index: 300;\n}\n.mint-msgbox-btns button[data-v-05e1acbe] {\n  font-size: 12Px;\n  /* no*/\n}\n[data-dpr="2"] .mint-msgbox-btns button[data-v-05e1acbe] {\n  font-size: 24Px;\n  /* no  */\n}\n[data-dpr="3"] .mint-msgbox-btns button[data-v-05e1acbe] {\n  font-size: 36Px;\n  /* no  */\n}\n.mv-item[data-v-05e1acbe] {\n  margin-bottom: 0.8rem;\n  height: 6.4rem;\n}\n.mv-item.fullscreen video[data-v-05e1acbe]::-webkit-media-controls-enclosure {\n  padding-right: 1.86667rem !important;\n}\n.mv-item.fullscreen[data-v-05e1acbe] ::-webkit-media-controls-mute-button {\n  display: none;\n}\n.mv-item.fullscreen[data-v-05e1acbe] ::-webkit-media-controls-volume-slider {\n  display: none;\n}\n.mv-item.fullscreen .vdoType-wrapper[data-v-05e1acbe] {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  top: auto !important;\n  -webkit-transform: none !important;\n          transform: none !important;\n  font-size: 0.42667rem;\n  /* no*/\n  z-index: 3000000000000;\n  background-color: #fafafa;\n  color: #000;\n  padding-left: 0.16rem;\n  line-height: 1.33867rem;\n}\n[data-dpr="2"] .mv-item.fullscreen .vdoType-wrapper[data-v-05e1acbe] {\n  font-size: 0.85333rem;\n  /* no  */\n}\n[data-dpr="3"] .mv-item.fullscreen .vdoType-wrapper[data-v-05e1acbe] {\n  font-size: 1.28rem;\n  /* no  */\n}\n.mv-item.current[data-v-05e1acbe] {\n  color: red;\n}\n.mv-item.current .video[data-v-05e1acbe]:-webkit-full-screen:-webkit-media-controls-enclosure {\n  margin-right: 0.8rem;\n}\n.text-wrap[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  margin-top: 0.48rem;\n}\n.text-wrap [class^=\'text\'][data-v-05e1acbe] {\n  width: 40%;\n  padding-left: 1.06667rem;\n}\n.video-wrapper[data-v-05e1acbe] {\n  position: relative;\n}\n.video-wrapper > .waiting-snake[data-v-05e1acbe] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.video-wrapper > .vdoType-wrapper[data-v-05e1acbe] {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n.video-wrapper .vdoType-wrapper[data-v-05e1acbe] {\n  color: #fff;\n  padding-right: 0.26667rem;\n}\n.video-wrapper .iconfont[data-v-05e1acbe] {\n  font-size: 6em;\n  color: #fff;\n  z-index: 10;\n}\n.video-wrapper .video[data-v-05e1acbe] {\n  width: 100%;\n}\n',"",{version:3,sources:["I:/vue-music/src/pages/mv/children/list.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,OAAO;CACR;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,0BAA0B;EAC1B,4BAA4B;UACpB,oBAAoB;CAC7B;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,sCAAsC;UAC9B,8BAA8B;CACvC;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,0BAA0B;EAC1B,uCAAuC;UAC/B,+BAA+B;CACxC;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,yBAAyB;EACzB,gCAAgC;UACxB,wBAAwB;CACjC;AACD;EACE,0BAA0B;EAC1B,4BAA4B;UACpB,oBAAoB;EAC5B,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,yBAAyB;EACzB,gCAAgC;UACxB,wBAAwB;CACjC;AACD;EACE,aAAa;CACd;AACD;EACE,gBAAgB;EAChB,OAAO;CACR;AACD;EACE,gBAAgB;EAChB,SAAS;CACV;AACD;EACE,gBAAgB;EAChB,SAAS;CACV;AACD;EACE,sBAAsB;EACtB,eAAe;CAChB;AACD;EACE,qCAAqC;CACtC;AACD;EACE,cAAc;CACf;AACD;EACE,cAAc;CACf;AACD;EACE,gBAAgB;EAChB,SAAS;EACT,UAAU;EACV,qBAAqB;EACrB,mCAAmC;UAC3B,2BAA2B;EACnC,sBAAsB;EACtB,OAAO;EACP,uBAAuB;EACvB,0BAA0B;EAC1B,YAAY;EACZ,sBAAsB;EACtB,wBAAwB;CACzB;AACD;EACE,sBAAsB;EACtB,SAAS;CACV;AACD;EACE,mBAAmB;EACnB,SAAS;CACV;AACD;EACE,WAAW;CACZ;AACD;EACE,qBAAqB;CACtB;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,sCAAsC;UAC9B,8BAA8B;EACtC,oBAAoB;CACrB;AACD;EACE,WAAW;EACX,yBAAyB;CAC1B;AACD;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,yCAAyC;UACjC,iCAAiC;CAC1C;AACD;EACE,mBAAmB;EACnB,SAAS;EACT,SAAS;EACT,oCAAoC;UAC5B,4BAA4B;CACrC;AACD;EACE,YAAY;EACZ,0BAA0B;CAC3B;AACD;EACE,eAAe;EACf,YAAY;EACZ,YAAY;CACb;AACD;EACE,YAAY;CACb",file:"list.vue",sourcesContent:['\n.fullBox[data-v-05e1acbe] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n}\n.flexYCenter[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.flexAround[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n}\n.flexBetween[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.flexXCenter[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.flexCenter[data-v-05e1acbe] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.mint-msgbox[data-v-05e1acbe] {\n  z-index: 300;\n}\n.mint-msgbox-btns button[data-v-05e1acbe] {\n  font-size: 12Px;\n  /* no*/\n}\n[data-dpr="2"] .mint-msgbox-btns button[data-v-05e1acbe] {\n  font-size: 24Px;\n  /* no  */\n}\n[data-dpr="3"] .mint-msgbox-btns button[data-v-05e1acbe] {\n  font-size: 36Px;\n  /* no  */\n}\n.mv-item[data-v-05e1acbe] {\n  margin-bottom: 0.8rem;\n  height: 6.4rem;\n}\n.mv-item.fullscreen video[data-v-05e1acbe]::-webkit-media-controls-enclosure {\n  padding-right: 1.86667rem !important;\n}\n.mv-item.fullscreen[data-v-05e1acbe] ::-webkit-media-controls-mute-button {\n  display: none;\n}\n.mv-item.fullscreen[data-v-05e1acbe] ::-webkit-media-controls-volume-slider {\n  display: none;\n}\n.mv-item.fullscreen .vdoType-wrapper[data-v-05e1acbe] {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  top: auto !important;\n  -webkit-transform: none !important;\n          transform: none !important;\n  font-size: 0.42667rem;\n  /* no*/\n  z-index: 3000000000000;\n  background-color: #fafafa;\n  color: #000;\n  padding-left: 0.16rem;\n  line-height: 1.33867rem;\n}\n[data-dpr="2"] .mv-item.fullscreen .vdoType-wrapper[data-v-05e1acbe] {\n  font-size: 0.85333rem;\n  /* no  */\n}\n[data-dpr="3"] .mv-item.fullscreen .vdoType-wrapper[data-v-05e1acbe] {\n  font-size: 1.28rem;\n  /* no  */\n}\n.mv-item.current[data-v-05e1acbe] {\n  color: red;\n}\n.mv-item.current .video[data-v-05e1acbe]:-webkit-full-screen:-webkit-media-controls-enclosure {\n  margin-right: 0.8rem;\n}\n.text-wrap[data-v-05e1acbe] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  margin-top: 0.48rem;\n}\n.text-wrap [class^=\'text\'][data-v-05e1acbe] {\n  width: 40%;\n  padding-left: 1.06667rem;\n}\n.video-wrapper[data-v-05e1acbe] {\n  position: relative;\n}\n.video-wrapper > .waiting-snake[data-v-05e1acbe] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.video-wrapper > .vdoType-wrapper[data-v-05e1acbe] {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n.video-wrapper .vdoType-wrapper[data-v-05e1acbe] {\n  color: #fff;\n  padding-right: 0.26667rem;\n}\n.video-wrapper .iconfont[data-v-05e1acbe] {\n  font-size: 6em;\n  color: #fff;\n  z-index: 10;\n}\n.video-wrapper .video[data-v-05e1acbe] {\n  width: 100%;\n}\n'],sourceRoot:""}])},g5K8:function(e,n,t){var a=t("zt0j");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("d7565280",a,!0,{})},zt0j:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\nvideo:-webkit-full-screen div {\n  padding-right: 1.06667rem !important;\n  color: red !important;\n}\n","",{version:3,sources:["I:/vue-music/src/pages/mv/children/list.vue"],names:[],mappings:";AACA;EACE,qCAAqC;EACrC,sBAAsB;CACvB",file:"list.vue",sourcesContent:["\nvideo:-webkit-full-screen div {\n  padding-right: 1.06667rem !important;\n  color: red !important;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=4.listView.js.map