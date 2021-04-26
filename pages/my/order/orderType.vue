<template>
	<view class="content_main">

		<u-navbar title="售后类型" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="order_block">

				<view class="product_img">
					<imageBox :imageUrl="productInfo.image" width="160rpx" height="160rpx"></imageBox>
				</view>

				<view class="product_title">
					<view class="title_top">
						<view class="title_name">{{productInfo.product_name}}</view>
						<view class="title_num">
							<view class="num_price font_family_din">￥{{productInfo.per_pay_price}}</view>
							<view class="num_tops font_family_din">X {{productInfo.num}}</view>
						</view>
					</view>
					<view class="title_suk">{{productInfo.suk}}</view>
				</view>

			</view>

			<view class="order_type">

				<view class="type_line" style="border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);" @click="jumpPage(0)">

					<view class="line_name">
						<view class="name_title">我要退款</view>
						<view class="name_tops">没收到货或与商家协商只退款</view>
					</view>

					<view class="line_png">
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#CCCCCC"></u-icon>
					</view>

				</view>

				<view class="type_line" @click="jumpPage(1)">

					<view class="line_name">
						<view class="name_title">退款退货</view>
						<view class="name_tops">确认货物状态进行退款</view>
					</view>

					<view class="line_png">
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#CCCCCC"></u-icon>
					</view>

				</view>

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
				productId: '', //商品id
				productInfo:[],//商品详情
				loading: false, //加载动画
			}
		},
		onLoad(option) {
			this.productId = this.$cache('productId');//商品id
			if(option.productInfo){
				this.productInfo =JSON.parse(option.productInfo);
				this.productInfo.image=decodeURIComponent(this.productInfo.image)
			}
		},
		methods: {

			//跳转售后退款
			jumpPage(val) {
				let that = this;
				switch (val) {
					case 0:
						that.$jumpPage('/pages/my/order/orderRefund', {
							typePage: 0
						},"replace");
						break;
					case 1:
						that.$jumpPage('/pages/my/order/orderRefund', {
							typePage: 1
						},"replace");
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

	.content_main {
		background-color: #EEEEEE;
		min-height: 100%;
		position: relative;

		.content_box {

			.order_block {
				width: 100%;
				height: 208rpx;
				padding-top: 23rpx;
				padding-bottom: 25rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				margin-bottom: 8rpx;
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
						height: 33rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}



				}

			}

			.order_type {
				height: 180rpx;
				width: 100%;
				background: #FFFFFF;

				.type_line {
					height: 90rpx;
					display: flex;
					align-items: center;
					padding-left: 60rpx;
					padding-right: 40rpx;
					justify-content: space-between;

					.line_name {
						display: flex;

						.name_title {
							height: 40rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 32rpx;
						}

						.name_tops {
							height: 40rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}

					}

					.line_png {
						width: 24rpx;
						height: 24rpx;

					}

				}

			}
		}
	}
</style>
