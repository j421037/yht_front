webpackJsonp([4],{MbGc:function(t,e){},mXTp:function(t,e,i){"use strict";var s=i("hvtN"),r={props:{defaultMsg:{type:String,default:""},command:{type:String},toolbars:{type:Array,default:function(){return window.UEDITOR_CONFIG.toolbars[0]}},height:{type:Number,default:350}},data:function(){return{config:{initialFrameWidth:null,initialFrameHeight:this.height,serverUrl:s.a.UE_SERVER,toolbars:[this.toolbars]},editor:{}}},mounted:function(){var t=this;this.editor=UE.getEditor("editor",this.config),this.editor.addListener("ready",function(){t.editor.setContent(t.defaultMsg)}),this.editor.addListener("contentChange",function(){t.$emit("input",t.getUEContent())})},methods:{getUEContent:function(){return this.editor.getContent()}},destroyed:function(){this.editor.destroy()},watch:{command:function(t){this.editor.execCommand(t)},defaultMsg:function(t){this.editor.setContent(t)}}},a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{attrs:{id:"editor"}})])}]},c=i("VU/8")(r,a,!1,null,null,null);e.a=c.exports},xOcJ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("mvHQ"),r=i.n(s),a={data:function(){return{defaultMsg:"",titlePicBase64:"",showTitlePic:!1,article:{id:"",title:"",body:"",status:0,category_id:""},errStatus:!1,UECommand:"",update:!1,defaultArticle:{},hackReset:!1}},methods:{publishArticle:function(){var t=this;this.$confirm("发表该文章, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){t.article.status=1,t.saveArticle()}).catch(function(){})},saveArticle:function(){var t=this;if(""==this.article.title||""==this.article.body)return this.$message.error("标题或者内容不能为空!"),!1;if(!this.article.category_id)return this.errStatus=!0,!1;this.errStatus=!1;var e="ArticlePost";this.update&&(e="ArticlePut"),this.$store.dispatch(e,this.article).then(function(){var e=t.$store.state.user.ArticlePost;t.update&&(e=t.$store.state.user.ArticleUpdate),"success"==e.status?(t.$notify.success("操作成功"),t.update=!1,t.reset(),t.UECommand="cleardoc",t.$router.push("/app/forum/write")):t.$notify.error("操作失败,请重试")})},init:function(){this.defaultArticle=JSON.parse(r()(this.article)),this.loadCategory(),this.isEdit()},isEdit:function(){""!=this.$route.query.id&&void 0!==this.$route.query.id&&(this.update=!0,this.getContent(this.$route.query.id))},getContent:function(t){var e=this;this.$store.dispatch("ArticleEdit",{id:t}).then(function(){var t=e.$store.state.user.ArticleEditOne;e.article.id=t.id,e.article.title=t.title,e.article.status=t.status,e.article.category_id=t.category_id,setTimeout(function(){e.defaultMsg=t.body},200)})},loadCategory:function(){this.$store.dispatch("ArticleCategory")},AddTitlePic:function(t){this.article.titlepic=this.$refs[t].files[0],this.titlePicBase64=window.URL.createObjectURL(this.$refs[t].files[0]),this.showTitlePic=!0},RemoveTitlePic:function(t){this.showTitlePic=!1,this.titlePicBase64=null,this.$refs[t].value=null,this.article.titlepic=null},reset:function(){for(var t in this.defaultArticle)this.article[t]=this.defaultArticle[t]}},created:function(){this.init()},mounted:function(){var t=this;this.$nextTick(function(){t.hackReset=!0})},computed:{category:function(){var t=this.$store.state.user.ArticleCategory,e=[];for(var i in t){var s={};s.value=t[i].id,s.label=t[i].name,e.push(s)}return e},ArticleContent:function(){return this.$store.state.user.ArticleEditOne}},components:{"v-ueditor":i("mXTp").a}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wapper"},[i("div",{staticClass:"layout-main"},[t.showTitlePic?i("div",{staticClass:"title-pic",class:{"title-pic-empty":!t.showTitlePic}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.showTitlePic,expression:"!showTitlePic"}],staticClass:"previewWrapper"},[i("i",{staticClass:"iconfont icon-xiangji"}),t._v(" "),i("input",{ref:"titlePic",attrs:{type:"file",name:"titlePic"},on:{change:function(e){t.AddTitlePic("titlePic")}}})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showTitlePic,expression:"showTitlePic"}],staticClass:"previewContent"},[i("img",{attrs:{src:t.titlePicBase64}}),t._v(" "),i("div",{staticClass:"WriteCover-editWrapper"},[t._m(0),t._v(" "),i("button",{attrs:{type:"button",title:"删除"},on:{click:function(e){t.RemoveTitlePic("titlePic")}}},[i("i",{staticClass:"iconfont icon-shanchu"})])])])]):t._e(),t._v(" "),i("div",{staticClass:"write-title"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.article.title,expression:"article.title",modifiers:{trim:!0}}],staticClass:"titleInput",attrs:{placeholder:"请输入标题"},domProps:{value:t.article.title},on:{input:function(e){e.target.composing||t.$set(t.article,"title",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),i("div",{ref:"editor",staticClass:"ueditor"},[t.hackReset?i("v-ueditor",{attrs:{defaultMsg:t.defaultMsg,command:t.UECommand},model:{value:t.article.body,callback:function(e){t.$set(t.article,"body",e)},expression:"article.body"}}):t._e()],1),t._v(" "),i("div",{staticClass:"category"},[i("p",[i("span",[t._v("发布到:")]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择文章分类"},model:{value:t.article.category_id,callback:function(e){t.$set(t.article,"category_id",e)},expression:"article.category_id"}},t._l(t.category,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:t.errStatus,expression:"errStatus"}],staticClass:"error-msg"},[t._v(" 请选择一个文章的类别")])]),t._v(" "),t.update?i("div",{staticClass:"write-tool"},[i("el-button",{attrs:{type:"warning",size:"medium",disabled:""==t.article.body},on:{click:t.saveArticle}},[t._v("保存修改")]),t._v(" "),0==t.article.status?i("el-button",{attrs:{type:"success",size:"medium",disabled:""==t.article.body},on:{click:t.publishArticle}},[t._v("发表文章")]):t._e()],1):i("div",{staticClass:"write-tool"},[i("el-button",{attrs:{type:"warning",size:"medium",disabled:""==t.article.body},on:{click:t.saveArticle}},[t._v("保存到草稿箱")]),t._v(" "),i("el-button",{attrs:{type:"success",size:"medium",disabled:""==t.article.body},on:{click:t.publishArticle}},[t._v("发表文章")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{attrs:{type:"button",title:"更换"}},[e("i",{staticClass:"iconfont icon-xiangji"})])}]};var n=i("VU/8")(a,c,!1,function(t){i("MbGc")},"data-v-6851b8fc",null);e.default=n.exports}});