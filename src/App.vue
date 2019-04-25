<template>
    <div id="appIndex">
        <el-container :style="{height: '100%'}">
            <div class="aside">
                <v-aside-tool :width="asideWidth"></v-aside-tool>
                <el-aside :width="asideWidth">
                    <v-aside></v-aside>
                </el-aside>
            </div>
            <el-container>
                <el-header height="80px">
                    <v-header></v-header>
                </el-header>
                <el-main>
                    <transition :name="transitionName">
                        <router-view @handleChangeNavbar="handleChangeNavbar"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
	import Header from './components/header.vue';
	import Aside from './components/aside.vue';
	import AsideTool from './components/asideTool.vue'
	import {Toast} from 'vant';

	export default {
		name: 'App',
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if (vm.$tool.getter('token') == '' && to.query.token == '') {
					vm.$router.push('/login');
				}
			});
		},
		/**
		 * beforeRouteUpdate  路由更新时
		 * 当路由更新时同时也更新面包屑导航
		 */
		 beforeRouteUpdate(to,from, next) {
		    this.$progress.done();
		    next();
		 },

		data() {
			return {
				transitionName: 'bounceInRight',
				path1: '',
				path2: '',
				showNavbar: true, //是否显示导航
			}
		},

		methods: {
			isLogin() {
				this.$message({
					showClose: true,
					message: '登录成功！'
				})
			},

			getUser() {
				// this.$loading(
				//   {
				//     lock: true,
				//     text: 'Loading',
				//     background: 'rgba(255, 255, 255, 0.7)'
				//   }
				// );
				this.$store.dispatch('getUserInfo').then(() => {
					if (this.mobile) {

						toast.clear();

					} else {
						// this.$loading().close();
					}
				});
			},
			handleChangeNavbar(status) {
				this.showNavbar = status;
			},

		},
		created() {

			this.getUser();

			if (document.body.clientWidth < 1300) {
				this.$store.dispatch('InitShrinkStatus', true);
			}

			this.$store.dispatch('InitToken', this.$tool.getter('token'));
		},

		computed: {
			navigation: function () {
				return this.$store.state.user.navigation;
			},
			asideWidth: function () {
				if (this.$store.state.user.ShrinkStatus === true) {
					return '64px';
				}

				return '200px';
			}
		},

		components: {
			'v-aside': Aside,
			'v-header': Header,
			'v-aside-tool': AsideTool
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    body, html
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        position: relative;

        font-family: sans-serif, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
        // font-size: 62.5%;

        a:link
            text-decoration: none;

        a:visited
            color: rgb(191, 203, 217);
        a: hover
        // color: rgb(191, 203, 217)

        .bounceInRight-enter-active
            animation-name: fadeIn;
            animation-duration: 0.8s;

        #appIndex
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            // text-align: center;
            color: #2c3e50;
            position: relative;
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;

            .aside
                transition: all 0.5s;
                position: relative;
                overflow-y: auto;
                // overflow-x: hidden;
                height: 100%;
                width: auto;
                // border-right: 1px solid #ddd;
                -webkit-overflow-scrolling: touch;
                background: #222d32;
                // flex: 1;
                flex-shrink: 0;

            .router-link-active
                color: #ffd04b

            .el-header
                transition: all 0.5s;
                // background: linear-gradient(to right, #0178bc 0%, #00bdda 100%);
                //background: #3c8dbc;
                color: #333;
                padding: 0;

            .el-aside
                transition: all 0.5s cubic-bezier(1, .09, .21, 1.09);
                display: block;
                overflow-x: hidden;
                position: relative;
                margin-bottom: 150px;

                overflow-y: auto;

                ul
                    padding-right: 0px;

            .el-main
                transition: all 0.5s cubic-bezier(1, .09, .21, 1.09);
                background-color: rgb(242, 247, 248);
                color: #333;
                top: 60px;
                bottom: 0px;
                height: 100%;
                // flex: 5;
                //overflow: hidden;
                background: #fff;

            .aside-mobile-show
                left: 0;

</style>
