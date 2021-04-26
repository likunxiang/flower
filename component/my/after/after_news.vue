<template>
	<view class="order_block" v-if="afterData.length !=0">
		<view class="order_item" v-for="(item,index) in afterData" :key="index">
			<view class="order_header">
				<template v-if="currentIsok==1">
					<view class="order_time">
						<view class="order_time_detail">
							<view class="title">申请时间:</view>
							<view class="specific">{{item.add_time}}</view>
						</view>
						<view class="order_status">{{item.status_str}}</view>
					</view>
					<view class="order_time">
						<view class="order_time_detail">
							<view class="title">退款编号:</view>
							<view class="specific">{{item.order.out_trade_no}}</view>
							<view class="icon_copy" @click="copyBtn(1,index)">
								<u-icon name="copy" custom-prefix="custom-icon" size="24"></u-icon>
							</view>
						</view>
					</view>
				</template>

				<template v-if="currentOn==2">

					<view class="order_time">
						<view class="order_time_detail">
							<view class="title">处理时间:</view>
							<view class="specific">{{item.add_time}}</view>
						</view>
						<view class="order_status">{{item.status_str}}</view>
					</view>
					<view class="order_time">
						<view class="order_time_detail">
							<view class="title">退款编号:</view>
							<view class="specific">{{item.order.out_trade_no}}</view>
							<view class="icon_copy" @click="copyBtn(1,index)">
								<u-icon name="copy" custom-prefix="custom-icon" size="24"></u-icon>
							</view>
						</view>
					</view>

				</template>

			</view>
			<view class="order_supplier">

				<view class="supplier_logo">
					<imageBox :imageUrl="item.provider_logo" width="36rpx" height="36rpx" shape="circle"></imageBox>
				</view>

				<view class="supplier_name">{{item.provider_name}}</view>

			</view>
			<view class="order_main">
				<view :class="'goods_item ' + (childIndex < item.product.length - 1?'mb_16':'')"
					v-for="(childItem,childIndex) in item.product" :key="childIndex">
					<view class="image">
						<image :src="childItem.image"></image>
					</view>
					<view class="goods_info">
						<view class="name_num_price">
							<view class="name u-line-2">{{childItem.product_name}}</view>
							<view class="num_price">
								<view class="price font_family_din">￥{{childItem.per_pay_price}}</view>
								<view class="num font_family_din">X {{childItem.refund_num}}</view>
							</view>
						</view>
						<view class="attr">
							{{childItem.suk}}
						</view>

					</view>
				</view>
			</view>
			<view class="order_footer">
				<view class="order_footer_date">
					<view class="total_num">共 {{item.product.length}} 件产品</view>
					<view class="total_price">合计:￥{{item.refund_amount}}</view>
				</view>
				<view class="order_footer_operation">
					<block>
						<view class="btn_bottom_empty mr_16" @click="revokeOrder(index)"
							v-if="item.refund_status==0 || item.refund_status==1">撤销申请</view>
						<view class="btn_bottom_empty mr_16" @click="deleteOrder(index)" v-else>删除申请</view>
						<view class="btn_bottom_full" @click="jumpPage(index)">查看详情</view>
					</block>
				</view>
			</view>
		</view>
	</view>

	<view class="order_img" v-else>

		<view class="img_png">
			<image src="/static/images/my/order/order_empty.png"></image>
			<view class="img_title">暂时没有售后订单</view>
		</view>

	</view>


</template>

<script>
	import imageBox from '@/component/common/imageBox.vue';
	export default {
		components: {
			imageBox
		},
		props: ["afterData", "currentIsok", "currentOn"],
		data() {
			return {

			}
		},
		methods: {

			//复制粘贴
			copyBtn(val, index) {
				let that = this;
				let content = "";
				switch (val) {
					case 0:
						content = that.afterData[index].user.nickname;
						break;
					case 1:
						content = that.afterData[index].order.out_trade_no;
						break;
				}
				uni.setClipboardData({
					data: content,
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

			//撤销申请售后
			revokeOrder(val) {
				let that = this;
				uni.showModal({
					content: '确定撤销此次退款申请吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYREFUNDCANCEL({
								refund_id: that.afterData[val].id,
							}).then(res => {
								uni.showToast({
									title: '撤销申请成功'
								});
								that.$emit("revokeOrder", val)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//删除售后记录
			deleteOrder(val) {
				let that = this;
				uni.showModal({
					content: '确认删除此次退款申请吗?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYREFUNDDEL({
								refund_id: that.afterData[val].id,
							}).then(res => {
								uni.showToast({
									title: '删除成功'
								});
								that.$emit("deleteInfo", val)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//跳转订单详情
			jumpPage(val) {
				let that = this;
				that.$jumpPage('/pages/my/after/afterDetails', {
					refundId: that.afterData[val].id
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.order_block {
		background: #EEEEEE;
		padding: 16rpx 0;


		.order_item {
			padding: 24rpx;
			padding-bottom: 0rpx;
			background: #FFFFFF;
			margin-bottom: 16rpx;



			.order_header {
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

				.order_time {
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

			.order_supplier {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				background: #FFFFFF;
				padding: 0 16rpx;

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

			.order_main {
				padding-top: 17rpx;
				padding-bottom: 24rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

				.mb_16 {
					margin-bottom: 16rpx;
				}

				.goods_item {
					display: flex;

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

						.attr {
							font-size: 24rpx;
							color: #999999;
						}
					}
				}
			}

			.order_footer {
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
					}
				}

				.order_footer_operation {

					display: flex;
					justify-content: flex-end;
					align-items: center;

					.mr_16 {
						margin-right: 16rpx;
					}

					.btn_bottom_empty {
						margin-top: 24rpx;
						width: 160rpx;
						height: 50rpx;
						line-height: 48rpx;
						text-align: center;
						background: #FFFFFF;
						border: 1rpx solid #212121;
						font-size: 24rpx;
						color: #333333;
					}

					.inventory {
						margin-top: 24rpx;
						font-size: 26rpx;
						color: #E76234;
						margin-right: 16rpx;
					}

					.btn_bottom_full {
						margin-top: 24rpx;
						width: 160rpx;
						height: 50rpx;
						background: #212121;
						line-height: 50rpx;
						text-align: center;
						font-size: 24rpx;
						color: #FFFFFF;
					}

					.income {
						margin-top: 24rpx;
						font-size: 26rpx;
						color: #E76234;

						.income_text {}

						.income_num {
							font-weight: bold;
						}
					}


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
		background: #FFFFFF;

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
