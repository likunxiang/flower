import BaseApi from '@/api/BaseApi'
import {
	has,
	get
} from 'lodash'
// 我的
class Index extends BaseApi {
	
	//*我的主页*
	
	//个人中心-获取用户信息
	API_USERINFO(parameter = {}) {
		return this.vm.$u.post('user.user/get_user_info', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-个人信息-修改昵称、头像、密码、支付密码
	API_USERMODIFY(parameter = {}) {
		return this.vm.$u.post('user.user/modify_user_info', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-实名认证校验
	API_MYORCIDCARD(parameter = {}) {
		return this.vm.$u.post('user.user/orc_idcard', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-图片上传
	API_MYCOMMFILE(parameter = {}) {
		return this.vm.$u.post('common/file_upload', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-实名认证提交
	API_MYCARDSUBMIT(parameter = {}) {
		return this.vm.$u.post('user.user/idcard_submit', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-设置-关于我们
	API_MYABOUT(parameter = {}) {
		return this.vm.$u.post('user.setting/about', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-设置-银行卡列表
	API_MYBANKCARDLIST(parameter = {}) {
		return this.vm.$u.post('user.setting/bankcard_list', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-设置-银行卡
	API_MYBANKLIST(parameter = {}) {
		return this.vm.$u.post('user.setting/bank_list', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-设置-新增银行卡
	API_MYBANKLISTADD(parameter = {}) {
		return this.vm.$u.post('user.setting/bankcard_add', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-获取区域列表
	API_GETREGIONLIST(parameter = {}) {
		return this.vm.$u.post('user.user_address/get_region_list', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//个人中心-获取用户售后地址
	API_GETREFUNDADDRESS(parameter = {}) {
		return this.vm.$u.post('user.user_address/get_refund_address', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	
	//*订单*
	
	//下单-结算页预览
	API_ORDERPREVIEW(parameter = {}) {
		return this.vm.$u.post('product.order/order_preview', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	// //下单-获取优惠券列表
	// API_MYCOUPONLISTORDER(parameter = {}) {
	// 	return this.vm.$u.post('product.order/get_my_coupon_list', parameter).then(res => {
	// 	    return Promise.resolve(res)
	// 	})
	// }
	
	//下单-下单生成订单
	API_MYCOUPONLISTSUBMIT(parameter = {}) {
		return this.vm.$u.post('product.order/order_submit', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//下单-支付
	API_MYORDERPAY(parameter = {}) {
		return this.vm.$u.post('product.pay/order_pay', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//支付-支付结果查询
	API_MYORDERPAYRESULT(parameter = {}) {
		return this.vm.$u.post('product.pay/order_result', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	
	
	
	
	//*优惠劵*
	
	//我的优惠券
	API_MYCOUPONLIST(parameter = {}) {
		return this.vm.$u.post('user.coupon/my_coupon', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	//*我的订单*
	
	//我的订单-订单列表
	API_MYORDERLISTALL(parameter = {}) {
		return this.vm.$u.post('user.myorder/index_all', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的订单-订单列表
	API_MYORDERLIST(parameter = {}) {
		return this.vm.$u.post('user.myorder/index', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的订单-删除订单
	API_MYORDERDEL(parameter = {}) {
		return this.vm.$u.post('user.myorder/del_order', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的订单-取消订单
	API_MYORDERCANCEL(parameter = {}) {
		return this.vm.$u.post('user.myorder/cancel_order', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的订单-确认收货
	API_MYORDERDELIVERY(parameter = {}) {
		return this.vm.$u.post('user.myorder/delivery_confirm', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的订单-提醒发货
	API_MYORDERREMIND(parameter = {}) {
		return this.vm.$u.post('user.myorder/remind_order', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的订单-订单详细
	API_MYORDERDETAIL(parameter = {}) {
		return this.vm.$u.post('user.myorder/detail', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的订单-获取售后/退款的商品列表
	API_MYORDERREFUNDPRODUCTLIST(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_product_list', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	
	
	
	//*售后*
	
	//申请售后列表
	API_MYREFUNDLIST(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_list', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//申请售后页面
	API_MYREFUNDINFO(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_preview', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//申请售后
	API_MYREFUNDAPPLY(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_apply', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//撤销申请售后
	API_MYREFUNDCANCEL(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_cancel', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//售后记录详细
	API_MYREFUNDDETAIL(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_detail', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//售后协商详情
	API_MYREFUNDRESPONSEDETAIL(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_response_detail', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//删除售后记录
	API_MYREFUNDDEL(parameter = {}) {
		return this.vm.$u.post('user.refund/refund_del', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	
	
	
	
	//*查看物流*
	
	 //我的订单-查看物流
	 API_DELIVERYQUERY(parameter = {}) {
	 	return this.vm.$u.post('user.myorder/delivery_query', parameter).then(res => {
	 	    return Promise.resolve(res)
	 	})
	 }
	 
	 //我的订单-查看物流列表
	 API_DELIVERYQUERYLIST(parameter = {}) {
	 	return this.vm.$u.post('user.myorder/delivery_list', parameter).then(res => {
	 	    return Promise.resolve(res)
	 	})
	 }
	 
	 
	 
	 
	//*领劵中心*
	
	//领券中心-优惠券列表
	API_COUPONLIST(parameter = {}) {
		return this.vm.$u.post('user.coupon/index', parameter).then(res => {
		    return Promise.resolve(res)
		})
	} 
	
	//领券中心-领取优惠券
	API_COUPONRECEIVE(parameter = {}) {
		return this.vm.$u.post('user.coupon/receive_coupon', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	
	
	
	//*地址管理*
	
	//收货地址-列表
	API_ADDRESSINDEX(parameter = {}) {
		return this.vm.$u.post('user.user_address/index', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//收货地址-新增
	API_ADDRESSADD(parameter = {}) {
		return this.vm.$u.post('user.user_address/add', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//收货地址-删除
	API_ADDRESSDEL(parameter = {}) {
		return this.vm.$u.post('user.user_address/del', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//收货地址-修改
	API_ADDRESSEDIT(parameter = {}) {
		return this.vm.$u.post('user.user_address/edit', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	
	
	
	//*我的收藏*
	
	//我的收藏列表
	API_COLLECTLIST(parameter = {}) {
		return this.vm.$u.post('user.collect_product/collect_list', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的收藏-删除
	API_COLLECTDEL(parameter = {}) {
		return this.vm.$u.post('user.collect_product/collect_del', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	//我的收藏-收藏/取消收藏商品
	API_COLLECTOTHER(parameter = {}) {
		return this.vm.$u.post('user.collect_product/collect_or_cancel', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	// 消息中心-入口
	MESSAGE(parameter = {}) {
		return this.vm.$u.post('home.notify/types', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	
	
	
	//*消息中心*
	
	// 消息中心-消息通知列表
    MESSAGE_CENTER(parameter = {}) {
    	return this.vm.$u.post('home.notify/index', parameter).then(res => {
    	    return Promise.resolve(res)
    	})
    }
	
	// 消息中心-消息通知详细
	MESSAGE_DETAIL(parameter = {}) {
		return this.vm.$u.post('home.notify/detail', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
	
	// 新消息数量提醒 
	MESSAGE_NUM(parameter = {}) {
		return this.vm.$u.post('home.notify/alert', parameter).then(res => {
		    return Promise.resolve(res)
		})
	}
}

export default (Vue, vm) => {
	return new Index(Vue, vm)
}
