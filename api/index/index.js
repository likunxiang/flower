import BaseApi from '@/api/BaseApi'
import {
	has,
	get
} from 'lodash'
// 首页
class Index extends BaseApi {
	// 首页
	INDEX(parameter = {}) {
		return this.vm.$u.post('home.index/index', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	// 首页 好物推荐
	GOODS_LIST(parameter = {}) {
		return this.vm.$u.post('home.index/get_recommend_product', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 热销榜单
	HOT_RANKING(parameter = {}) {
		return this.vm.$u.post('product.product/sell_well_list', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 最新到货
	NEWEST(parameter = {}) {
		return this.vm.$u.post('product.product/new_goods_list', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 精选品牌
	CHOICENESS(parameter = {}) {
		return this.vm.$u.post('home.brand/index', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	
	// 商品详情
	GOODS_DETAIL(parameter = {}) {
		return this.vm.$u.post('product.product/detail', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	// 加入购物车
	ADD_CART(parameter = {}) {
		return this.vm.$u.post('store_cart/add', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 品牌详情
	BRAND(parameter = {}) {
		return this.vm.$u.post('home.brand/detail', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 种草专场-详情
	SEEDING_DETAIL(parameter = {}) {
		return this.vm.$u.post('home.article/detail', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 种草专场-列表
	SEEDING_LIST(parameter = {}) {
		return this.vm.$u.post('home.article/index', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 搜索-关键词
	SEARCH_KEY(parameter = {}) {
		return this.vm.$u.post('home.search/keywords', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 搜索-结果列表
	SEARCH_GOODS_LIST(parameter = {}) {
		return this.vm.$u.post('home.search/product_list', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 周五专场/欢乐福利GO
	WELFARE(parameter = {}) {
		
		return this.vm.$u.post('home.joybuy/detail', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 首页 周五专场/欢乐福利GO/开售提醒
	SALE_REMIND(parameter = {}) {
		
		return this.vm.$u.post('home.joybuy/remind', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
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

}

export default (Vue, vm) => {
	return new Index(Vue, vm)
}
