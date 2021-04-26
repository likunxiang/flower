import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

App.mpType = 'app'

/**
 * 项目代码（前置代码）
 * 所有非框架的代码只允许在这里添加
 * -----开始------
 */
import store from "@/plugin/store/index";
import "@/plugin/store/mixin/index";
import "@/plugin/store/init/index";
import "@/plugin/prototype/index";
import "@/plugin/uview/index";
import "@/plugin/base/index";
import { RouterMount } from 'uni-simple-router'
import './router';
/**
 * 项目代码（前置代码）
 * -----结束------
 */

 // 生产环境中控制台不打印普通信息，以免造成内存泄漏
if (process.env.NODE_ENV == 'production') {
	if (console) {
		console.log = () => {}
	}
}

const app = new Vue({
    store,
    ...App,
});


/**
 *  项目代码（后置代码）
 * 所有非框架的代码只允许在这里添加
 * -----开始------

 /**
 * http拦截器
 * -----开始------
 */

import httpInterceptor from "@/plugin/http/index";
Vue.use(httpInterceptor, app);

/**
 * http拦截器
 * -----结束------
 */



 /**
 * md5拦截器
 * -----开始------
 */

import md5 from "static/comm/js/w_md5.js"
Vue.prototype.$md5 = md5;

/**
 * http拦截器
 * -----结束------
 */




/**
 * API
 * -----开始------
 */
import api from "@/plugin/api/index";
Vue.use(api, app);

/**
 * API
 * -----结束------
 */





/**
 * Bus
 * -----开始------
 */
import bus from "@/plugin/bus/index";
Vue.use(bus);

/**
 * Bus
 * -----结束------
 */





/**
 * QDTracker 客服
 * -----开始------
 */

import QDTracker from '@/plugin/qDTracker/QDTracker';
QDTracker.init({
  appid: 'wxad76eaaf4a1bee10',
  kfuin: '3009015473',
});

/**
 *
 * -----结束------
 */





/**
 * 项目代码（前置代码）
 * -----结束------
 */

// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// app.$mount();
