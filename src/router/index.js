import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue';
import tool from '../util/tool.js';
import Store from '../store.js';

const Login = () => import('@/components/login.vue');
const Signup = () => import('@/components/signup.vue');
const Err403 = () => import('@/components/main/error/err_403.vue');
const Mobile = () => import('@/components/mobile.vue');
const Bind = () => import('@/components/m/bind/index.vue');

Vue.use(Router)

let routes = [
	{
		path: '/',
		name: 'login',
		component: Login,

	},
	{
		path: '/login',
		component: Login,

	},
	{
		path: '/signup',
		component: Signup,
	},
	{
		path: '/bind',
		component: Bind,
	},
	{
		path: '/app',
		// name: 'app',
		component: App,
		children: [
			{
				path: '/',
				// component: mainIndex
				component: () => import('@/components/main/index/index.vue')
			},
			{
				path: 'customerAdd',
				// component: customerAdd
				component: () => import('@/components/main/customer/customerAdd.vue')
			},
			{
				path: 'customerResource',
				// component: customerResource
				component: () => import('@/components/main/customer/customerResource.vue')
			},
			{
				path: 'customer',
				// component: customerPub
				component: () => import('@/components/main/customer/customerPub.vue')
			},
			{
				path: 'myCustomer',
				// component: myCustomer
				component: () => import('@/components/main/customer/myCustomer.vue')
			},

			{
				path: 'userList',
				// component: userList
				component: () => import('@/components/main/rbac/userList.vue')
			},
			{
				path: 'role',
				// component: Role
				component: () => import('@/components/main/rbac/role.vue')
			},
			{
				path: 'permission',
				// component: Permission
				component: () => import('@/components/main/rbac/permission.vue')
			},
            {
                path: 'products',
                component: () => import('@/components/main/base/products/index.vue')
            },
			{
				path: 'brand',
				// component: Brand
				component: () => import('@/components/main/base/brand.vue')
			},
			{
				path: 'wechat',
				// component: Wechat
				component: () => import('@/components/main/base/wechat/index.vue')
			},
			{
				path: 'department',
				// component: Department
				component: () => import('@/components/main/base/department.vue')
			},
			{
				path: 'arset',
				component: () => import('@/components/main/base/arset.vue')
			},
			{
				path: 'forum',
				component: () => import('@/components/main/forum/index.vue'),
				redirect: '/app/forum/portal',
				children: [
					{
						path: 'portal',
						component: () => import('@/components/main/forum/portal.vue'),
						meta: {
							keepAlive: true,// 需要被缓存
							scrollTop: 0,
						},
					},
					{
						path: 'create',
						component: () => import('@/components/main/forum/create.vue'),
						children: [
							{
								path: 'article',
								component: () => import('@/components/main/forum/create/write.vue')
							},
							{
								path: 'photos',
								component: () => import('@/components/main/forum/create/photos.vue')
							}

						],
					},
					{
						path: 'article/:id',
						component: () => import('@/components/main/forum/list/content.vue')
					},
					{
						path: 'module/:id/attr/:attr',
						name: 'forumModule',
						component: () => import('@/components/main/forum/list/list.vue'),
						meta: {
							keepAlive: true,// 需要被缓存
							scrollTop: 0,
							category: 0,
						},
					},
					{
						path: 'publish',
						component: () => import('@/components/main/forum/article/publish.vue')
					},
					{
						path: 'draft',
						component: () => import('@/components/main/forum/article/draft.vue')
					},
					{
						path: 'category',
						component: () => import('@/components/main/forum/manager/category.vue')
					},
					{
						path: 'module_manager',
						component: () => import('@/components/main/forum/manager/module.vue')
					},
					{
						path: 'setup',
						component: () => import('@/components/main/forum/manager/setup.vue')
					},
					{
						path: 'message',
						component: () => import('@/components/main/forum/message/index.vue')
					}
				]

			},
			{
				path: 'arsum',
				component: () => import('@/components/main/arsum/index.vue'),
			},
			{
				//报价工具
				path: 'offer',
				component: () => import('@/components/main/offer/index.vue'),
				children: [
					{
						path: 'cash',
						component: () => import('@/components/main/offer/cash.vue'),
					},
                    {
                        path: 'cost',
                        component: () => import('@/components/main/offer/cost.vue'),
                    },
					{
						path: 'history',
						component: () => import('@/components/main/offer/history.vue'),
					},
                    {
                        path: "authorize",
                        component: () => import("@/components/main/offer/OfferAuthorize.vue")
                    }
				]
			},
			{
				path: '403',
				component: Err403
			}

		],
	},
	{
		path: '/m',
		component: Mobile,
		children: [
			{
				path: '/',
				redirect: 'index'
			},
			{
				path: 'index',
				// component: MobileIndex,
				component: () => import('@/components/m/index/index.vue'),
				redirect: '/m/index/',
				children: [
					{
						path: '/',
						component: () => import('@/components/m/index/home.vue'),
					},
					{
						path: 'resetpass',
						component: () => import('@/components/m/index/ResetPasswd.vue')
					}
				]
			},
			{
				path: 'customer',
				// component: MobileCustomer,
				component: () => import('@/components/m/customer/index.vue'),
				redirect: '/m/customer/index',
				children: [
					{
						path: 'index',
						component: () => import('@/components/m/customer/list.vue')
					},
					{
						path: 'newest',
						component: () => import('@/components/m/customer/public.vue')
					},
					{
						path: 'mine',
						component: () => import('@/components/m/customer/my.vue'),
						redirect: '/m/customer/mine/index',
						children: [
							{
								path: 'index',
								component: () => import('@/components/m/customer/my/index.vue')
							},
							{
								path: 'detail',
								component: () => import('@/components/m/customer/my/detail.vue')
							},
							{
								path: 'comments',
								component: () => import('@/components/m/customer/my/comments.vue')
							}
						]
					},
				]
			},
			{
				path: 'project',
				// component: MobileProject,
				component: () => import('@/components/m/project/index.vue')
			},
			{
				path: 'article',
				// component: MobileBBS,
				component: () => import('@/components/m/article/index.vue')
			},
			{
				path: 'forum',
				component: () => import('@/components/m/forum/index.vue')
			}
		]
	}
];

const router = new Router({
	// history: true,
	mode: 'hash',
	routes: routes,
});
router.beforeEach((to, from, next) => {

	if (to.matched.length === 0) { //如果未匹配到路由

		from.name ? next({

			name: from.name

		}) : next('/app'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由

	} else {

		let url = window.location.href;
		let string = url.substring(url.indexOf('?') + 1).split('&');
		let params = {};

		string.forEach(item => {
			let param = item.split('=');

			params[param[0]] = param[1];
		});

		if (params.token != '' && typeof (params.token) != 'undefined') {
			tool.setter('token', params.token);
		}

		Store.dispatch('Breadcrumb', to.fullPath);

		if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

			if (to.fullPath.indexOf('/app') > -1) {

				let newPath = to.fullPath.replace('/app', '/m');

				next(newPath);

			} else {

				next();
			}
		} else {

			if (to.fullPath.indexOf('/m/') > -1) {

				let newPath = to.fullPath.replace('/m/', '/app/');

				next(newPath);

			} else {
				next();
			}
		}

	}
});

export default router;

