webpackJsonp([43],{"4oo1":function(t,e){},yUHC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={props:{},data:function(){return{Query:"",FastQuery:{pagesize:5,pagenow:1,params:[{name:1,value:"",operate:0,field_type:"string",uid:this.makeUid()}]},ProgramListIndex:0,ProgramActive:!1,CurrentRow:{}}},created:function(){this.$store.dispatch("ProductOffers",this.FastQuery)},methods:{AddCondition:function(){this.FastQuery.params.push({name:1,value:"",operate:0,field_type:"string",uid:this.makeUid()})},ResetProgam:function(){this.ProgramActive=!1},ChangeProgramHandle:function(t){this.ProgramListIndex=t},ReloadData:function(){this.$store.dispatch("ProductOffers",this.FastQuery)},QueryFieldSelect:function(t){var e=this,a=this.FastQuery.paramsFields.filter(function(e){return e.value==t});a&&this.FastQuery.params.some(function(i,r){if(i.name==t)return e.FastQuery.params[r].field_type=a[0].field_type,e.FastQuery.params[r].value="",!0})},ChangeMoreCondition:function(){this.ProgramActive=!this.ProgramActive},HiddenProgram:function(){this.ProgramActive=!1},RemoveCondition:function(t){var e=this.FastQuery.params.filter(function(e){return e.uid!=t});this.FastQuery.params=e},makeUid:function(t){for(var e=t||10,a="qwertyuioplkjhgfdsazxcvbnm0123456789",i="",r=0;r<e;++r){i+=a[Math.floor(Math.random()*a.length)]}return i},indexMethod:function(t){return++t},DownloadPDF:function(t){var e=this.$appConst.BASEURL+"makeoffer/download/pdf?offer_id="+t+"&token="+this.$store.state.user.token;window.open(e)},ViewPDF:function(t){var e=this.$appConst.BASEURL+"makeoffer/view/pdf?offer_id="+t+"&token="+this.$store.state.user.token;window.open(e)},EditRow:function(t){this.CurrentRow=t,this.$store.dispatch("SetBaseProductConfig",{field:"Price.ModifyOffer.visible",value:!0})}},computed:{FastQueryFields:function(){return[{label:"业务员",value:1,field_type:"string"},{label:"客户名称",value:2,field_type:"string"},{label:"客户电话",value:3,field_type:"string"},{label:"报价日期",value:4,field_type:"date"}]},ProgramList:function(){return[{name:"缺省方案",id:0}]},Operates:function(){return[{label:"等于",value:1},{label:"不等于",value:0}]},MoreIconTitle:function(){return this.ProgramActive?"收起":"展开"},TableData:function(){return this.$store.state.user.ProductOffers}},components:{"v-modifyOffer":function(){return a.e(54).then(a.bind(null,"Wkdy"))}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"history-wappler"},[a("div",{staticClass:"history__container shadow"},[a("section",{staticClass:"container__section table-action"},[a("div",{staticClass:"filter"},[a("div",{staticClass:"filter__idea"},[a("span",{staticClass:"subtitle"},[t._v("快捷过滤 ")]),t._v(" "),a("span",{staticClass:"title"},[t._v("方案: ")]),t._v(" "),a("span",{staticClass:"program-list"},t._l(t.ProgramList,function(e,i){return a("div",{key:i,staticClass:"program-list__item",class:{active:t.ProgramListIndex==e.id},on:{click:function(a){t.ChangeProgramHandle(e.id)}}},[t._v("\n                            "+t._s(e.name)+"\n                        ")])}))]),t._v(" "),a("div",{staticClass:"filter__program"},[a("div",{staticClass:"filter-input-list",class:{isActive:t.ProgramActive}},[a("div",{staticClass:"item-container"},[t._l(t.FastQuery.params,function(e,i){return a("div",{directives:[{name:"show",rawName:"v-show",value:0==i||t.ProgramActive,expression:"index == 0 ? true : ProgramActive"}],key:i,staticClass:"filter-input__item"},[a("div",{staticClass:"input__items"},[a("el-select",{on:{change:t.QueryFieldSelect},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"item.name"}},t._l(t.FastQueryFields,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"input__items"},[a("el-select",{model:{value:e.operate,callback:function(a){t.$set(e,"operate",a)},expression:"item.operate"}},t._l(t.Operates,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"text-input"},["string"==e.field_type?a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"item.value"}}):t._e(),t._v(" "),"date"==e.field_type?a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"item.value"}}):t._e()],1),t._v(" "),i>0?a("el-button",{staticStyle:{"margin-left":"3px"},attrs:{type:"text",icon:"el-icon-remove",title:"移除"},on:{click:function(a){t.RemoveCondition(e.uid)}}}):t._e()],1)}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.ProgramActive,expression:"ProgramActive"}],staticClass:"add-condition"},[a("el-button",{attrs:{type:"text",icon:"el-icon-circle-plus"},on:{click:t.AddCondition}},[t._v("添加条件")])],1)],2),t._v(" "),a("div",{staticClass:"more",attrs:{title:t.MoreIconTitle}},[a("i",{staticClass:"el-icon-d-arrow-left",class:{"more-up":t.ProgramActive},on:{click:t.ChangeMoreCondition}})])]),t._v(" "),a("div",{staticClass:"btns"},[a("div",{staticClass:"btns-container"},[a("el-button",{attrs:{type:"primary"}},[t._v("搜 索")]),t._v(" "),a("a",{attrs:{href:"javascript:void(0)"}},[t._v("保存")]),t._v(" "),a("a",{attrs:{href:"javascript:void(0)"},on:{click:t.ResetProgam}},[t._v("重置")])],1)]),t._v(" "),a("div",{staticClass:"right-btns"})])])]),t._v(" "),a("section",{staticClass:"table-data"},[a("el-table",{attrs:{data:t.TableData,stripe:"",border:"",height:"100%","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",index:t.indexMethod,width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"customer",label:"客户名称",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"project",label:"项目名称",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"报价日期",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"serviceor",label:"业务员"}}),t._v(" "),a("el-table-column",{attrs:{prop:"creator",label:"创建人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"manager.brand",label:"品牌"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dispatch",label:"配送"}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"装卸"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tax",label:"税率"}}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tax",label:"价格版本"}}),t._v(" "),a("el-table-column",{attrs:{prop:"manager.method.label",label:"类别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"opval",label:"折扣"}}),t._v(" "),a("el-table-column",{attrs:{prop:"operate.label",label:"计算方式",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.manager.method.value?a("div",[t._v("\n                            面价 "+t._s(e.row.operate.label)+" "+t._s(e.row.opval)+"%\n                        ")]):a("div",[t._v("\n                            面价 "+t._s(e.row.operate.label)+" "+t._s(e.row.opval)+"元\n                        ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"file",label:"下载报价",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"success"},nativeOn:{click:function(a){t.DownloadPDF(e.row.id)}}},[t._v("下载")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"info"},nativeOn:{click:function(a){t.ViewPDF(e.row.id)}}},[t._v("预览")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"warning"},nativeOn:{click:function(a){t.EditRow(e.row)}}},[t._v("修改")])]}}])})],1)],1)]),t._v(" "),a("v-modifyOffer",{attrs:{row:t.CurrentRow},on:{Reload:t.ReloadData}})],1)},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(t){a("4oo1")},"data-v-0e5b1458",null);e.default=l.exports}});