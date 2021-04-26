import Vue from 'vue'
import Router from 'uni-simple-router'
import store from "@/plugin/store/index";
import zmConfig from "@/config/index";
Vue.use(Router)

// console.log(ROUTES)
//初始化
const router = new Router({
	routes: ROUTES, //路由表
	h5: {
		loading: false, //是否显示加载动画
		paramsToQuery: true //h5端通过params传参 刷新会丢失 开启此开关将变成?连接的方式
	},
	encodeURI: false
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log(to)
	// console.log(zmConfig.url.noTokenPush.includes(to.path))
	if (to.meta && to.meta.authorization) {
		if (!zmConfig.url.noTokenPush.includes(to.path)) {
			if (!store.state.token) {
				if (to.path !== '/pages/my/login/login/login') {
					return next({
						path: '/pages/my/login/login/login',
					});
				}
			}
		} else {
			next()
		}
	}
	next()
});
// 全局路由后置守卫
router.afterEach((to, from) => {

});
export default router;
