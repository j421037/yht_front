webpackJsonp([55],{"/KsY":function(e,t){},"0p9L":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"history-wallpaper"},[i("el-dialog",{staticClass:"cost-price-history_dialog",attrs:{title:"调价历史",visible:e.visible,"before-close":e.handleClose,width:"40%"},on:{"update:visible":function(t){e.visible=t}}},[i("el-form",{attrs:{model:e.Form,"label-width":"80px",inline:""}},[i("el-form-item",{attrs:{label:"产品分类"}},[i("el-select",{model:{value:e.Form.category,callback:function(t){e.$set(e.Form,"category",t)},expression:"Form.category"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"品牌"}},[i("el-select",{model:{value:e.Form.product_brand,callback:function(t){e.$set(e.Form,"product_brand",t)},expression:"Form.product_brand"}})],1)],1),e._v(" "),i("el-timeline",[i("el-timeline-item",{attrs:{timestamp:"2018/4/12",placement:"top",icon:"el-icon-more",color:"rgb(11, 189, 135)"}},[i("el-card",[i("div",[i("section",[i("h4",[e._v("更新 Github 模板")]),e._v(" "),i("p",[e._v("王小虎 提交于 2018/4/12 20:46")])]),e._v(" "),i("section",[i("el-button",[e._v("查看价格")]),e._v(" "),i("el-button",[e._v("浏览价格表")])],1)])])],1),e._v(" "),i("el-timeline-item",{attrs:{timestamp:"2018/4/3",placement:"top"}},[i("el-card",[i("h4",[e._v("更新 Github 模板")]),e._v(" "),i("p",[e._v("王小虎 提交于 2018/4/3 20:46")])])],1),e._v(" "),i("el-timeline-item",{attrs:{timestamp:"2018/4/2",placement:"top"}},[i("el-card",[i("h4",[e._v("更新 Github 模板")]),e._v(" "),i("p",[e._v("王小虎 提交于 2018/4/2 20:46")])])],1),e._v(" "),i("el-timeline-item",{attrs:{timestamp:"2018/4/2",placement:"top"}},[i("el-card",[i("h4",[e._v("更新 Github 模板")]),e._v(" "),i("p",[e._v("王小虎 提交于 2018/4/2 20:46")])])],1)],1)],1)],1)},staticRenderFns:[]};var r=i("VU/8")({data:function(){return{Form:{category:"",product_brand:""}}},methods:{handleClose:function(){this.$store.dispatch("SetBaseProductConfig",{field:"Price.History.visible",value:!1})}},computed:{visible:function(){return this.$store.state.user.BaseProduct.Price.History.visible}}},l,!1,function(e){i("/KsY")},null,null);t.default=r.exports}});