<template>
	<view class="page">
		<orderStatus :status="orderDetail.order_detail_info.status" :statusStr="orderDetail.order_detail_info.status_str"></orderStatus>

		<view class="order_address">
			<view class="icon">
				<u-icon name="adress" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
			</view>
			<view class="order_address_info">
				<view class="user_info">
					<view class="name">{{orderDetail.address_info.name}}</view>
					<view class="tel">{{orderDetail.address_info.phone}}</view>
				</view>
				<view class="address_detail">{{orderDetail.address_info.full_address}}</view>
			</view>
		</view>

		<view class="goods_item " v-for="(goods,index) in orderDetail.product_list" :key="index">
			<view class="image">
				<image :src="goods.image" mode="aspectFill"></image>
			</view>
			<view class="goods_info">
				<view class="name_num_price">
					<view class="name u-line-2">{{goods.product_name}}</view>
					<view class="num_price font_family_din">
						<view class="price">￥{{goods.product_attr_unique_price}}</view>
						<view class="num">X {{goods.num}}</view>
					</view>
				</view>
				<view class="attr_refund">
					<view class="attr">
						{{goods.suk}}
					</view>
					<view class="refund_status" v-if="goods.refund_status_str > 1">{{goods.refund_status_str}}</view>
				</view>

			</view>
		</view>

		<view class="remark">
			<view class="title">备注</view>
			<view class="remark_text" v-if="orderDetail.order_detail_info.mark">{{orderDetail.order_detail_info.mark}}</view>
			<view class="remark_text_no" v-else>无备注</view>
		</view>

		<view class="order_money">
			<view class="money_detail">
				<view class="money_item mb_16">
					<view class="left">
						<view class="title">商品金额</view>
					</view>
					<view class="right">
						<view class="desc">总价</view>
						<view class="num font_family_din">￥{{orderDetail.price_info.total_product_price}}</view>
					</view>
				</view>
				<view class="money_item mb_16" v-if="orderDetail.price_info.postage_price">
					<view class="left">
						<view class="title">运费</view>
					</view>
					<view class="right">
						<view class="desc">快递</view>
						<view class="num font_family_din">￥{{orderDetail.price_info.postage_price}}</view>
					</view>
				</view>
				<view class="money_item mb_16" v-if="orderDetail.price_info.deduction_price">
					<view class="left">
						<view class="title">会员折扣</view>
					</view>
					<view class="right">
						<view class="desc">{{orderDetail.price_info.deduction_str}}</view>
						<view class="num color_E76234 font_family_din">-￥{{orderDetail.price_info.deduction_price}}</view>
					</view>
				</view>
				<view class="money_item" v-if="orderDetail.price_info.coupon_price">
					<view class="left">
						<view class="title">优惠券</view>
					</view>
					<view class="right">
						<view class="desc">{{orderDetail.price_info.promotion_price}}</view>
						<view class="num color_E76234 font_family_din">-￥{{orderDetail.price_info.coupon_price}}</view>
					</view>
				</view>
			</view>

			<view class="money_total">
				<view class="order_footer_date">
					<view class="total_num">共 {{orderDetail.product_list.num}} 件产品</view>
					<view class="total_price">
						<text>实付款:</text>
						<text class="num font_family_din">￥{{orderDetail.price_info.pay_price}}</text>
					</view>
				</view>
			</view>

		</view>

		<!-- 售后才有的 -->
		<view class="order_refund_box">
			<view class="order_refund">
				<view class="order_refund_time">
					<view class="order_time_detail">
						<view class="title">订单编号:</view>
						<view class="specific">{{orderDetail.order_detail_info.out_trade_no}}</view>
						<view class="icon_copy" @click="copyText('17325573041')">
							<u-icon name="copy" custom-prefix="custom-icon" size="24" color="#212121"></u-icon>
						</view>
					</view>
				</view>
				<view class="order_refund_time">
					<view class="order_time_detail">
						<view class="title">下单时间:</view>
						<view class="specific">{{orderDetail.time_info.add_time_format}}</view>
					</view>
				</view>
				<view class="order_refund_time">
					<view class="order_time_detail">
						<view class="title">付款时间:</view>
						<view class="specific">{{orderDetail.time_info.pay_time_format}}</view>
					</view>
				</view>
				<view class="order_refund_time">
					<view class="order_time_detail">
						<view class="title">支付方式:</view>
						<view class="specific">{{orderDetail.time_info.pay_type_str}}</view>
					</view>
				</view>
				<view class="order_refund_time">
					<view class="order_time_detail">
						<view class="title">发货时间:</view>
						<view class="specific">{{orderDetail.time_info.delivery_time_format}}</view>
					</view>
				</view>
				<view class="order_refund_time">
					<view class="order_time_detail">
						<view class="title">收货时间:</view>
						<view class="specific">{{orderDetail.time_info.delivery_confirm_time_format}}</view>
					</view>
				</view>

			</view>

			<view class="refund_total">
				<view class="order_footer_date">
					<view class="total_price" style="margin-right: 60rpx;">
						<text>收入已到账:</text>
						<text class="num font_family_din">￥{{orderDetail.order_detail_info.income_price}}</text>
					</view>
					<view class="total_price">
						<text>退款:</text>
						<text class="num font_family_din">￥{{orderDetail.order_detail_info.refund_price}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 售后才有的 end -->

		<view class="page_footer">
			<view :class="'footer ' + (phoneModel?'x_class':'')">
				<view class="left">
					<text>合计:</text>
					<text class="num font_family_din">￥{{orderDetail.price_info.total_price}}</text>
				</view>
				<view class="right">
					<!-- <view class="btn_bottom_empty mr_16" @click="$toUrl('/agency/refundDetail/refundDetail',{id:'666'})">查看退款详情</view>
					<view class="btn_bottom_full">删除订单</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import orderStatus from '@/agency/components/orderStatus.vue'
	export default {
		data() {
			return {
				orderId: '',
				phoneModel: uni.getStorageSync('phoneModel'),
				orderDetail: {}, // 订单信息
			};
		},
		onLoad(options) {
			this.orderId = this.$Route.query.id;
			this.getOrderDetail();
		},
		components: {
			orderStatus: orderStatus
		},
		methods: {
			
			//获取订单列表
			getOrderDetail() {
				let that = this;
				that.$api.my.API_MYORDERDETAIL({
					order_id: this.orderId,
				}).then(res => {
					this.orderDetail = res.data;
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.page {
		padding-top: 1rpx;
		padding-bottom: 154rpx;

		.page_footer {
			position: fixed;
			left: 0rpx;
			width: 100%;
			height: 114rpx;
			bottom: 0rpx;

			.footer {
				position: absolute;
				bottom: 0rpx;
				left: 0rpx;
				width: 100%;
				height: 114rpx;
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				padding: 24rpx;

				.mr_16 {
					margin-right: 16rpx;
				}

				.left {
					flex-grow: 0;
					flex-shrink: 0;
					font-size: 26rpx;
					color: #666666;
					padding-top: 12rpx;
					.num {
						color: #E76234;
						font-weight: 600;
					}
				}

				.right {
					flex-grow: 1;
					display: flex;
					justify-content: flex-end;

					.btn_bottom_empty {
						width: 160rpx;
						height: 66rpx;
						line-height: 64rpx;
						text-align: center;
						background: #FFFFFF;
						border: 1rpx solid #212121;
						font-size: 24rpx;
						color: #333333;
					}

					.btn_bottom_full {
						width: 160rpx;
						height: 66rpx;
						background: #212121;
						line-height: 66rpx;
						text-align: center;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

			}

			.x_class {
				height: 144rpx;
			}
		}

		.order_status {
			padding: 24rpx 40rpx;
			background: #FFFFFF;
			display: flex;
			margin-bottom: 8rpx;

			.icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 24rpx;
			}

			.order_status_info {
				.status {
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 8rpx;
				}

				.desc {
					font-size: 22rpx;
					color: #CCCCCC;
				}
			}
		}

		.order_address {
			padding: 32rpx 40rpx;
			background: #FFFFFF;
			display: flex;
			margin-bottom: 8rpx;
			align-items: center;

			.icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 24rpx;
			}

			.order_address_info {
				.user_info {
					font-size: 28rpx;
					color: #333333;
					display: flex;
					margin-bottom: 8rpx;

					.name {
						margin-right: 8rpx;
					}
				}

				.address_detail {
					font-size: 22rpx;
					color: #666666;
				}
			}
		}

		.goods_item {
			display: flex;
			background: #FFFFFF;
			padding: 24rpx;
			margin-bottom: 8rpx;

			.image {
				flex-grow: 0;
				flex-shrink: 0;
				width: 160rpx;
				height: 160rpx;
				margin-right: 24rpx;

				image {
					width: 100%;
					height: 100%;
					background: #CCCCCC;
				}
			}

			.goods_info {
				flex-grow: 1;

				.name_num_price {
					display: flex;
					line-height: 50rpx;
					margin-bottom: 22rpx;

					.name {
						width: 320rpx;
						font-size: 28rpx;
						color: #333333;
						margin-right: 16rpx;
					}

					.num_price {
						text-align: right;
						flex: 1;

						.price {
							font-size: 28rpx;
							font-weight: bold;
							color: #666666;
						}

						.num {
							font-size: 24rpx;
							font-weight: bold;
							color: #666666;
						}
					}
				}

				.attr_refund {
					display: flex;

					.attr {
						flex-grow: 1;
						font-size: 24rpx;
						color: #999999;
					}

					.refund_status {
						flex-grow: 0;
						flex-shrink: 0;
						font-size: 24rpx;
						color: #E76234;
					}
				}

			}
		}

		.remark {
			display: flex;
			padding: 24rpx;
			font-size: 26rpx;
			color: #333333;
			background: #FFFFFF;
			margin-bottom: 8rpx;

			.title {
				margin-right: 24rpx;
				flex-grow: 0;
				flex-shrink: 0;
			}

			.remark_text_no {
				color: #CCCCCC;
			}
		}

		.order_money {
			padding: 0 24rpx;
			background: #FFFFFF;
			margin-bottom: 8rpx;

			.money_detail {
				padding: 24rpx 0;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

				.mb_16 {
					margin-bottom: 16rpx;
				}

				.money_item {
					display: flex;

					.left {
						flex-grow: 0;
						flex-shrink: 0;
						text-align: right;

						.title {
							font-size: 26rpx;
							color: #333333;
							width: 104rpx;

							margin-right: 40rpx;
						}
					}

					.right {
						flex-grow: 1;
						display: flex;

						.desc {
							flex-grow: 1;
							font-size: 26rpx;
							color: #999999;
						}

						.num {
							flex-grow: 0;
							flex-shrink: 0;
							font-size: 26rpx;
							color: #333333;
							font-weight: bold;
						}

						.color_E76234 {
							color: #E76234;
						}
					}

				}
			}

			.money_total {
				padding: 24rpx 0;

				.order_footer_date {
					display: flex;
					justify-content: flex-end;

					.total_num {
						font-size: 26rpx;
						color: #999999;
						margin-right: 24rpx;
					}

					.total_price {
						font-size: 26rpx;
						color: #333333;

						.num {
							font-weight: bold;
							color: #E76234;
						}
					}
				}
			}
		}

		.order_refund_box {
			padding: 0 24rpx;
			background: #FFFFFF;

			.order_refund {
				padding: 24rpx 0;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

				.order_refund_time {
					display: flex;
					align-items: center;
					flex-grow: 1;
					margin-bottom: 16rpx;

					.order_time_detail {
						display: flex;
						flex-grow: 1;

						.title {
							font-size: 26rpx;
							color: #333333;
							margin-right: 40rpx;
						}

						.specific {
							font-size: 26rpx;
							color: #999999;
						}

						.icon_copy {
							width: 24rpx;
							height: 24rpx;
							margin-left: 16rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}

					.order_status {
						flex-grow: 0;
						flex-shrink: 0;
						font-size: 26rpx;
						color: #E76234;
						font-weight: 600;
					}
				}
			}

			.refund_total {
				padding: 24rpx 0;

				.order_footer_date {
					display: flex;
					justify-content: flex-end;

					.total_num {
						font-size: 26rpx;
						color: #999999;
						margin-right: 24rpx;
					}

					.total_price {
						font-size: 26rpx;
						color: #666666;

						.num {
							font-weight: bold;
							color: #E76234;
						}
					}
				}
			}
		}


	}
</style>
