webpackJsonp([11],{"14Lh":function(t,e){},Tv48:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),s={position:"bottom",time:2e3,closeIcon:"close",close:!0,successIcon:"check_circle",infoIcon:"info",warningIcon:"priority_high",errorIcon:"warning"},r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},a="undefined"==typeof window,c=20141223,l=i.default.extend({name:"toast-message",data:function(){return{messages:[]}},methods:{createAction:function(t,e,n,i){var s=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return t("mu-button",{props:{icon:s,flat:!s,color:i.color?"#fff":"secondary"},style:s?{width:"36px",height:"36px"}:{},slot:"action",on:{click:function(){return n&&n(i.id)}}},[e])},message:function(t){var e="toast_id_"+c++;return this.messages.push(o({},t,{id:e,open:!0})),e},close:function(t){var e=this;if(t){var n=this.messages.filter(function(e){return e.id===t})[0];n&&(n.open=!1,setTimeout(function(){if(e.messages){var t=e.messages.indexOf(n);-1!==t&&e.messages.splice(t,1)}},500))}}},render:function(t){var e=this;return t("div",{staticClass:"mu-toast-plugin",style:{display:"none"}},this.messages.map(function(n){var i=n.close?e.createAction(t,t("mu-icon",{props:{value:s.closeIcon},style:{"margin-right":0}}),function(t){return e.close(t)},n,!0):void 0;return t("mu-snackbar",{props:{color:n.color,textColor:n.textColor,open:n.open,position:n.position},key:n.id},[n.icon?t("mu-icon",{props:{left:!0,value:n.icon}}):""].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(n.actions&&n.actions.length>0?n.actions.map(function(i){var s=i.action,r=i.click;return e.createAction(t,s,r,n)}):[]),[n.message,i]))}))}}),u=void 0;function d(t){if(!a)return u||(u=new l({el:document.createElement("div")}),document.body.appendChild(u.$el)),u.message(t)}function f(t){u&&u.close(t)}var h={config:function(t){if(!t||Array.isArray(t)||"object"!==(void 0===t?"undefined":r(t)))return s;for(var e in t)t.hasOwnProperty(e)&&(s[e]=t[e]);return s},message:function(t){if(t){t="string"==typeof t?{message:t}:t;var e=o({time:s.time,position:s.position,close:s.close},t),n=d(e);return e.time>0&&setTimeout(function(){return f(n)},e.time),n}}};["success","error","info","warning"].forEach(function(t){h[t]=function(e){if(e)return e="string"==typeof e?{message:e,color:t,icon:s[t+"Icon"]}:o({},e,{color:t,icon:s[t+"Icon"]}),h.message(e)}}),h.close=function(t){return f(t)},h.install=function(t,e){h.config(e),t.prototype.$toast=h};var m=h,p={data:function(){return{loading:!0,AricleId:0,AnswerForm:{content:"",article_id:""},AddComment:"",CurrentAnswerId:0,ContentItemId:0,SubmitAnswerStatus:!1,isFocus:!1,CuerrentCommentsFootIndex:""}},methods:{init:function(){this.AricleId=this.$route.params.id;var t={id:this.AricleId};this.getArticle(t)},getArticle:function(t){var e=this;this.$store.dispatch("ArticleOne",t).then(function(){e.AnswerForm.article_id=e.article.id,e.loading=!1,e.getAnswer(e.article.id),e.getAgree(e.article.id)})},getAnswer:function(t){this.$store.dispatch("ArticleAnswer",{article_id:t})},getAgree:function(t){this.$store.dispatch("ArticleAgree",{article_id:t})},SubmitAnswer:function(){var t=this;if(""==this.AnswerForm.content)return!1;this.SubmitAnswerStatus=!0,this.$store.dispatch("AddArticleAnswer",this.AnswerForm).then(function(){"success"==t.$store.state.user.AddArticleAnswer.status?(m.success("评论成功"),t.AnswerForm.content="",t.UECommand="cleardoc",t.SubmitAnswerStatus=!1,t.getAnswer(t.article.id)):m.error("操作失败")})},handleOpenComment:function(t){this.CurrentAnswerId=t},handleOpenCommentList:function(t){this.ContentItemId=t},handleAgree:function(){this.alreadyAgree||this.$store.dispatch("AricleAgreeClick",{article_id:this.AricleId})},handleGoEdit:function(){this.$refs.wapper.scrollTop=this.$refs.editor.offsetTop},handleInputFocus:function(t){this.isFocus=!0,this.CuerrentCommentsFootIndex=t},handleBodyClick:function(t){""!=this.CuerrentCommentsFootIndex&&(this.$refs.CommentsFoot[this.CuerrentCommentsFootIndex].contains(t.target)||(this.isFocus=!1))},returnPre:function(){this.$router.go(-1)},AttaPrevent:function(t){this.$nextTick(function(){for(var e=t.getElementsByClassName("fr-file"),n=0;n<e.length;++n)e[n].removeEventListener("click",this.AttaClick),e[n].addEventListener("click",this.AttaClick)})},AttaClick:function(t){t.preventDefault();var e=t.target.href;window.open(e+"?token="+this.$store.state.user.token)}},created:function(){this.init()},destroyed:function(){window.removeEventListener("click",this.handleBodyClick),this.$store.dispatch("ClearArticle")},computed:{article:function(){return this.$store.state.user.ArticleOne},AnswerList:function(){return this.$store.state.user.ArticleAnswer},alreadyAgree:function(){return this.$store.state.user.ArticleAgree.alreadyAgree},AgreeNum:function(){return this.$store.state.user.ArticleAgree.count},user:function(){return this.$store.state.user.userInfo}},components:{"v-editor":n("bUEx").a},directives:{focus:{inserted:function(t){t.focus()}}},watch:{article:{deep:!0,handler:function(){this.AttaPrevent(this.$refs.ContentBody)}},AnswerList:{deep:!0,handler:function(){this.AttaPrevent(this.$refs.AnswerList)}}}},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"wapper",staticClass:"content-wallper"},[n("div",{staticClass:"btn-return"},[n("div",{staticClass:"return-circle",attrs:{title:"返回"},on:{click:t.returnPre}},[n("i",{staticClass:"el-icon-back"})])]),t._v(" "),n("div",{staticClass:"artilce-container"},[n("div",{staticClass:"content-container "},[n("h1",{staticClass:"title"},[t._v(t._s(t.article.title))]),t._v(" "),n("p",{staticClass:"subtitle"},[n("span",[t._v(t._s(t.article.name))]),t._v(" "),n("span",[t._v(t._s(t.article.created))])]),t._v(" "),n("div",{ref:"ContentBody",staticClass:"content-body",domProps:{innerHTML:t._s(t.article.body)}}),t._v(" "),n("div",{staticClass:"thend"}),t._v(" "),n("div",{staticClass:"agree"},[n("div",{staticClass:"click-agree",class:{alreadyAgree:t.alreadyAgree},on:{click:t.handleAgree}},[t._m(0),t._v(" "),t.alreadyAgree?t._e():n("span",[t._v("赞一下 ("+t._s(t.AgreeNum)+")")]),t._v(" "),t.alreadyAgree?n("span",[t._v("已赞"+t._s(t.AgreeNum))]):t._e()])]),t._v(" "),n("div",{ref:"editor",staticClass:"QuestionAnswers-Wrapper "},[n("div",{staticClass:"QuestionAnswers-answerAdd Item-Card"},[n("div",{staticClass:"AnswerAdd"},[n("div",{staticClass:"AnswerAdd-header"},[n("div",{staticClass:"AnswerAdd-info Author-info"},[n("span",{staticClass:"Author-info-avatar"},[n("img",{attrs:{src:"http://e.yhtjc.com/v2/public/img/default.png"}})]),t._v(" "),n("span",{staticClass:"AnswerAdd-user-name"},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.user.name)+"\n\t\t\t\t\t\t\t\t")])])]),t._v(" "),n("div",{staticClass:"Answer-editor"},[n("v-editor",{attrs:{height:200},model:{value:t.AnswerForm.content,callback:function(e){t.$set(t.AnswerForm,"content",e)},expression:"AnswerForm.content"}})],1),t._v(" "),n("div",{staticClass:"AnswerForm-footer"},[n("div",{staticClass:"AnswerForm-footerContent"},[n("div",{staticClass:"AnswerForm-footerRight"},[n("el-button",{attrs:{type:"primary",size:"medium",loading:t.SubmitAnswerStatus},nativeOn:{click:function(e){return t.SubmitAnswer(e)}}},[t._v("提交评论")])],1)])])])]),t._v(" "),n("div",{staticClass:"QuestionAnswers-answers"},[n("div",{ref:"AnswerList",staticClass:"Answer-list "},[n("div",{staticClass:"Answer-List-header"},[n("h4",{staticClass:"List-headerText"},[t.AnswerList.length>0?n("span",[t._v(t._s(t.AnswerList.length)+"个评论")]):n("span",[t._v("暂无评论")])])]),t._v(" "),t._l(t.AnswerList,function(e,i){return n("div",{key:i,staticClass:"Answer-list-item"},[n("div",{staticClass:"Answer-user-info"},[n("div",{staticClass:"Answer-user-avatar"},[n("img",{attrs:{src:"http://e.yhtjc.com/v2/public/img/default.png"}})]),t._v(" "),n("div",{staticClass:"Answer-user-name"},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.name)+"\n\t\t\t\t\t\t\t\t")])]),t._v(" "),n("div",{staticClass:"RichContent"},[n("div",{staticClass:"RichContent-inner",domProps:{innerHTML:t._s(e.content)}}),t._v(" "),n("p",{staticClass:"RichContent-created"},[n("el-tooltip",{attrs:{effect:"dark",content:e.true_time,placement:"top"}},[n("span",[t._v("发布于 "+t._s(e.created))])])],1)])])})],2)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"circle"},[e("i",{staticClass:"iconfont icon-dianzan"})])}]};var g=n("VU/8")(p,v,!1,function(t){n("14Lh")},"data-v-aa4c399c",null);e.default=g.exports},bUEx:function(t,e,n){"use strict";var i=n("fZjL"),s=n.n(i),r=(n("9fd9"),{props:{PropConfig:{type:Object,default:function(){return{}}},value:{default:""},height:{type:Number,default:350}},data:function(){return{froalaConfig:{pluginsEnabled:["align","charCounter","codeBeautifier","colors","draggable","entities","file","fontAwesome","fontFamily","fontSize","image","imageTUI","imageManager","inlineStyle","inlineClass","lineBreaker","lineHeight","link","lists","paragraphFormat","paragraphStyle","quote","table","url","video","wordPaste"],toolbarButtons:["undo","redo","clearFormatting","|","bold","italic","underline","strikeThrough","|","fontFamily","fontSize","color","|","paragraphFormat","align","formatOL","formatUL","outdent","indent","|","quote","insertLink","insertImage","insertVideo","insertTable","specialCharacters","insertHR","insertFile"],theme:"dark",placeholder:"请输入内容",language:"zh_cn",fileUpload:!0,fileInsertButtons:["fileBack","|"],fileUploadMethod:"POST",fileUploadParam:"uploadfile",fileUploadParams:{id:"my_editor"},imageUploadURL:this.$appConst.EDITOR_IMG_URL+"?token="+this.$store.state.user.token,fileUploadURL:this.$appConst.FILE_UPLOAD_URL+"?token="+this.$store.state.user.token,disableRightClick:!0,colorsHEXInput:!0,toolbarSticky:!0,width:"100%",height:this.height,charCounterMax:-1}}},created:function(){if(s()(this.PropConfig).length>0)for(var t in this.PropConfig)this.editorConfig[t]=this.PropConfig[t]},computed:{content:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{onEditorReady:function(){this.$el.querySelector(".ck-content").style.height=this.height+"px"}}}),o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"editor",staticClass:"editor-container"},[n("froala",{attrs:{tag:"textarea",config:t.froalaConfig},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},staticRenderFns:[]},a=n("VU/8")(r,o,!1,null,null,null);e.a=a.exports}});