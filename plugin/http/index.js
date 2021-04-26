/**
 * Http请求
 * 参考:https://www.uviewui.com/js/http.html
 */

import zmConfig from "@/config/index";
import {getApiUrl} from "@/utils/help";
import {has} from "lodash";
const smallVersion = require("@/package.json").smallVersion;
/**
 * 配置参数
 */
const defaultConfig = {
	baseUrl: getApiUrl(),
	method: "POST",
	dataType: "json",
	showLoading: false,
	loadingText: "请求中...",
	loadingTime: 800,
	originalData: true,
	loadingMask: true,
	header: {
		"content-type": "application/json;charset=UTF-8",
		// "api-device-type":"wxa",//判断接口是小程序需要的数据 唯一识别
		"platform":'WeChat',//平台
		"timestamp": Date.parse(new  Date())/1000,//时间戳 
		"version":smallVersion,//客户端版本 
		"os":uni.getStorageSync('os'),//系统版本
		"device":uni.getStorageSync('device'),//设备ID
		"model":uni.getStorageSync('model'),//设备型号
	},
};

/**
 * 获取身份
 */
export const getToken = (vm) => {
	let token = "";
	// console.log(getApp().globalData.deviceInfo, 0);
	// console.log(vm[zmConfig.auth.tokenName], 1);
	// console.log(vm.$store.state[zmConfig.auth.tokenName], 2);
	switch (zmConfig.auth.tokenType) {
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		case "1":
			token = vm[zmConfig.auth.tokenName] || vm.$store.state.token;
			break;
			// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		case "2":
			token = vm.$store.state[zmConfig.auth.tokenName] || vm.$store.state.token;
			break;
			// 方式三，如果token放在了globalData，通过getApp().globalData获取
		case "3":
			token = getApp().globalData[zmConfig.auth.tokenName] || vm.$store.state.token;
			break;
			// 方式四（和默认），如果token放在了Storage本地存储中，拦截是每次请求都执行的
		case "4":
		default:
			token = uni.getStorageSync(zmConfig.auth.tokenName);
			break;
	}

	return token;
};


/**
 * 登陆
 */
export const goLogin = (vm) => {
	uni.clearStorage();
	setTimeout(() => {
		if (vm.$store.state.token) {
			uni.showModal({
				content: '登陆已过期,重新登录',
				showCancel: true,
				success: (res) => {
					if (res.confirm) {
						vm.$u.route({
							url: zmConfig.url.loginUrl,
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		} else {
			uni.showModal({
				content: '请授权登录',
				showCancel: true,
				success: (res) => {
					if (res.confirm) {
						vm.$u.route({
							url: zmConfig.url.loginUrl,
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		}
	}, 500);
};

const install = (Vue, vm) => {
	// 配置参数
	Vue.prototype.$u.http.setConfig(defaultConfig);
	// 请求拦截
	Vue.prototype.$u.http.interceptor.request = (config) => {
		//获取TOKEN
		config.header[zmConfig.auth.tokenName] = getToken(vm);

		//是否是开放请求（不需要TOKEN）
		let isNoToken = !config.header[zmConfig.auth.tokenName] ? zmConfig.url.noTokenUrls.includes(config
			.url) : zmConfig.url.noTokenUrlsOk.includes(config.url);
		// console.log(isNoToken)
		//非开放请求（需要TOKEN）,却没有TOKEN的直接处理为身份过期, 未通过拦截, 直接跳到转到登陆
		if (isNoToken == false && config.header[zmConfig.auth.tokenName] == "") {
			goLogin(vm);
			return false;
		}

		//不要 TOKEN的页面
		if (isNoToken == true) {
			vm.$set(config.header, "api-token", "");
		}
		/**
		 * 通过在调用接口时，配置header参数中的next来达到异常时是否自行处理异常
		 * 如:this.$u.post('', {}, {next: true})
		 */
		if (has(config.header, "next")) {
			Vue.prototype.$u.http["next"] = config.header.next;
			delete config.header.next;
		}
		//通过拦截
		return config;
	};
	// 响应拦截
	Vue.prototype.$u.http.interceptor.response = (res) => {
		switch (res.data.status) {
			case 0:
				return res.data;
				break;
			case 1000:
				vm.$u.toast(res.data.msg);
				return false;
				break;
			case -3:
				goLogin(vm);
				return false;
				break;
			default:
				vm.$u.toast(res.data.msg);
				return false;
				break;
		}
	};
};

export default {
	install,
};
