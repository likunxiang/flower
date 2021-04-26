<template>
	<view class="block_color" v-if="couponsData.length !=0">

		<view class="block_item" v-for="(item,index) in couponsData" :key="index">

			<view class="block_info">

				<view class="block_left">

					<!-- 我的优惠劵 -->
					<template v-if="typePage==0">
						<view class="left_price" :style="item.coupon_status !=1 && item.coupon_status !=4 ?'color: #999999;':''">¥<text
								class="price_title font_family_din">{{item.discount_amount}}</text></view>
						<view class="left_tops" :style="item.coupon_status !=1 && item.coupon_status !=4 ?'color: #999999;':''">
							满{{item.min_consumption}}元可用</view>
					</template>

					<!-- 结算领劵 -->
					<template v-if="typePage==1">
						<view class="left_price" :style="item.type==1?'color: #999999;':''">¥<text
								class="price_title font_family_din">{{item.discount_amount}}</text></view>
						<view class="left_tops" :style="item.type==1?'color: #999999;':''">满{{item.min_consumption}}元可用
						</view>
					</template>

					<!-- 领劵中心 -->
					<template v-if="typePage==2">
						<view class="left_price" :style="item.campaign_coupon_status==3?'color: #999999;':''">¥<text
								class="price_title font_family_din">{{item.discount_amount}}</text></view>
						<view class="left_tops" :style="item.campaign_coupon_status==3?'color: #999999;':''">
							满{{item.min_consumption}}元可用</view>
					</template>


				</view>

				<view class="block_right">

					<view class="right_title">

						<!-- 我的优惠劵 -->
						<template v-if="typePage==0">

							<view class="title_main" :style="item.coupon_status !=1&& item.coupon_status !=4 ?'color: #999999;':''">{{item.name}}</view>

							<view class="title_time" :style="item.coupon_status !=1&& item.coupon_status !=4 ?'color: #999999;':''">{{item.coupon_valid_time_desc}}</view>

						</template>

						<!-- 结算领劵 -->
						<template v-if="typePage==1">

							<view class="title_main" :style="item.type==1?'color: #999999;':''">{{item.coupon_name}}</view>

							<view class="title_time" :style="item.type==1?'color: #999999;':''">{{item.coupon_valid_time_desc}}</view>

						</template>

						<!-- 领劵中心 -->
						<template v-if="typePage==2">

							<view class="title_main" :style="item.campaign_coupon_status==3?'color: #999999;':''">{{item.name}}</view>

							<view class="title_time" :style="item.campaign_coupon_status==3?'color: #999999;':''">{{item.coupon_valid_time_desc}}</view>

						</template>


					</view>




					<view class="right_button">

						<!-- 我的优惠劵 -->
						<template v-if="typePage==0">

							<view class="bank_use" v-if="item.coupon_status==1" @click="jumpPage">立即使用</view>

							<view class="bank_img" v-else-if="item.coupon_status==2">
								<image src="/static/images/my/coupons/coupons_noused.png"></image>
							</view>

							<view class="bank_img" v-else-if="item.coupon_status==3">
								<image src="/static/images/my/coupons/coupons_overdue.png"></image>
							</view>
							
							<view class="bank_nouse" v-if="item.coupon_status==4">未开始</view>

						</template>

						<!-- 结算领劵 -->
						<template v-if="typePage==1">

							<view class="bank_use" v-if="item.type==0" @click="useInfo(index)">立即使用</view>

							<view class="bank_name" v-else-if="item.type==1">不可用</view>

						</template>

						<!-- 领劵中心 -->
						<template v-if="typePage==2">

							<view class="bank_use" v-if="item.campaign_coupon_status==1" @click="receiveInfo(index)">
								立即领取</view>

							<view class="bank_img" v-else-if="item.campaign_coupon_status==2">
								<image src="/static/images/my/coupons/coupons_received.png"></image>
							</view>

							<view class="bank_img" v-else-if="item.campaign_coupon_status==3">
								<image src="/static/images/my/coupons/coupons_receivedOk.png"></image>
							</view>

						</template>

					</view>


				</view>

			</view>

			<view class="block_bottom" :style="item.openCheckd?'height:auto;':'height:75rpx;'">

				<view class="block_explain">

					<view class="explain_title" :class="item.openCheckd?'':'explain_color'">
						{{item.description}}
					</view>

					<view class="explain_png">
						<u-icon name="upBack" custom-prefix="custom-icon" size="24" v-if="item.openCheckd" @click="openClick(index)"></u-icon>
						<u-icon name="bottonBack" custom-prefix="custom-icon" size="24" v-else @click="openClick(index)"></u-icon>
					</view>

				</view>

			</view>

			<view class="type_top"></view>
			<view class="type_bottom"></view>

		</view>

	</view>

	<view class="block_img" v-else>

		<view class="img_png">
			<image src="/static/images/my/coupons/coupons_no.png"></image>
			<view class="img_title">一大波好券正赶来的路上</view>
		</view>

	</view>

</template>

<script>
	export default {
		props: ["couponsData", "typePage", 'goodsType'],
		data() {
			return {

			}
		},
		methods: {


			//点击展开
			openClick(index) {
				let that = this;
				that.$emit('changeCheckd', index)
			},

			//领取优惠券
			receiveInfo(val) {
				let that = this;
				that.$api.my.API_COUPONRECEIVE({
					coupon_id: that.couponsData[val].id
				}).then(res => {
					uni.showToast({
						title: '领取成功!!!'
					});
					that.$emit("refresh")
				});
			},

			//使用优惠劵
			useInfo(val) {
				let that = this;
				that.$cache('couponInfo', that.couponsData[val]);
				that.$goback();
			},


			//跳转首页购买
			jumpPage() {
				let that = this;
				that.$jumpPage('/pages/index/index', '', 'pushTab');
			},





		}
	}
</script>

<style lang="scss" scoped>
	.block_color {
		width: 100%;
		padding: 0 24rpx;


		.block_item {
			position: relative;

			.block_info {
				display: flex;
				width: 702rpx;
				background: #FFFFFF;
				margin-top: 16rpx;
				padding: 40rpx 0;
				height: 184rpx;

				.block_left {
					text-align: center;
					width: 196rpx;



					.left_price {
						color: #212121;

						.price_title {
							font-size: 72rpx;
						}

					}

					.left_tops {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #212121;
					}

				}

				.block_right {
					border-left: 1rpx dashed #212121;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: calc(100% - 196rpx);
					padding-left: 40rpx;
					padding-right: 40rpx;

					.right_title {
						width: 300rpx;

						.title_main {
							height: 45rpx;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							margin-bottom: 24rpx;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							line-clamp: 1;
							-webkit-box-orient: vertical;
							padding-right: 10rpx;
						}

						.title_time {
							height: 30rpx;
							font-size: 18rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
						}

					}

					.right_button {
						width: 110rpx;

						image {
							width: 110rpx;
							height: 40rpx;
						}

						.bank_use {
							width: 110rpx;
							height: 40rpx;
							border: 1rpx solid #212121;
							text-align: center;
							line-height: 40rpx;
							background: #212121;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}

						.bank_name {
							width: 110rpx;
							height: 40rpx;
							border: 1rpx solid #9B969A;
							text-align: center;
							line-height: 40rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #9B969A;
						}
						
						.bank_nouse{
							width: 110rpx;
							height: 40rpx;
							background: #CCCCCC;
							text-align: center;
							line-height: 40rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}

						.bank_img {
							width: 95rpx;
							height: 95rpx;
							position: absolute;
							right: 0;

							image {
								width: 95rpx;
								height: 95rpx;
							}

						}

					}

				}

			}

			.block_bottom {
				width: 701rpx;
				display: flex;
				align-items: center;
				background: #FFFFFF;
				padding: 0 40rpx;


				.block_explain {
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					padding: 24rpx 0;
					position: relative;

					.explain_png {
						width: 24rpx;
						height: 24rpx;
						margin-left: 98rpx;
						position: absolute;
						position: absolute;
						right: 0;
						top: 20rpx;
					}

					.explain_title {
						width: calc(100% - 122rpx);
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.explain_color {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

				}

			}

			.type_bottom {
				width: 24rpx;
				height: 12rpx;
				border-top-right-radius: 25px;
				border-top-left-radius: 25px;
				border-bottom: 0;
				background: #EEEEEE;
				position: absolute;
				bottom: 0;
				left: 185rpx;
			}

			.type_top {
				width: 24rpx;
				height: 12rpx;
				border-bottom-right-radius: 25px;
				border-bottom-left-radius: 25px;
				border-bottom: 0;
				background: #EEEEEE;
				position: absolute;
				top: 0;
				left: 185rpx;
			}

		}

	}


	.block_img {
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
