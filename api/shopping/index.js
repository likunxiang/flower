import BaseApi from '@/api/BaseApi'
import {
	has,
	get
} from 'lodash'
// 购物车
class Index extends BaseApi {
	
	//*购物车*
	
	//购物车-列表
	API_CARTLIST(parameter = {}) {
		return this.vm.$u.post('store_cart/index', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//购物车-删除
	API_CARTDEL(parameter = {}) {
		return this.vm.$u.post('store_cart/delete', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//购物车-编辑
	API_CARTEDIT(parameter = {}) {
		return this.vm.$u.post('store_cart/edit', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
    
}

export default (Vue, vm) => {
	return new Index(Vue, vm)
}
