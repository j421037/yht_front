webpackJsonp([1],{BvTm:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("Xxa5"),a=r.n(n),s=r("//Fk"),i=r.n(s),o=r("exGp"),c=r.n(o),l=r("fZjL"),u=r.n(l),v=r("bOdI"),h=r.n(v),f=r("zqYo"),d=r("JBQq"),p=(r("Fd2+"),{props:{mobile:{type:Boolean,default:!1}},data:function(){var t;return this.chartSettings={itemStyle:{barBorderRadius:[3,3,0,0]}},this.chartExtend={barMaxWidth:15},t={progress:{},curPerson:"",curYear:"",options:[],activeName:"first",checkList:[],chartData:{}},h()(t,"curYear",f.a.getCurYear()+""),h()(t,"chartLoading",!0),t},created:function(){var t=this;d.b("index/data").then(function(e){t.progress=JSON.parse(e.row),console.log(e.row)}),this.updateUser(function(){t.updateChart()})},methods:{onPersonChange:function(t){this.updateChart()},onYearChange:function(t){this.curYear=t.getFullYear()+"",this.updateChart()},proStyle:function(t){var e=this.progress[t];return e<30&&(e=30),{width:e+"%"}},updateUser:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};d.c("index/user").then(function(r){var n=[];u()(r).forEach(function(t){f.a.log(t,r[t]);var e={value:t,label:r[t]};n.push(e)}),f.a.log(n),t.options=n,t.curPerson=t.options[0].value,e()})},handleClick:function(t,e){console.log(t,e)},updateChart:function(){var t,e=this,r=(t=c()(a.a.mark(function t(e){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new i.a(function(t,r){var n="index/"+e,a={created_year:s.curYear,user_id:s.curPerson};d.c(n,a).then(function(e){t(JSON.parse(e.data))})});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)})),function(e){return t.apply(this,arguments)});this.chartLoading=!0;var n,s=this;(n=c()(a.a.mark(function t(){var n,s,i,o;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r("sales");case 2:return n=t.sent,t.next=5,r("received");case 5:return s=t.sent,t.next=8,r("debt");case 8:i=t.sent,console.log(n),console.log(s),console.log(i),o={columns:["日期","销售","回款","累计欠款"],rows:[]},n.forEach(function(t,e){var r={"日期":e+1+"月","销售":t,"回款":s[e],"累计欠款":i[e]};o.rows.push(r)}),e.chartData=o,e.chartLoading=!1;case 16:case"end":return t.stop()}},t,e)})),function(){return n.apply(this,arguments)})()}},components:{}}),g={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"indexBox"},[!1!==t.progress.completed?r("div",{staticClass:"top"},[r("div",{staticClass:"line progress one"},[r("el-progress",{attrs:{"show-text":!1,"stroke-width":30,percentage:100}}),t._v(" "),r("div",{staticClass:"txt",style:t.proStyle("target")},[t._v("年度目标业绩："+t._s(t.progress.target)+"元")])],1),t._v(" "),r("div",{staticClass:"line progress two"},[r("el-progress",{attrs:{"show-text":!1,"stroke-width":30,percentage:t.progress.target>0?t.progress.completed/t.progress.target*100:0}}),t._v(" "),r("div",{staticClass:"txt",style:t.proStyle("completed")},[t._v("已完成业绩（"+t._s(t.progress.target>0?t.progress.completed/t.progress.target*100:0)+"%）："+t._s(t.progress.completed)+"元 ")])],1),t._v(" "),r("div",{staticClass:"line progress three"},[r("el-progress",{attrs:{"show-text":!1,"stroke-width":30,percentage:t.progress.debt_percent}}),t._v(" "),r("div",{staticClass:"txt",style:t.proStyle("arrears")},[t._v("欠款"+t._s(t.progress.debt_percent)+"%："+t._s(t.progress.debt)+"元")])],1)]):t._e(),t._v(" "),!1!==t.progress.completed?r("div",{staticClass:"dashboard"},[r("div",{staticClass:"title"},[t._v("工作仪表盘")]),t._v(" "),r("div",{staticClass:"group fx"},[r("div",{staticClass:"fx5 fx L"},[r("div",{staticClass:"fx1 item"},[r("div",{staticClass:"num",staticStyle:{color:"#1890ff"}},[t._v(t._s(t.progress.target_client))]),t._v(" "),r("div",{staticClass:"txt"},[t._v("目标客户")])]),t._v(" "),r("div",{staticClass:"fx1 item"},[r("div",{staticClass:"num",staticStyle:{color:"#1bc7e7"}},[t._v(t._s(t.progress.report_client))]),t._v(" "),r("div",{staticClass:"txt"},[t._v("报备客户")])]),t._v(" "),r("div",{staticClass:"fx1 item"},[r("div",{staticClass:"num",staticStyle:{color:"#74c374"}},[t._v(t._s(t.progress.coop_client))]),t._v(" "),r("div",{staticClass:"txt"},[t._v("合作客户")])]),t._v(" "),r("div",{staticClass:"fx1 item"},[r("div",{staticClass:"num",staticStyle:{color:"#d9534f"}},[t._v(t._s(t.progress.lose_client))]),t._v(" "),r("div",{staticClass:"txt"},[t._v("流失客户")])])]),t._v(" "),r("div",{staticClass:"fx5 fx R"},[r("div",{staticClass:"fx1 item"},[r("div",{staticClass:"bt"},[t._v("报价份数")]),t._v(" "),r("div",{staticClass:"ny"},[r("div",{staticClass:"line fx"},[r("div",{staticClass:"name"},[t._v("品牌报价")]),t._v(" "),r("div",{staticClass:"val"},[t._v(t._s(t.progress.brand_price))])]),t._v(" "),r("div",{staticClass:"line fx"},[r("div",{staticClass:"name"},[t._v("既时报价")]),t._v(" "),r("div",{staticClass:"val"},[t._v(t._s(t.progress.rt_price))])]),t._v(" "),r("div",{staticClass:"line fx"},[r("div",{staticClass:"name"},[t._v("其他报价")]),t._v(" "),r("div",{staticClass:"val"},[t._v(t._s(t.progress.other_price))])])])]),t._v(" "),r("div",{staticClass:"fx1 item"},[r("div",{staticClass:"bt"},[t._v("标签统计")]),t._v(" "),r("div",{staticClass:"ny"},[r("div",{staticClass:"line fx"},[r("div",{staticClass:"name"},[t._v("配套机器")]),t._v(" "),r("div",{staticClass:"val"},[t._v(t._s(t.progress.machine))])]),t._v(" "),r("div",{staticClass:"line fx"},[r("div",{staticClass:"name"},[t._v("累计送检")]),t._v(" "),r("div",{staticClass:"val"},[t._v(t._s(t.progress.censor))])])])]),t._v(" "),r("div",{staticClass:"fx1 item"},[r("div",{staticClass:"bt"},[t._v("论坛")]),t._v(" "),r("div",{staticClass:"ny"},[r("div",{staticClass:"line fx"},[r("div",{staticClass:"name"},[t._v("我的帖子")]),t._v(" "),r("div",{staticClass:"val"},[t._v(t._s(t.progress.mynote))])]),t._v(" "),r("div",{staticClass:"line fx"},[r("div",{staticClass:"name"},[t._v("我的获赞")]),t._v(" "),r("div",{staticClass:"val"},[t._v(t._s(t.progress.likes))])])])])])])]):t._e(),t._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.chartLoading,expression:"chartLoading"}],staticClass:"chartWrap"},[r("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"个人业绩",name:"first"}},[r("div",{staticClass:"chart"},[r("div",{staticClass:"control fx"},[r("div",{staticClass:"dropDown fx1"},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:t.onPersonChange},model:{value:t.curPerson,callback:function(e){t.curPerson=e},expression:"curPerson"}},t._l(t.options,function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),r("div",{staticClass:"biaoshi",attrs:{hidden:""}},[r("el-checkbox-group",{model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},[r("el-checkbox",{attrs:{label:"销售"}},[r("div",{staticClass:"fx"},[t._v("\n                                        销售\n                                        "),r("div",{staticClass:"xs bar"})])]),t._v(" "),r("el-checkbox",{attrs:{label:"回款"}},[r("div",{staticClass:"fx"},[t._v("\n                                        回款\n                                        "),r("div",{staticClass:"hk bar"})])]),t._v(" "),r("el-checkbox",{attrs:{label:"累计欠款"}},[r("div",{staticClass:"fx"},[t._v("\n                                        累计欠款\n                                        "),r("div",{staticClass:"ljqk bar"})])])],1)],1)]),t._v(" "),r("div",{staticClass:"main"},[r("ve-histogram",{attrs:{data:t.chartData,settings:t.chartSettings,extend:t.chartExtend}})],1)])])],1),t._v(" "),r("div",{staticClass:"filter"},[r("el-date-picker",{attrs:{type:"year",placeholder:"选择年"},on:{change:t.onYearChange},model:{value:t.curYear,callback:function(e){t.curYear=e},expression:"curYear"}})],1)],1)])},staticRenderFns:[]};var _=r("VU/8")(p,g,!1,function(t){r("kZiE")},null,null);e.default=_.exports},SldL:function(t,e){!function(e){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,s="function"==typeof Symbol?Symbol:{},i=s.iterator||"@@iterator",o=s.asyncIterator||"@@asyncIterator",c=s.toStringTag||"@@toStringTag",l="object"==typeof t,u=e.regeneratorRuntime;if(u)l&&(t.exports=u);else{(u=e.regeneratorRuntime=l?t.exports:{}).wrap=x;var v="suspendedStart",h="suspendedYield",f="executing",d="completed",p={},g={};g[i]=function(){return this};var _=Object.getPrototypeOf,y=_&&_(_(P([])));y&&y!==n&&a.call(y,i)&&(g=y);var m=L.prototype=w.prototype=Object.create(g);b.prototype=m.constructor=L,L.constructor=b,L[c]=b.displayName="GeneratorFunction",u.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},u.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(m),t},u.awrap=function(t){return{__await:t}},k(E.prototype),E.prototype[o]=function(){return this},u.AsyncIterator=E,u.async=function(t,e,r,n){var a=new E(x(t,e,r,n));return u.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},k(m),m[c]="Generator",m[i]=function(){return this},m.toString=function(){return"[object Generator]"},u.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},u.values=P,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,a){return o.type="throw",o.arg=t,e.next=n,a&&(e.method="next",e.arg=r),!!a}for(var s=this.tryEntries.length-1;s>=0;--s){var i=this.tryEntries[s],o=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=a.call(i,"catchLoc"),l=a.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var s=n;break}}s&&("break"===t||"continue"===t)&&s.tryLoc<=e&&e<=s.finallyLoc&&(s=null);var i=s?s.completion:{};return i.type=t,i.arg=e,s?(this.method="next",this.next=s.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;j(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),p}}}function x(t,e,r,n){var a=e&&e.prototype instanceof w?e:w,s=Object.create(a.prototype),i=new N(n||[]);return s._invoke=function(t,e,r){var n=v;return function(a,s){if(n===f)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw s;return Y()}for(r.method=a,r.arg=s;;){var i=r.delegate;if(i){var o=S(i,r);if(o){if(o===p)continue;return o}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===v)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var c=C(t,e,r);if("normal"===c.type){if(n=r.done?d:h,c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=d,r.method="throw",r.arg=c.arg)}}}(t,r,i),s}function C(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function w(){}function b(){}function L(){}function k(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function E(t){var e;this._invoke=function(r,n){function s(){return new Promise(function(e,s){!function e(r,n,s,i){var o=C(t[r],t,n);if("throw"!==o.type){var c=o.arg,l=c.value;return l&&"object"==typeof l&&a.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,s,i)},function(t){e("throw",t,s,i)}):Promise.resolve(l).then(function(t){c.value=t,s(c)},i)}i(o.arg)}(r,n,e,s)})}return e=e?e.then(s,s):s()}}function S(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,S(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=C(n,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,p;var s=a.arg;return s?s.done?(e[t.resultName]=s.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,p):s:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,s=function e(){for(;++n<t.length;)if(a.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return s.next=s}}return{next:Y}}function Y(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},Xxa5:function(t,e,r){t.exports=r("jyFz")},exGp:function(t,e,r){"use strict";e.__esModule=!0;var n,a=r("//Fk"),s=(n=a)&&n.__esModule?n:{default:n};e.default=function(t){return function(){var e=t.apply(this,arguments);return new s.default(function(t,r){return function n(a,i){try{var o=e[a](i),c=o.value}catch(t){return void r(t)}if(!o.done)return s.default.resolve(c).then(function(t){n("next",t)},function(t){n("throw",t)});t(c)}("next")})}}},jyFz:function(t,e,r){var n=function(){return this}()||Function("return this")(),a=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,s=a&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r("SldL"),a)n.regeneratorRuntime=s;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}},kZiE:function(t,e){},zqYo:function(t,e,r){"use strict";var n=r("7t+N"),a=r.n(n);a.a.log=console.log,a.a.getCurYear=function(){return(new Date).getFullYear()},e.a=a.a}});