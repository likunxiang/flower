import zmConfig from "@/config/index";
import {
	has
} from "lodash";
import zmEnv from "@/zm-env";
import Router from '@/router';

/**
 * 对象是否为空
 */
export const isEmpty = (obj) => {
	let key;
	let empty = true;
	if (obj instanceof Object) {
		for (key in obj) {
			if (empty && has(obj, key)) {
				empty = false;
			}
		}
	}
	return empty;
};

/**
 * 格式化文本内容
 */
export const formatInput = (data) => {
	let resultStr = data.replace(/\ +/g, ""); //去掉空格
	resultStr = data.replace(/[ ]/g, ""); //去掉空格
	resultStr = data.replace(/[\r\n]/g, ""); //去掉回车换行
	return resultStr;
};

/**
 * 是否为真
 */
export const isTrue = (data) => {
	switch (typeof data) {
		//对象，数组，null
		case "object":
			return !isEmpty(data);
			break;
		case "number":
			return data == 0 ? false : true; //不等于0 都为真
			break;
		case "string":
			return data.trim().length > 0 ? true : false;
			break;
		case "boolean":
			return data;
			break;
		case "undefined":
			return false;
		default:
			return false;
	}
};

/**
 * 获取API地址
 */
export const getApiUrl = () => {
	let url = "";
	switch (zmConfig.env) {
		case "1": //测试
			url = "https://devapi.xrkmall.com";
			break;
		case "2": //正式域名
			url = "https://api.xrkmall.com";
			break;
		default:
			break;
	}

	return url;
};

/**
 * 获取Socket地址
 */
export const getSocektUrl = () => {
	let url = "";
	switch (zmConfig.env) {
		case "1":
			url = "";
			break;
		case "2":
			url = "";
			break;
		default:
			break;
	}

	return url;
};

/**
 * 获取常驻缓存
 * @param {Object} key 不传值时,获取所有的常驻缓存,传值时,获取指定常驻缓存
 */
export const getKeepAlivedState = (key = "") => {
	if (key) {
		return cache(zmConfig.store.keepAlivedStatePrefix + key);
	} else {
		let keepAlivedStateKeys = zmConfig.store.keepAlivedStateKeys;
		let keepAlivedState = {};

		keepAlivedStateKeys.forEach((stateName) => {
			keepAlivedState[stateName] = cache(
				zmConfig.store.keepAlivedStatePrefix + stateName
			);
		});

		return keepAlivedState;
	}
};

/**
 * 设置常驻缓存
 * @param {Object} key
 * @param {Object} value
 */
export const setKeepAlivedState = (key, value) => {
	let keepAlivedStateKeys = zmConfig.store.keepAlivedStateKeys;

	if (keepAlivedStateKeys.indexOf(key) != -1) {
		cache(zmConfig.store.keepAlivedStatePrefix + key, value);
		return true;
	}

	return false;
};

/**
 * 缓存处理
 * 设置 cache('key',data, 7)或cache('key',data)
 * 获取 cache('key')
 * 删除 cache('key',null)
 */
export const cache = (key, data, seconds = 0) => {
	let timestamp = Date.parse(new Date()) / 1000;
	let expire = timestamp + seconds * 1;

	if (key && data === null) {
		//删除缓存
		uni.removeStorageSync(key);
		return true;
	} else if (key && data) {
		//设置缓存
		if (!seconds) {
			expire = timestamp + 3600 * 24 * zmConfig.cache.expireDay;
		}
		uni.setStorageSync(key, {
			data,
			expire,
		});
		return true;
	} else if (key) {
		//获取缓存
		let res = uni.getStorageSync(key);
		if (!res.expire || timestamp >= res.expire) {
			uni.removeStorageSync(key);
			return false;
		}
		return res.data;
	}

	return false;
};

/***
 * 获取当前浏览器类型
 */
export const getBrowser = () => {
	let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	let isOpera = userAgent.indexOf("Opera") > -1;
	if (isOpera) {
		//判断是否Opera浏览器
		return "Opera";
	}
	if (userAgent.indexOf("Firefox") > -1) {
		//判断是否Firefox浏览器
		return "FF";
	}
	if (userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	}
	if (userAgent.indexOf("Safari") > -1) {
		//判断是否Safari浏览器
		return "Safari";
	}
	if (
		userAgent.indexOf("compatible") > -1 &&
		userAgent.indexOf("MSIE") > -1 &&
		!isOpera
	) {
		//判断是否IE浏览器
		return "IE";
	}
};

/**
 * 将时间转为标准的时间
 * @param {Object} str
 */
export const toDateTime = (str, fmt = "1") => {
	str = str + "";
	fmt *= 1;
	if (str == "" || str == 0) {
		return;
	}
	if (fmt == 1) {
		return (
			str.substring(0, 4) +
			"-" +
			str.substring(4, 6) +
			"-" +
			str.substring(6, 8) +
			" " +
			str.substring(8, 10) +
			":" +
			str.substring(10, 12) +
			":" +
			str.substring(12, 14)
		);
	} else if (fmt == 2) {
		return (
			str.substring(0, 4) +
			"-" +
			str.substring(4, 6) +
			"-" +
			str.substring(6, 8) +
			" " +
			str.substring(8, 10) +
			":" +
			str.substring(10, 12)
		);
	} else {
		return (
			str.substring(0, 4) +
			"-" +
			str.substring(4, 6) +
			"-" +
			str.substring(6, 8)
		);
	}
};

/**
 * 时间格式化处理
 * @param now 时间
 * @param mask 格式 例如"yyyy-MM-dd HH:mm"
 */
export function getFormatDateItem(now, mask) {
	let d = now;
	let zeroize = function(value, length) {
		if (!length) length = 2;
		value = String(value);
		let zeros = "";
		for (let i = 0; i < length - value.length; i++) {
			zeros += "0";
		}
		return zeros + value;
	};
	return mask.replace(
		/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g,
		function($0) {
			switch ($0) {
				case "d":
					return d.getDate();
				case "dd":
					return zeroize(d.getDate());
				case "ddd":
					return ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][
						d.getDay()
					];
				case "dddd":
					return [
						"Sunday",
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
					][d.getDay()];
				case "M":
					return d.getMonth() + 1;
				case "MM":
					return zeroize(d.getMonth() + 1);
				case "MMM":
					return [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					][d.getMonth()];
				case "MMMM":
					return [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December",
					][d.getMonth()];
				case "yy":
					return String(d.getFullYear()).substr(2);
				case "yyyy":
					return d.getFullYear();
				case "h":
					return d.getHours() % 12 || 12;
				case "hh":
					return zeroize(d.getHours() % 12 || 12);
				case "H":
					return d.getHours();
				case "HH":
					return zeroize(d.getHours());
				case "m":
					return d.getMinutes();
				case "mm":
					return zeroize(d.getMinutes());
				case "s":
					return d.getSeconds();
				case "ss":
					return zeroize(d.getSeconds());
				case "l":
					return zeroize(d.getMilliseconds(), 3);
				case "L":
					var m = d.getMilliseconds();
					if (m > 99) m = Math.round(m / 10);
					return zeroize(m);
				case "tt":
					return d.getHours() < 12 ? "am" : "pm";
				case "TT":
					return d.getHours() < 12 ? "AM" : "PM";
				case "Z":
					return d.toUTCString().match(/[A-Z]+$/);
					// Return quoted strings with the surrounding quotes removed
				default:
					return $0.substr(1, $0.length - 2);
			}
		}
	);
}

export function randomColor() {
	var color = "rgb(";
	for (let i = 0; i < 3; i++) color += parseInt(Math.random() * 256) + ",";
	color = color.substring(0, color.length - 1) + ")";
	return color;
}

/**
 * 全局跳转方法
 * @param path 路径名
 * @param params 链接参数格式 例如"{ 'id' : * }"
 * @param method 跳转方法 默认 push
 * push 等同于 uni.navigateTo()，
 * replace 等同于 uni.redirectTo()，
 * replaceAll 等同于 uni.reLaunch()，
 * pushTab 等同于 uni.switchTab()
 */
export const jumpPage = (path, params = {}, method = 'push') => {
	params = getVariableType(params) !== 'Object' ? {} : params;
	params = formatParams(params);
	if (!path) return;
	Router[method]({
		path: path,
		query: params
	})
}

/**
 * 全局跳转方法 等同于 uni.navigateBack()
 * @param index 返回的页面数，如果 index 大于现有页面数，则返回到首页
 */
export const backPage = (index = 1) => {
	if (getCurrentPages().length === 1) {
		Router.replace({
			path: '/pages/index/index'
		})
	} else {
		Router.back(index);
	}
}

function formatParams(params) {
	let newParams = {};
	Object.keys(params).forEach(o => {
		(params[o] || params[o] == 0) && (newParams[o] = params[o]);
	})
	return newParams;
}

/**
 *@description 判断数据类型
 * @param {*} anything 任意数据类型 any
 * @return {string} 返回数据类型有Array,Number,Object,Boolean,String,Undefined,Function,Null
 */
export function getVariableType(anything) {
	return Object.prototype.toString.call(anything).slice(8, -1)
}

/**
 * 手机号码验证
 * 移动号码段:134 135 136 137 138 139 147 148 150 151 152 157 158 159  165 172 178 182 183 184 187 188 198
 * 联通号码段:130 131 132 145 146 155 156 166 171 175 176 185 186
 * 电信号码段:133 149 153 173 174 177 180 181 189 199
 * 虚拟运营商:170
 * @param cellphone 待检测手机号码
 * @returns {boolean}
 */
export const changePhone = (cellphone) => {
	var reg =
		/^(((13[0-9]{1})|(14[5-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(16[5-6]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
	var isOk = false;
	if (cellphone.trim().match(reg) == null)
		isOk = true;
	return isOk;
}
