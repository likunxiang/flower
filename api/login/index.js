import BaseApi from '@/api/BaseApi'
import {
	has,
	get
} from 'lodash'
// 登录模块
class Index extends BaseApi {
	// // 用户登录
	// login(parameter = {}) {
	// 	return this.vm.$u.post('', parameter).then(res => {
	// 		// 逻辑处理
	// 		// ......
	// 		return Promise.resolve(res)
	// 	}).catch(error => {
	// 		// 逻辑处理
	// 		// ......
	// 		return Promise.reject(error)
	// 	})
	// }
    
   
    //用户登录
    login(parameter = {}) {
		return this.vm.$u.post('no_login/get_wxa_userinfo', parameter).then(res => {
		    return Promise.resolve(res)
		})
    }
	//用户登录
	login_old(parameter = {}) {
		return this.vm.$u.post('no_login/wxa_login', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	// 获取手机号
	bindTel(parameter = {}) {
		return this.vm.$u.post('wxa/get_phone_number', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	// 绑定手机号和邀请码
	bindTelAndCode(parameter = {}) {
		return this.vm.$u.post('wxa/bind_phone', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	// //用户登录
	// login(parameter = {}) {
	// 	return this.vm.$u.get('no_login/wxa_login', parameter).then(res => {
	// 	    return Promise.resolve(res)
	// 	})
	// }
   
	
}

export default (Vue, vm) => {
	return new Index(Vue, vm)
}
