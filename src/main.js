import Vue from 'vue';
import store from './store.js';
import router from './router/index.js';
import Start from './start.vue';
import 'muse-ui/dist/muse-ui.css';
import 'vant/lib/vant-css/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/animate.css';
import 'swiper/dist/css/swiper.css';


import VueAxios from 'vue-axios'
import Element from 'element-ui';
import tool from './util/tool.js';
import appConst from './util/appConst.js';
import MuseUI from 'muse-ui';
import { Tab, Tabs } from 'vant';
import { Button } from 'vant';
import { Actionsheet } from 'vant';
import { Dialog } from 'vant';
import { Field } from 'vant';
import { Popup } from 'vant';
import './assets/styl/base.styl';

// 引入 Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min');

//引入中文语言包
require('froala-editor/js/languages/zh_cn');

//fan引入v-charts
import VCharts from 'v-charts'
Vue.use(VCharts)

//引入 Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');//此处可在index.html中引入：font-awesome cdn地址：<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
require('froala-editor/css/froala_style.min.css');

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg';
import Progress from './plugins/progress';
Vue.use(VueFroala)

Vue.use(Popup);
Vue.use(Field);
Vue.use(MuseUI);
Vue.use(Button);
Vue.use(Tab).use(Tabs);
Vue.use(Actionsheet);
Vue.use(Dialog);
Vue.use(Element, {size: 'small'});
Vue.use(Progress);
Vue.config.productionTip = false;
Vue.prototype.$tool = tool;
Vue.prototype.$appConst = appConst;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Start),
});


