webpackJsonp([8],{"9dHx":function(n,e,t){var i=t("nofj");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("167b97eb",i,!0,{})},"AYP+":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("Xxa5"),a=t.n(i),s=t("Gu7T"),A=t.n(s),o=t("exGp"),l=t.n(o),r=t("EGCp"),c=t("f3Ne"),f={name:"mv",mixins:[r.a],components:{ListView:c.a},data:function(){return{list:[],layoutColumnCount:2,onloaded:!1}},created:function(){},methods:{getData:function(){var n=this;return l()(a.a.mark(function e(){var t,i,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.__getJson("/getMvData",n.query);case 2:return i=e.sent,s=i.data,n.total||(n.total=s.total),n.netNormal=!0,(t=n.list).push.apply(t,A()(s.list)),e.abrupt("return",n.forceUpdated());case 8:case"end":return e.stop()}},e,n)}))()}}},C={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("cube-scroll",{ref:"scroll",staticClass:"scrollWrapper",attrs:{"scroll-events":["scroll","scroll-end"],options:n.options},on:{"pulling-up":n.onPullingUp,scroll:n.onScroll},nativeOn:{click:function(e){!n.inited&&n.refreshPage()}}},[t("list-view",{attrs:{name:"mv-list",hasImg:"",twoColumn:"",list:n.list,keyInfo:{picUrl:"pic",desc:"singer_name"}}})],1)},staticRenderFns:[]};var b=t("VU/8")(f,C,!1,function(n){t("9dHx")},"data-v-7424f8e5",null);e.default=b.exports},nofj:function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,'\n.fullBox[data-v-7424f8e5] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n}\n.flexYCenter[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.flexAround[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n}\n.flexBetween[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.flexXCenter[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.flexCenter[data-v-7424f8e5] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.mint-msgbox[data-v-7424f8e5] {\n  z-index: 300;\n}\n.mint-msgbox-btns button[data-v-7424f8e5] {\n  font-size: 12Px;\n  /* no*/\n}\n[data-dpr="2"] .mint-msgbox-btns button[data-v-7424f8e5] {\n  font-size: 24Px;\n  /* no  */\n}\n[data-dpr="3"] .mint-msgbox-btns button[data-v-7424f8e5] {\n  font-size: 36Px;\n  /* no  */\n}\n',"",{version:3,sources:["I:/vue-music/src/pages/singerDetail/children/mv.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,OAAO;CACR;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,0BAA0B;EAC1B,4BAA4B;UACpB,oBAAoB;CAC7B;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,sCAAsC;UAC9B,8BAA8B;CACvC;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,0BAA0B;EAC1B,uCAAuC;UAC/B,+BAA+B;CACxC;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,yBAAyB;EACzB,gCAAgC;UACxB,wBAAwB;CACjC;AACD;EACE,0BAA0B;EAC1B,4BAA4B;UACpB,oBAAoB;EAC5B,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,yBAAyB;EACzB,gCAAgC;UACxB,wBAAwB;CACjC;AACD;EACE,aAAa;CACd;AACD;EACE,gBAAgB;EAChB,OAAO;CACR;AACD;EACE,gBAAgB;EAChB,SAAS;CACV;AACD;EACE,gBAAgB;EAChB,SAAS;CACV",file:"mv.vue",sourcesContent:['\n.fullBox[data-v-7424f8e5] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n}\n.flexYCenter[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.flexAround[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n}\n.flexBetween[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.flexXCenter[data-v-7424f8e5] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.flexCenter[data-v-7424f8e5] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.mint-msgbox[data-v-7424f8e5] {\n  z-index: 300;\n}\n.mint-msgbox-btns button[data-v-7424f8e5] {\n  font-size: 12Px;\n  /* no*/\n}\n[data-dpr="2"] .mint-msgbox-btns button[data-v-7424f8e5] {\n  font-size: 24Px;\n  /* no  */\n}\n[data-dpr="3"] .mint-msgbox-btns button[data-v-7424f8e5] {\n  font-size: 36Px;\n  /* no  */\n}\n'],sourceRoot:""}])}});
//# sourceMappingURL=8.singermv.js.map