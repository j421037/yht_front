import progress from './main.js';
//Vue会自动调用install方法
progress.install = function(Vue, options) {
	Vue.prototype.$progress = progress;
}

export default progress;
