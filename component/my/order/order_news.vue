<template>
	<view v-if="orderData.length !=0" class="order_color">
		<view class="order_main" v-for="(item,index) in orderData" :key="index">

			<!-- 头部 -->
			<view class="order_top">

				<view class="top_line">
					<view class="top_num">
						<view class="name_title">下单时间：</view>
						<view class="name_tops">{{item.add_time}}</view>
					</view>
					<view class="top_state">{{item.status_str}}</view>
				</view>

				<view class="top_line">
					<view class="top_num">
						<view class="name_title">订单编号：</view>
						<view class="name_tops">{{item.out_trade_no}}</view>
						<u-icon name="copy" custom-prefix="custom-icon" size="24" @click="copyBtn(index)"></u-icon>
					</view>
				</view>

			</view>

			<!-- 商品信息 -->
			<view class="order_product" @click="jumpPage(index)">
				
				<view class="order_item" v-for="(children,childIndex) in item.provider_list" :key="childIndex">
					
					<!-- 供应商 -->
					<view class="order_supplier">
					
						<view class="supplier_logo">
							<imageBox :imageUrl="children.provider_logo" width="36rpx" height="36rpx" shape="circle"></imageBox>
							<!-- <image src="/static/images/comm_supp.png"></image> -->
						</view>
					
						<view class="supplier_name">{{children.provider_name}}</view>
					
					</view>
					
					<!-- 商品信息 -->
					<view class="order_block" v-for="(tempItem,tempIndex) in children.order_product" :key="tempItem">
						
						<view class="product_img">
							<imageBox :imageUrl="tempItem.image" width="160rpx" height="160rpx"></imageBox>
						</view>
						
						<view class="product_title">
							<view class="title_top">
								<view class="title_name">{{tempItem.product_name}}</view>
								<view class="title_num">
									<view class="num_price font_family_din">￥{{tempItem.price}}</view>
									<view class="num_tops font_family_din">X {{tempItem.num}}</view>
								</view>
							</view>
							<view class="title_suk">{{tempItem.suk}}</view>
						</view>
						
					</view>
					
				</view>
				
			</view>

			<view class="order_subtotal">
				<view class="order_total">共 {{item.total_product_num}} 件产品</view>
				<view class="order_all">合计：<text class="font_family_din">¥ {{item.pay_amount}}</text></view>
			</view>

			<view class="order_bottom">

				<template v-if="item.status==1">
					<view class="button_click" @click="cancelOrder(index)">取消订单</view>
					<view class="button_click button_color" @click="paymentInfo(index)">付款</view>
				</template>

				<template v-else-if="item.status==2">
					<view class="button_click" @click="jumpPage(index)">申请退款</view>
					<view class="button_click button_color" @click="remindOrder(index)">提醒发货</view>
				</template>

				<template v-else-if="item.status==3">
					<view class="button_click" @click="seeLogistics(index)">查看物流</view>
					<view class="button_click button_color" @click="deliveryOrder(index)">确认收货</view>
				</template>
				
				<template v-else-if="item.status==4">
					<view class="button_click" @click="jumpPage(index)">申请售后</view>
					<view class="button_click button_color" @click="deleteOrder(index)">删除订单</view>
				</template>

				<template v-else-if="item.status==5 || item.status==10 || item.status==13">
					<view class="button_click button_color" @click="deleteOrder(index)">删除订单</view>
				</template>


			</view>

		</view>

	</view>

	<view v-else style="height: 100%;">
		<view class="order_img">

			<view class="img_png">
				<image src="/static/images/my/order/icon_book.png"></image>
				<view class="img_title">一贫如洗的订单</view>
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
		props: ["orderData", "current"],
		data() {
			return {

			}
		},
		methods: {

			//复制粘贴
			copyBtn(index) {
				let that = this;
				uni.setClipboardData({
					data: that.orderData[index].out_trade_no,
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
			paymentInfo(index) {
				let that = this;
				let obj = {
					total_pay_price: that.orderData[index].pay_amount,
					left_pay_second: that.orderData[index].left_pay_time,
					pay_out_trade_no: that.orderData[index].pay_out_trade_no,
					out_trade_no: that.orderData[index].out_trade_no,
					order_id: that.orderData[index].id,
				};
				that.$jumpPage('/settings/payment/paymentPlatform', {
					orderData: JSON.stringify(obj)
				});
				this.$cache('orderId', that.orderData[index].id.toString());
				this.$cache('orderType', '3');
			},

			//删除订单
			deleteOrder(index) {
				let that = this;
				uni.showModal({
					content: '确定要删除订单吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERDEL({
								order_id: that.orderData[index].id,
							}).then(res => {
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								setTimeout(() => {
									that.$emit("deleteInfo", index)
								}, 1500)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//取消订单
			cancelOrder(index) {
				let that = this;
				uni.showModal({
					content: '确定取消订单吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERCANCEL({
								order_id: that.orderData[index].id,
							}).then(res => {
								uni.showToast({
									title: '订单取消成功',
									duration: 2000
								});
								setTimeout(() => {
									that.$emit("cancelInfo", index)
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//确认收货订单
			deliveryOrder(index) {
				let that = this;
				uni.showModal({
					content: '确定收到货物了吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERDELIVERY({
								order_id: that.orderData[index].id,
							}).then(res => {
								uni.showToast({
									title: '确认收货成功',
									duration: 2000
								});
								setTimeout(() => {
									that.$emit("deliveryInfo", index)
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//提醒发货
			remindOrder(index) {
				let that = this;
				uni.showModal({
					content: '提醒发货',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYORDERREMIND({
								order_id: that.orderData[index].id,
							}).then(res => {
								uni.showToast({
									title: '提醒发货成功',
									duration: 2000
								});
								setTimeout(() => {
									that.$emit("refreshInfo")
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//查看物流
			seeLogistics(val) {
				let that = this;
				if (that.orderData[val].delivery_split_count == 1) { //大于1多个物流  等1一个物流
					this.$jumpPage('/settings/message/logisticsNews', {
						orderId: that.orderData[val].id
					});
				} else {
					this.$jumpPage('/settings/message/multipleNews', {
						orderId: that.orderData[val].id
					});
				}

			},

			//跳转订单详情
			jumpPage(val) {
				let that = this;
				this.$jumpPage('/pages/my/order/orderDetails', {
					orderId: that.orderData[val].id
				});
				this.$cache('orderStatus', that.current.toString());
			},

		}
	}
</script>

<style lang="scss" scoped>
	.order_color {
		background: #EEEEEE;
		padding: 16rpx 0;

		.order_main {
			width: 100%;
			background: #FFFFFF;
			margin-top: 16rpx;
			padding: 0 24rpx;
			padding-bottom: 24rpx;

			.order_top {
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				height: 138rpx;
				padding: 24rpx 0;

				.top_line {
					height: 37rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 16rpx;

					.top_num {
						display: flex;
						align-items: center;


						.name_title {
							height: 37rpx;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 40rpx;
						}

						.name_tops {
							height: 37rpx;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-right: 16rpx;
						}

					}

					.top_state {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E76234;
					}
				}



			}

			.order_product {
				width: 100%;
				
				.order_item{
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					
					.order_supplier {
						width: 100%;
						height: 88rpx;
						display: flex;
						align-items: center;
					
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
					
					.order_block {
						width: 100%;
						height: 208rpx;
						padding-top:23rpx;
						padding-bottom:25rpx;
						display: flex;
						margin-bottom: 8rpx;
						
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
							
							.title_top{
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
									
									.num_price{
										height: 40rpx;
										font-size: 28rpx;
										font-weight: bold;
										color: #666666;
										margin-bottom: 16rpx;
									}
									
									.num_tops{
										height: 28rpx;
										font-size: 24rpx;
										font-weight: bold;
										color: #666666;
										text-align: right;
									}
												
													
								}
								
							}
							
							.title_suk{
								margin-top: 22rpx;
								height: 33rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #999999;
							}
						
					
						
						}
						
					}
					
					
				}
				

			}

			.order_subtotal {
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
				
				.order_total{
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

			.order_bottom {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-top: 24rpx;

				.button_click {
					width: 130rpx;
					height: 50rpx;
					border: 1px solid #333333;
					line-height: 45rpx;
					font-size: 24rpx;
					border-radius: 0;
					text-align: center;
					margin-left: 24rpx;
					font-size: 24rpx;
					color: #333333;
				}

				.button_color {
					color: #FFFFFF;
					background: #333333;
				}

			}


		}

	}

	.order_main:nth-child(1) {
		margin-top: 0;
	}

	.order_img {
		width: 100%;
		height: 100%;
		display: flex;
		justify-items: center;
		align-items: center;

		.img_png {
			width: 100%;
			text-align: center;

			image {
				width: 160rpx;
				height: 160rpx;

			}

			.img_title {
				width: 100%;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				margin: 0 auto;
				margin-top: 80rpx;
			}

		}





	}
</style>
