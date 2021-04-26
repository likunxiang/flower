<template>
	<view class="page" v-if="loadEnd">
		<view class="sale_time">本场将于 {{activeStatus == 6?welfareDetail.start_date:welfareDetail.end_date}} {{activeStatus == 6?'开始':'结束'}}</view>
		<view class="banner">
			<imageBox width="100%" height="354rpx" :imageUrl="welfareDetail.image"></imageBox>
		</view>
		<!-- 热销专区 -->
		<view class="hot_prefecture">
			<view class="title">
				— 热购专区 —
			</view>
			<view class="hot_goods" v-for="(goods,index) in welfareDetail.product_list" :key="index" @click="$toUrl('/pages/index/goods/goods',{id: goods.id})">
				<view class="image">
					<imageBox width="100%" height="702rpx" :imageUrl="goods.image"></imageBox>
				</view>
				<view class="sale_info">
					<view class="left">
						<view class="price_now font_family_din">
							<text class="icon">￥</text>
							<text class="text">{{goods.price}}</text>
						</view>
						<view class="price_old">
							<view class="old">￥{{goods.ot_price}}</view>
							<view class="discount">
								{{goods.discount_percent}}折
							</view>
						</view>
					</view>
					<view class="right" v-if="goods.is_remind == 0" @click.stop="saleRemind(welfareDetail.id,goods.id)">开售提醒</view>
				</view>
				
				<view class="desc_info">
					<view class="desc u-line-2">
						{{goods.product_name}}
					</view>
					<view class="label_box">
						<view class="label" v-for="(label,index) in goods.keyword_arr">{{label}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {
				welfareDetail: {},
				activeStatus: 3,
				loadEnd: false
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getWelfare();
		},
		components: {
			imageBox: imageBox
		},
		methods: {
			// 热销榜单接口
			getWelfare() {
				this.$api.index.WELFARE({
				}).then(res => {
					this.welfareDetail = res.data;
					this.activeStatus = res.data.active_status;
					this.loadEnd = true;
					uni.stopPullDownRefresh();
				})
			},
			// 开售提醒
			saleRemind(actId,goodsId) {
				this.$api.index.SALE_REMIND({
					id: actId,
					product_id: goodsId
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.getWelfare()
				})
				
			},
		},
		onPullDownRefresh() {
			this.getWelfare();
			this.currPage = 1;
		},
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}
	.page {
		padding: 24rpx;
		.sale_time {
			text-align: center;
			font-size: 22rpx;
			color: #999999;
			margin-bottom: 16rpx;
		}
		.banner {
			width: 100%;
			height: 354rpx;
			margin-bottom: 24rpx;
			image {
				width: 100%;
				height: 100%;
				background: #CCCCCC;
			}
		}
		.hot_prefecture {
			.title {
				text-align: center;
				font-size: 32rpx;
				color: #000000;
				font-weight: 500;
				margin-bottom: 24rpx;
			}
			.hot_goods {
				width: 100%;
				margin-bottom: 24rpx;
				.image {
					width: 100%;
					height: 702rpx;
					overflow: hidden;
					image {
						width: 100%;
						height: 702rpx;
						background: #CCCCCC;
					}
				}
				.sale_info {
					width: 100%;
					height: 140rpx;
					background: url(../../../static/images/index/welfareGo/hot_sale_bg.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					padding: 24rpx;
					padding-left: 40rpx;
					display: flex;
					justify-content: space-between;
					.left {
						.price_now {
							color: #EED29C;
							.icon {
								font-size: 22rpx;
							}
							.text {
								font-size: 46rpx;
							}
						}
						.price_old {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 6rpx;
							.old {
								font-size: 24rpx;
								color: #999999;
								margin-right: 24rpx;
								text-decoration: line-through;
							}
							.discount {
								padding: 1rpx 10rpx;
								text-align: center;
								border: 0rpx solid #FFFFFF !important;
								font-size: 18rpx;
								color: #CCCCCC;
								position: relative;
							}
							.discount::after {
								position: absolute;
								content: '';
								width: 200% !important;
								height: 200% !important;
								left: 0;
								top: 0;
								border: 2rpx solid #FFFFFF;
								transform: scale(0.5);
								transform-origin: 0 0;
							}
							
						}
					}
					.right {
						width: 196rpx;
						height: 50rpx;
						line-height: 48rpx;
						text-align: center;
						background: #FFFFFF;
						border: 1rpx solid #212121;
						font-size: 24rpx;
						color: #333333;
						font-weight: bold;
						margin-top: 38rpx;
					}
				}
				.desc_info {
					padding: 24rpx;
					background: #FFFFFF;
					.desc {
						font-size: 28rpx;
						color: #333333;
						line-height: 40rpx;
						margin-bottom: 16rpx;
					}
					.label_box {
						display: flex;
						.label {
							padding: 5rpx 11rpx;
							background: #FFFFFF;
							border: 0px solid #212121 !important;
							margin-right: 40rpx;
							font-size: 22rpx;
							color: #333333;
							position: relative;
						}
						.label::after {
							position: absolute;
							content: '';
							width: 200% !important;
							height: 200% !important;
							left: 0;
							top: 0;
							border: 2rpx solid #212121;
							transform: scale(0.5);
							transform-origin: 0 0;
						}
					}
				}
			}
		}
	}
</style>
