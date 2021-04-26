<template>
	<view class="page">
		<view class="tab_box">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" height="72" font-size='26'
				active-color='#333333' inactive-color='#666666' bar-width='80' bar-height='2'></u-tabs>
		</view>
		<view class="tab_main">
			<view v-show="current == 0">
				<view class="banner">
					<imageBox width="100%" height="400rpx" :imageUrl="brandDetail.choice_image"></imageBox>
					<view class="info">{{brandDetail.brand_name}}</view>
				</view>
				<!-- 热销专区 -->
				<view class="hot_prefecture">
					<view class="title">
						— 精选商品 —
					</view>
					<view class="hot_goods" v-for="(item,index) in goodsList" :key="index"
						@click="$toUrl('/pages/index/goods/goods',{id: item.id})">
						<view class="image">
							<imageBox width="100%" height="702rpx" :imageUrl="item.image"></imageBox>
						</view>
						<view class="sale_info">
							<view class="left">
								<view class="price_now font_family_din">
									<text class="icon">￥</text>
									<text class="text">{{item.price}}</text>
								</view>
								<view class="price_old">
									<view class="old">￥{{item.ot_price}}</view>
									<view class="discount">
										{{item.discount_percent}}折
									</view>
								</view>
							</view>
						</view>

						<view class="desc_info">
							<view class="desc u-line-2">
								{{item.title}}
							</view>
							<view class="label_box">
								<view class="label" v-for="(label,index) in item.keyword_arr" :key="index">{{label}}</view>
							</view>
							<view class="buy_now">
								<view class="buy_now_btn">立即抢购</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view v-show="current == 1">

				<u-parse :html="brandDetail.introduce"></u-parse>

			</view>
		</view>

	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {
				brandId: 0,
				list: [{
					name: '品牌会场'
				}, {
					name: '品牌详情'
				}],
				current: 0,
				goodsList: [],
				brandDetail: {},
			};
		},
		onLoad(options) {
			this.brandId = options.id;
			this.getBrand();
		},
		components: {
			imageBox: imageBox
		},
		methods: {
			change(index) {
				this.current = index;
			},
			// 热销榜单接口
			getBrand() {
				this.$api.index.BRAND({
					brand_id: this.brandId
				}).then(res => {
					this.goodsList = res.data.product_list;
					this.brandDetail = res.data.brand_detail;

				})
			},
		}
	}
</script>

<style lang="scss">
	::v-deep.u-tab-bar {
		bottom: -2rpx !important;
	}
	page {
		background: #EEEEEE;

		.page {
			.tab_box {}

			.tab_main {
				padding: 24rpx;

				.banner {
					width: 100%;
					height: 400rpx;
					position: relative;
					margin-bottom: 24rpx;

					.image {
						width: 100%;
						height: 100%;
						background: #CCCCCC;
					}

					.info {
						position: absolute;
						width: 100%;
						bottom: 0rpx;
						left: 0rpx;
						padding: 24rpx;
						background: rgba(33, 33, 33, .3);
						font-size: 28rpx;
						color: #FFFFFF;
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

							.image {
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
								margin-bottom: 16rpx;

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

							.buy_now {
								display: flex;
								justify-content: flex-end;

								.buy_now_btn {
									width: 196rpx;
									height: 50rpx;
									line-height: 50rpx;
									text-align: center;
									background: #212121;
									font-size: 24rpx;
									color: #FFFFFF;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
