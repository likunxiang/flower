<template>
	<view class="content_main">

		<u-navbar title="订单详情" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<!-- 订单状态 -->
			<view class="box_remind">

				<view class="remind_state">
					<view class="state_img">

						<!-- 图标判断 -->
						<template>
							<u-icon name="timing" custom-prefix="custom-icon" size="36" v-if="orderDetailInfo.status==1 || orderDetailInfo.status==13"></u-icon>
							<u-icon name="bag" custom-prefix="custom-icon" size="36" v-else-if="orderDetailInfo.status==2 || orderDetailInfo.status==3"></u-icon>
							<u-icon name="onclick" custom-prefix="custom-icon" size="36" v-else-if="orderDetailInfo.status==4 || orderDetailInfo.status==5"></u-icon>
							<u-icon name="stoped" custom-prefix="custom-icon" size="36" v-else-if="orderDetailInfo.status==10 || orderDetailInfo.status==11"></u-icon>
						</template>

						<!-- 订单状态名字 -->
						<template>
							<text class="state_title" style="color: #F1444D;"
								v-if="orderDetailInfo.status ==10 || orderDetailInfo.status ==11">{{orderDetailInfo.status_str}}</text>
							<text class="state_title" v-else>{{orderDetailInfo.status_str}}</text>
						</template>

					</view>

					<!-- 订单状态描述 -->
					<template>
						<view class="state_time" v-if="orderDetailInfo.status==1">请在 <u-count-down
								style="margin: 0 10rpx;" font-size="22" color="#333333"
								:timestamp="timeInfo.left_pay_time"></u-count-down> 内完成付款，超时将会自动取消订单</view>
						<view v-else-if="orderDetailInfo.status == 2" class="state_time">更值得等待，好物在路上！</view>
						<view v-else-if="orderDetailInfo.status == 3" class="state_time">心爱的宝贝已到货，快去领回家吧</view>
						<view v-else-if="orderDetailInfo.status == 5" class="state_time">好物记得分享给你的小伙伴哦~</view>
						<view v-else-if="orderDetailInfo.status == 10" class="state_time">订单已被主动取消~</view>
						<view v-else-if="orderDetailInfo.status == 11" class="state_time">超时订单已被取消，如需订购请重新下单</view>
					</template>
				</view>

			</view>

			<!-- 订单地址 -->
			<view class="box_address">

				<view class="address_png">
					<u-icon name="adress" custom-prefix="custom-icon" size="36"></u-icon>
				</view>

				<view class="address_name">

					<view class="name_telname">
						<text class="name_title u-line-1">{{addressInfo.name}}</text>
						<text>{{addressInfo.phone}}</text>
					</view>

					<view class="name_address">{{addressInfo.full_address}}</view>

				</view>

			</view>

			<!-- 商品信息 -->
			<view class="box_product">
				
				<view class="product_main" v-for="(item,index) in provideData" :key="index">
					
					<!-- 供应商 -->
					<view class="product_supplier">
					
						<view class="supplier_logo">
							<imageBox :imageUrl="item.provider_logo" width="36rpx" height="36rpx" shape="circle"></imageBox>
						</view>
					
						<view class="supplier_name">{{item.provider_name}}</view>
					
					</view>
					
					<!-- 商品信息 -->
					<view class="product_block" v-for="(children,childIndex) in item.product_list" :key="childIndex">
					
						<view class="product_img">
							<imageBox :imageUrl="children.image" width="160rpx" height="160rpx"></imageBox>
						</view>
					
						<view class="product_title">
							<view class="title_top">
								<view class="title_name">{{children.product_name}}</view>
								<view class="title_num">
									<view class="num_price font_family_din">￥{{children.per_pay_price}}</view>
									<view class="num_tops font_family_din">X {{children.num}}</view>
								</view>
							</view>
							<view class="title_suk">
					
								<view class="suk_name">{{children.suk}}</view>
					
								<view class="suk_button" v-if="children.refund_status !=0">
					
									<view class="button_color" v-if="children.refund_status==1" @click="jumpPage(0,index,childIndex)">
										{{children.refund_status_str}}</view>
					
									<view class="button_color" v-else-if="children.refund_status==11"
										@click="jumpPage(1,index,childIndex)">{{children.refund_status_str}}</view>
					
									<view class="button_name" v-else>{{children.refund_status_str}}
										{{children.refund_num !=0?'X'+children.refund_num:''}}</view>
					
								</view>
					
							</view>
						</view>
					
					</view>
						
					<!-- 商品总价 会员折扣方面 -->
					<view class="product_all">
					
						<view class="all_main">
					
							<view class="all_line">
					
								<view class="line_title">
									<view class="title_color">商品金额</view>
									<view class="title_tops"></view>
								</view>
					
								<view class="line_num font_family_din">
									￥{{item.price_info.goods_total_price}}
								</view>
					
							</view>
					
							<view class="all_line">
					
								<view class="line_title">
									<view class="title_color">运费</view>
									<view class="title_tops"></view>
								</view>
					
								<view class="line_num font_family_din">
									￥{{item.price_info.postage_amount}}
								</view>
					
							</view>
					
							<view class="all_line">
					
								<view class="line_title">
									<view class="title_color">会员折扣</view>
									<view class="title_tops"></view>
								</view>
					
								<view class="line_num line_color font_family_din">
									-￥{{item.price_info.deduction_amount}}
								</view>
					
							</view>
					
							<view class="all_line">
					
								<view class="line_title">
									<view class="title_color">优惠活动</view>
									<view class="title_tops"></view>
								</view>
					
								<view class="line_num line_color font_family_din">
									-￥{{item.price_info.promotion_amount}}
								</view>
					
							</view>
							
							<view class="all_line" style="margin-bottom: 24rpx;">
												
								<view class="line_title">
									<view class="title_color">备注</view>
									<view class="title_tops">{{item.mark}}</view>
								</view>
												
								<view class="line_num line_color font_family_din">
									
								</view>
												
							</view>
					
					
						</view>
					
						<view class="all_bottom">
							<view class="order_total">共 {{item.price_info.subtotal_product_num}} 件产品</view>
							<view class="order_all">合计：<text class="font_family_din" style="color: #E76234;">¥{{item.price_info.subtotal_amount}}</text>
							</view>
						</view>
					
					
					</view>
								
					
				</view>
				
			</view>
			
			<!-- 优惠劵 -->
			<view class="box_coupon">
				<view class="coupon_title">优惠劵</view>
				<view class="coupon_tops font_family_din">￥{{priceInfo.coupon_amount}}</view>
			</view>

			<!-- 订单编号创建时间等 -->
			<view class="box_message">

				<view class="message_num">
					<view class="num_info">
						<view class="info_name">订单编号：</view>
						<view class="info_tops img_png">{{orderDetailInfo.out_trade_no}}
						    <u-icon name="copy" custom-prefix="custom-icon" size="24" @click="copyBtn"></u-icon>
						</view>
					</view>
					<view class="num_info">
						<view class="info_name">下单时间：</view>
						<view class="info_tops">{{timeInfo.add_time}}</view>
					</view>
					<view class="num_info">
						<view class="info_name">创建时间：</view>
						<view class="info_tops">{{timeInfo.add_time}}</view>
					</view>

					<view class="num_info" v-if="timeInfo.pay_time.length !=0">
						<view class="info_name">付款时间：</view>
						<view class="info_tops">{{timeInfo.pay_time}}</view>
					</view>
					<view class="num_info" v-if="timeInfo.pay_type_str.length !=0">
						<view class="info_name">支付方式：</view>
						<view class="info_tops">{{timeInfo.pay_type_str}}</view>
					</view>
					<view class="num_info" v-if="timeInfo.delivery_time.length !=0">
						<view class="info_name">发货时间：</view>
						<view class="info_tops">{{timeInfo.delivery_time}}</view>
					</view>
					<view class="num_info" v-if="timeInfo.delivery_confirm_time.length !=0">
						<view class="info_name">收货时间：</view>
						<view class="info_tops">{{timeInfo.delivery_confirm_time}}</view>
					</view>
				</view>


				<view class="message_service" v-if="orderDetailInfo.status !=4">

					<button class="service_layer service_button" style="width: 350rpx;" open-type="contact" 
					    :session-from="'nickName=' + user.nickname + '|avatarUrl='+ user.avatar">
						<view class="layer_top">
							<u-icon name="sever" custom-prefix="custom-icon" size="36"></u-icon>
						</view>
						<view>在线客服</view>
					</button>

					<view class="service_layer" @click="serviceInfo(1)">
						<view class="layer_top">
							<u-icon name="phone2" custom-prefix="custom-icon" size="36"></u-icon>
						</view>
						<view>拨打电话</view>
					</view>

				</view>

				<view class="message_ok" v-else>

					<view class="ok_price">
						收入已到账：<text style="color:#E76234" class="font_family_din">￥{{priceInfo.income_amount}}</text>
					</view>

					<view class="ok_return">
						退款：<text style="color:#E76234" class="font_family_din">￥{{priceInfo.refund_amount}}</text>
					</view>

				</view>


			</view>

		</view>

		<view class="content_bottom" :style="phoneModel=='iPhone X'?'height: 160rpx;':''">

			<view class="bottom_all">
				合计：<text class="price_color font_family_din">¥ {{priceInfo.pay_amount}}</text>
			</view>

			<view class="bottom_button" v-if="orderDetailInfo.status==1">
				<view class="button_color" style="margin-right: 16rpx;" @click="cancelOrder">取消订单</view>
				<view class="button_color button_teShu" @click="paymentInfo">立即付款</view>
			</view>

			<view class="bottom_button" v-if="orderDetailInfo.status==2">
				<view class="button_color" style="margin-right: 16rpx;" v-if="orderDetailInfo.show_batch_refund_btn !=0" @click="batchRefund">批量退款</view>
				<view class="button_color button_teShu" @click="remindOrder">提醒发货</view>
			</view>

			<view class="bottom_button" v-if="orderDetailInfo.status==3">
				<view class="button_color" style="margin-right: 16rpx;" @click="seeLogistics">查看物流</view>
				<view class="button_color button_teShu" @click="deliveryOrder">确认收货</view>
			</view>

			<view class="bottom_button" v-if="orderDetailInfo.status==4 || orderDetailInfo.status==10">
				<view class="button_color" @click="deleteOrder">删除订单</view>
			</view>

		</view>

	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue';
	export default {
		components: {
			imageBox
		},
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
				timestamp: 60,
				orderId: '', //订单id
				addressInfo: {}, //地址信息
				orderDetailInfo: {}, //订单详情信息
				priceInfo: {}, //价格数据
				provideData:[],//供应商商品数据
				timeInfo: {}, //其他支付时间方式等
				providerInfo: {}, //供应商数据
			}
		},
		onShow() {
			this.getOrderDetail();
		},
		onLoad(option) {
			this.orderId = option.orderId;
		},
		methods: {

			//获取订单列表
			getOrderDetail() {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_MYORDERDETAIL({
					order_id: that.orderId,
				}).then(res => {
					that.addressInfo = res.data.address_info; //收货地址
					that.orderDetailInfo = res.data.order_detail_info; //订单数据
					that.provideData = res.data.provider_info; //商品数据
					that.priceInfo = res.data.price_info; //价格数据
					that.timeInfo = res.data.time_info; //其他时间
					that.providerInfo = res.data.provider_info; //供应商数据
					uni.hideLoading();
				});
			},

			//复制粘贴
			copyBtn() {
				let that = this;
				uni.setClipboardData({
					data: that.orderDetailInfo.out_trade_no,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						});
					}
				});
			},

			//支付
			paymentInfo() {
				let that = this;
				let obj = {
					total_pay_price: that.orderDetailInfo.pay_price,
					left_pay_second: that.timeInfo.left_pay_time,
					pay_out_trade_no: that.orderDetailInfo.pay_out_trade_no,
					out_trade_no: that.orderDetailInfo.out_trade_no,
					order_id: that.orderDetailInfo.id,
				}
				that.$jumpPage('/settings/payment/paymentPlatform', {
					orderData: JSON.stringify(obj),
					typePage: 3
				});
				that.$cache('orderId', that.orderId.toString());
				that.$cache('orderType', '3');
			},

			//查看物流
			seeLogistics() {
				let that = this;
				if (that.orderDetailInfo.delivery_split_count == 1) { //大于1多个物流  等1一个物流
					that.$jumpPage('/settings/message/logisticsNews', {
						orderId: that.orderId
					});
				} else {
					that.$jumpPage('/settings/message/multipleNews', {
						orderId: that.orderId
					});
				}
			},

			//删除订单
			deleteOrder() {
				let that = this;
				uni.showModal({
					content: '确定要删除订单吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERDEL({
								order_id: that.orderId,
							}).then(res => {
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								this.$cache('orderId', that.orderId.toString());
								this.$cache('orderType', '2');
								setTimeout(() => {
									that.$goback();
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//取消订单
			cancelOrder() {
				let that = this;
				uni.showModal({
					content: '确定取消订单吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERCANCEL({
								order_id: that.orderId,
							}).then(res => {
								uni.showToast({
									title: '取消成功',
									duration: 2000
								});
								setTimeout(() => {
									that.$goback();
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//提醒发货
			remindOrder() {
				let that = this;
				uni.showModal({
					content: '提醒发货',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERREMIND({
								order_id: that.orderId,
							}).then(res => {
								uni.showToast({
									title: '提醒成功',
									duration: 2000
								});
								setTimeout(() => {
									that.$goback();
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//确认收货订单
			deliveryOrder() {
				let that = this;
				uni.showModal({
					content: '确认收货?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERDELIVERY({
								order_id: that.orderId,
							}).then(res => {
								uni.showToast({
									title: '收货成功',
									duration: 2000
								});
								this.$cache('orderId', that.orderId.toString());
								this.$cache('orderType', '4');
								setTimeout(() => {
									that.$goback();
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//跳转设置
			jumpPage(val,index,childIndex) {
				let that = this;
				switch (val) {
					case 0: //订单申请退款
						that.$jumpPage('/pages/my/order/orderRefund', {
							typePage:0
						});
						that.$cache('orderId', that.orderId.toString());
						that.$cache('productId', that.provideData[index].product_list[childIndex].id.toString());
						break;
					case 1: //订单申请售后
						that.$jumpPage('/pages/my/order/orderType', {
							productInfo:JSON.stringify(that.provideData[index].product_list[childIndex]),typePage:1
						});
						that.$cache('orderId', that.orderId.toString());
						that.$cache('productId', that.provideData[index].product_list[childIndex].id.toString());
						break;
				}
			},
			
			//批量退款
			batchRefund(){
				let that = this;
				that.$jumpPage('/pages/my/order/selectProduct');
				that.$cache('orderId', that.orderId.toString());
			},

			//客服咨询 客服电话
			serviceInfo(val) {
				let that = this;
				switch (val) {
					case 0:
						break;
					case 1:
						uni.makePhoneCall({
							phoneNumber: "110"
						});
						break;
				}
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}
	
	
	button::after {
	  border: none !important;
	}

	.content_main {
		background-color: #EEEEEE;
		min-height: 100%;
		position: relative;

		.content_box {
			padding-bottom: 180rpx;

			.box_remind {
				height: 128rpx;
				width: 100%;
				padding: 24rpx 40rpx;
				display: flex;
				align-items: center;
				margin-bottom: 8rpx;
				background: #FFFFFF;

				.remind_state {

					.state_img {
						display: flex;
						align-items: center;
						margin-bottom: 8rpx;

						.state_title {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;
							margin-left: 24rpx;
						}

					}

					.state_time {
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #CCCCCC;
						margin-left: 60rpx;

						::v-deep.u-countdown {
							width: 125rpx;
						}

					}
				}

			}

			.box_address {
				height: 140rpx;
				width: 100%;
				margin-bottom: 8rpx;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				padding: 31rpx 40rpx;

				.address_png {
					width: 36rpx;
					height: 36rpx;
				}

				.address_name {
					margin-left: 24rpx;

					.name_telname {
						height: 40rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						margin-bottom: 8rpx;
						align-items: center;
						display: flex;

						.name_title {
							width: 112rpx;
							margin-right: 16rpx;
						}

					}

					.name_address {
						height: 30rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						line-clamp: 1;
						-webkit-box-orient: vertical;
					}

				}

			}

			.box_product {
				width: 100%;
				margin-bottom: 8rpx;
				
				.product_main{
					
					
					.product_supplier {
						width: 100%;
						height: 88rpx;
						display: flex;
						align-items: center;
						background: #FFFFFF;
						padding: 0 40rpx;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					
						.supplier_logo {
							width: 36rpx;
							height: 36rpx;
							border-radius: 50rpx;
					
							image {
								width: 36rpx;
								height: 36rpx;
							}
					
						}
					
						.supplier_name {
							height: 37rpx;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-left: 16rpx;
						}
					
					}
					
					.product_block {
						width: 100%;
						height: 208rpx;
						padding-top: 23rpx;
						padding-bottom: 25rpx;
						padding-left: 24rpx;
						padding-right: 24rpx;
						display: flex;
						background: #FFFFFF;
					
						.product_img {
							width: 160rpx;
							height: 160rpx;
					
							image {
								width: 100%;
								height: 100%;
							}
					
						}
					
						.product_title {
							width: calc(100% - 160rpx);
							padding-left: 24rpx;
							height: 160rpx;
					
							.title_top {
								display: flex;
								align-items: center;
								justify-content: space-between;
					
								.title_name {
									width: 320rpx;
									height: 80rpx;
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #333333;
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									line-clamp: 2;
									-webkit-box-orient: vertical;
					
								}
					
								.title_num {
					
									.num_price {
										height: 40rpx;
										font-size: 28rpx;
										font-weight: bold;
										color: #666666;
										margin-bottom: 16rpx;
									}
					
									.num_tops {
										height: 28rpx;
										font-size: 24rpx;
										font-weight: bold;
										color: #666666;
										text-align: right;
									}
					
					
								}
					
							}
					
							.title_suk {
								margin-top: 22rpx;
								display: flex;
								align-items: center;
								justify-content: space-between;
					
								.suk_name {
									font-size: 24rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
								}
					
								.suk_button {
					
									.button_color {
										width: 160rpx;
										height: 50rpx;
										background: #212121;
										text-align: center;
										line-height: 50rpx;
										font-size: 24rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #FFFFFF;
										margin-top: 7rpx;
									}
					
									.button_name {
										height: 33rpx;
										font-size: 24rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #E76234;
									}
					
								}
					
							}
					
					
					
						}
					
					}
					
					.product_all {
						width: 100%;
						background: #FFFFFF;
						padding: 24rpx;
						margin-top: 8rpx;
						margin-bottom: 8rpx;
					
						.all_main {
							border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					
							.all_line {
								display: flex;
								justify-content: space-between;
								height: 37rpx;
								align-items: center;
								margin-bottom: 16rpx;
					
								.line_title {
									display: flex;
									height: 37rpx;
					
									.title_color {
										height: 37rpx;
										font-size: 26rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #333333;
										margin-right: 40rpx;
										width: 104rpx;
										text-align: right;
									}
					
									.title_tops {
										height: 37rpx;
										font-size: 26rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #999999;
									}
					
								}
					
								.line_num {
									height: 37rpx;
									font-size: 26rpx;
									font-weight: bold;
									color: #333333;
								}
					
								.line_color {
									color: #E76234;
								}
					
							}
					
						}
					
						.all_bottom {
							height: 37rpx;
							width: 100%;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							margin-top: 24rpx;
					
							.order_total {
								height: 37rpx;
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #999999;
								margin-right: 24rpx;
							}
					
					
							.order_all {
								height: 37rpx;
								font-size: 26rpx;
								font-weight: bold;
								color: #333333;
					
							}
					
						}
					
					}
					
					
				}

			}

			.box_coupon {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				padding: 0 24rpx;
				background: #FFFFFF;
				margin-bottom: 8rpx;
				justify-content: space-between;

				.coupon_title {
					height: 37rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-right: 24rpx;
				}

				.coupon_tops {
					height: 37rpx;
					font-size: 26rpx;
					font-weight: bold;
					color: #333333;
				}

			}

			.box_message {
				background: #FFFFFF;

				.message_num {
					padding: 24rpx 24rpx 0px 24rpx;

					.num_info {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-bottom: 23rpx;
						height: 37rpx;
						display: flex;
						align-items: center;


						.info_name {
							height: 37rpx;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 40rpx;
						}

						.info_tops {
							height: 37rpx;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;


							::v-deep.u-icon{
								margin-left: 21rpx;
							}

						}


						.img_png {
							display: flex;
							align-items: center;
						}

					}

				}

				.message_service {
					width: 100%;
					height: 88rpx;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 20rpx 0;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);

					.service_layer:nth-child(1) {
						border-right: 1rpx solid #CCCCCC;
					}

					.service_layer {
						width: 352rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;

						.layer_top {
							display: flex;
							align-items: center;
							
							::v-deep.u-icon{
								margin-right: 10rpx;
							}

						}


					}
					
					.service_button{
						line-height: 1.5;
						background: #fff;
						border-radius: 0;
					}



				}

				.message_ok {
					width: 100%;
					height: 88rpx;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);
					padding: 0 24rpx;

					.ok_price {
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						margin-right: 60rpx;
					}

					.ok_return {
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}

				}

			}

		}

		.content_bottom {
			width: 100%;
			height: 100rpx;
			position: absolute;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 26rpx;
			position: fixed;
			background: #fff;

			.bottom_all {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;

				.price_color {
					font-size: 26rpx;
					font-weight: bold;
					color: #E76234;
				}



			}

			.bottom_button {
				display: flex;

				.button_color {
					width: 180rpx;
					height: 66rpx;
					text-align: center;
					line-height: 60rpx;
					text-align: center;
					border: 1rpx solid #333333;
				}

				.button_teShu {
					background: #333333;
					color: #FFFFFF;
				}

			}

		}

	}
</style>
