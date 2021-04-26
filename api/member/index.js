import BaseApi from '@/api/BaseApi'
import {
	has,
	get
} from 'lodash'
// 会员
class Index extends BaseApi {
	
	// 会员中心
	MEMBER_CENTER(parameter = {}) {
		return this.vm.$u.post('membership.index/index', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 成长值
	GROW_VALUE(parameter = {}) {
		return this.vm.$u.post('membership.index/consume_money_log', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 推广订单列表
	PROMOTION_ORDER(parameter = {}) {
		return this.vm.$u.post('membership.index/invite_order_list', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 推广会员列表
	PROMOTION_MEMBER(parameter = {}) {
		return this.vm.$u.post('membership.index/invite_user_list', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
    
	// 代理订单
	AGENCY_ORDER(parameter = {}) {
		return this.vm.$u.post('user.agentorder/index', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 代理发货
	SHIPMENTS(parameter = {}) {
		return this.vm.$u.post('user.agentorder/order_ship', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 代理发货-全部
	SHIPMENTSALL(parameter = {}) {
		return this.vm.$u.post('user.agentorder/onekey_order_ship', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 卖家-售后-获取售后地址
	GET_REFUND_ADDRESS(parameter = {}) {
		return this.vm.$u.post('user.agentrefund_address/get_address_info', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 卖家-售后-编辑售后地址
	EDIT_REFUND_ADDRESS(parameter = {}) {
		return this.vm.$u.post('user.agentrefund_address/edit_address_info', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 卖家-售后订单-审核
	REFUND_AUDIT(parameter = {}) {
		return this.vm.$u.post('user.agentrefund/audit_refund', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
	
	// 我的收入
	MY_INCOME(parameter = {}) {
		return this.vm.$u.post('membership.income/index', parameter).then(res => {
			return Promise.resolve(res)
		})
	}
}

export default (Vue, vm) => {
	return new Index(Vue, vm)
}
