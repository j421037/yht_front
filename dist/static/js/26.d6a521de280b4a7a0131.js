webpackJsonp([26],{FFb3:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"wapper"},[n("div",{staticClass:"header",style:{height:t.menuHeight*t.menuItemLength+"px"}},t._l(t.menuItem,function(i,s){return n("router-link",{key:s,staticClass:"menu-item",attrs:{to:i.path}},[n("div",{staticClass:"icon",style:{"background-color":i.color}},[n("i",{staticClass:"iconfont",class:i.icon})]),t._v(" "),n("div",{staticClass:"title"},[n("span",[t._v(t._s(i.name))]),t._v(" "),n("span",[t._v("\n\t\t\t\t\t"+t._s(i.info)+"\n\t\t\t\t\t"),n("i",{staticClass:"iconfont icon-icon-jiantou-sanjiao-xia"})])])])})),t._v(" "),n("div",{staticClass:"wapper-content",style:{height:"calc(100% - "+t.menuItemLength*t.menuHeight+"px)"}},[n("div",{staticClass:"list-container"},[t._m(0),t._v(" "),t._l(t.list,function(i){return n("div",{staticClass:"list-item "},[n("div",{staticClass:"user"},[n("div",{staticClass:"headimg"},[n("img",{attrs:{src:null==i.headimg?"http://e.yhtjc.com/v2/public/img/default.png":i.headimg}})]),t._v(" "),n("div",{staticClass:"user-name"},[t._v("\n\t\t\t\t\t\t"+t._s(i.name)+"\n\t\t\t\t\t")])]),t._v(" "),n("div",{staticClass:"list-title"},[t._v("\n\t\t\t\t\t"+t._s(i.action)+"了一个客户资源\n\t\t\t\t")]),t._v(" "),n("div",{staticClass:"list-content"},[t._v("\n\t\t\t\t\t"+t._s(i.demand)+"\n\t\t\t\t")]),t._v(" "),n("div",{staticClass:"list-footer"},[t._v("\n\t\t\t\t\t"+t._s(i.date)+"\n\t\t\t\t")])])}),t._v(" "),t.list?n("p",[t._v("暂时没有新的动态")]):t._e()],2)])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"title"},[i("p",[i("i",{staticClass:"iconfont icon-redu"}),this._v("\n\t\t\t\t\t最新动态\n\t\t\t\t")])])}]};var e=n("VU/8")({data:function(){return{active:0,size:50,menuHeight:50,menuItem:[{name:"最新资源",icon:"icon-iconfontgonggao",color:"#5C6BC0",path:"/m/customer/newest"},{name:"我的客户",icon:"icon-kehu1",color:"#ff4081",path:"/m/customer/mine"}],offset:0,limit:10}},methods:{navJump:function(t){this.$router.go(-1)},init:function(){this.$store.dispatch("initCustomer",{offset:this.offset,limit:this.limit}).then(function(){})}},created:function(){this.init()},computed:{list:function(){return this.$store.state.user.customerInit.data},menuItemLength:function(){return this.menuItem.length}}},s,!1,function(t){n("X/2V")},"data-v-71086b83",null);i.default=e.exports},"X/2V":function(t,i){}});