webpackJsonp([6],{"+8JF":function(t,s){},BvTm:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={data:function(){return{priceTrend:[{name:"广州华岐",type:"line",data:[1710,1750,1800,1920,1680,1880,1810],areaStyle:{},smooth:!0}]}},methods:{drawPriceChart:function(t){this.$echarts.init(document.getElementById("echart")).setOption({title:{textStyle:{color:"#606266",fontStyle:"italic",fontWeight:"normal",fontSize:"16",align:"right",verticalAlign:"top"}},tooltip:{},xAxis:{data:["周一","周二","周三","周四","周五","周六","周日"],type:"category",splitLine:{show:!1},boundaryGap:!1},yAxis:{splitLine:{show:!1}},series:t,grid:{}})},drawProgressChart:function(){this.$echarts.init(document.getElementById("progress")).setOption({title:{textStyle:{color:"#606266",fontStyle:"italic",fontWeight:"normal",fontSize:"16",align:"right",verticalAlign:"top"}},tooltip:{},xAxis:{type:"value",boundaryGap:!1,splitLine:{show:!1}},yAxis:{splitLine:{show:!1},type:"category",data:["目标业绩","已完成业绩","回款","欠款"]},series:[{name:"2011年",type:"bar",data:[1e7,2348900,2903400,10497e3],itemStyle:{color:function(t){return"#B5C334"}}}],grid:{}})}},mounted:function(){this.drawPriceChart(this.priceTrend),this.drawProgressChart()}},a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"echart-wapper"},[s("div",{staticClass:"echart-box"},[s("div",{staticClass:"echart-title"},[s("p",[this._v("镀锌钢管价格走势")])]),this._v(" "),s("div",{attrs:{id:"echart"}})]),this._v(" "),s("div",{staticClass:"progress-box"},[s("div",{staticClass:"progress-title"},[s("p",[this._v("进度")])]),this._v(" "),s("div",{attrs:{id:"progress"}})])])}]};var n=i("VU/8")(e,a,!1,function(t){i("F7lZ")},null,null).exports,o={props:{mobile:{type:Boolean,default:!1}},data:function(){return{achievement:"123,456,78",payment:"786,543,2",arrears:"666,666",reports:"888"}},created:function(){},methods:{},components:{"v-price":n}},c={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"content"},[i("div",{staticClass:"content-box",class:{"content-box-mobile":t.mobile}},[i("el-row",[i("div",{staticClass:"ach-info"},[i("div",{staticClass:"ach-info-list"},[i("div",{staticClass:"ach-info-box"},[i("span",{staticClass:"ach-info-box-content"},[i("p",{staticClass:"box-title"},[t._v("业绩")]),t._v(" "),i("p",{staticClass:"box-content"},[t._v(t._s(t.achievement)+" 元")])])])]),t._v(" "),i("div",{staticClass:"ach-info-list"},[i("div",{staticClass:"ach-info-box"},[i("span",{staticClass:"ach-info-box-content"},[i("p",{staticClass:"box-title"},[t._v("报价")]),t._v(" "),i("p",{staticClass:"box-content"},[t._v(t._s(t.reports)+" 份")])])])]),t._v(" "),i("div",{staticClass:"ach-info-list"},[i("div",{staticClass:"ach-info-box"},[i("span",{staticClass:"ach-info-box-content"},[i("p",{staticClass:"box-title"},[t._v("回款")]),t._v(" "),i("p",{staticClass:"box-content"},[t._v(t._s(t.payment)+" 元")])])])]),t._v(" "),i("div",{staticClass:"ach-info-list"},[i("div",{staticClass:"ach-info-box"},[i("span",{staticClass:"ach-info-box-content"},[i("p",{staticClass:"box-title"},[t._v("欠款")]),t._v(" "),i("p",{staticClass:"box-content"},[t._v(t._s(t.arrears)+" 元")])])])])])]),t._v(" "),i("el-row")],1)])},staticRenderFns:[]};var r=i("VU/8")(o,c,!1,function(t){i("+8JF")},"data-v-0c80666a",null);s.default=r.exports},F7lZ:function(t,s){}});