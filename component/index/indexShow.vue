<template>
	<view class="index_show">
		<!-- 品牌甄选 -->
		<view class="brand">
			<view class="pad-24">
				<view class="title">
					<view class="left">
						<view class="big_text">
							品牌·甄选
						</view>
						<view class="small_text">
							/BRAND SELECTION
						</view>
					</view>
					<view class="right" @click="$toUrl('/pages/index/choiceness/choiceness')">
						<u-icon class="image" name="rightBack" custom-prefix="custom-icon" size="24" color="#212121"></u-icon>
					</view>
				</view>
			</view>
			<view class="brand_item" v-for="(item,index) in brand" :key="index">
				<view class="pad-35" @click.stop="$toUrl('/pages/index/brand/brand',{id: item.id})">
					<view class="brand_entrance">
						<imageBox width="100%" height="680rpx" :imageUrl="item.homepage_image"></imageBox>
						<view class="brand_info">
							<view class="left">
								<view class="text_1">
									{{item.brand_name}}
								</view>
								<view class="logo">
									<image class="image" :src="item.logo" @error="imageError(index)"
										mode="heightFix"></image>
								</view>
								<view class="text_3">
									{{item.subtitle}}
								</view>
							</view>
							<view class="right">
								进入品牌 >
							</view>
						</view>
					</view>
				</view>
				<!-- 品牌商品 -->
				<view class="brand_goods_scroll" v-if="item.product_list.length">
					<scroll-view scroll-x="true">
						<view class="u-flex scroll">
							<view :class="'goods ' + (item.product_list.length <= 5?'last_goods':'')"
								v-for="(goods,gIndex) in item.product_list" :key="gIndex"
								@click.stop="$toUrl('/pages/index/goods/goods',{id: goods.id})" v-if="gIndex < 5">
								<imageBox width="100%" height="240rpx" :imageUrl="goods.image"></imageBox>
								<view class="info">
									<view class="name u-line-1">
										{{goods.title}}
									</view>
									<view class="price u-line-1">
										<view class="price_now">￥{{goods.price}}</view>
										<view class="price_old">￥{{goods.ot_price}}</view>
									</view>
								</view>
							</view>

							<!-- 查看更多 -->
							<view class="check_more_box" v-if="item.product_list.length > 5"
								@click.stop="$toUrl('/pages/index/brand/brand',{id: item.id})">
								<view class="check_more">查看全部</view>
							</view>
						</view>

					</scroll-view>
				</view>
				<!-- 品牌商品 end -->
			</view>
		</view>
		<!-- 好物 -->
		<view class="goods_list">
			<view class="pad-24">
				<view class="title">
					<view class="left">
						<view class="big_text">
							好物·推荐
						</view>
						<view class="small_text">
							/SURPRISE RECOMMENDATION
						</view>
					</view>
				</view>
			</view>
			<view class="goods_list_box">
				<view class="goods" v-for="(item,index) in goodsList" :key="index"
					@click.stop="$toUrl('/pages/index/goods/goods',{id: item.id})">
					<imageBox width="100%" height="327rpx" :imageUrl="item.image"></imageBox>
					<view class="info">
						<view class="name u-line-1">
							{{item.title}}
						</view>
						<view class="price u-line-1 u-line-1">
							<view class="price_now">￥{{item.price}}</view>
							<view class="price_old">￥{{item.ot_price}}</view>
						</view>
						<view class="like_box">
							{{item.collect_num}}人喜欢
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 好物 end -->
		<!-- 到底了 -->
		<!-- 到底了 end -->
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {

			}
		},
		components: {
			imageBox: imageBox
		},
		props: {
			brand: {
				type: Array,
				default: () => {
					return {}
				}
			},
			goodsList: {
				type: Array,
				default: () => {
					return {}
				}
			}
		},
		methods: {
			//图片加载出错，替换为默认图片
			imageError(index) {
				this.$emit('imageError', index)

			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	.index_show {
		.brand {
			background: #FFFFFF;

			.pad-24 {
				padding: 24rpx;
			}

			.pad-35 {
				padding: 0 35rpx;
			}

			.title {
				padding: 5rpx 25rpx 5rpx 16rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					align-items: center;

					.big_text {
						font-size: 36rpx;
						color: #333333;
						font-weight: 500;
						margin-right: 16rpx;
					}

					.small_text {
						font-size: 22rpx;
						color: #CCCCCC;
					}
				}

				.right {
					width: 40rpx;
					text-align: right;

					.image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}

			.brand_entrance {
				width: 100%;
				height: 680rpx;
				position: relative;
				margin-bottom: 40rpx;

				.image {
					width: 100%;
					height: 100%;
				}

				.brand_info {
					position: absolute;
					bottom: 0rpx;
					left: 0rpx;
					width: 100%;
					padding: 24rpx 40rpx;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.9) 35%, #FFFFFF 100%);
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						.text_1 {
							font-size: 28rpx;
							color: #333333;
							font-weight: 500;
							margin-bottom: 16rpx;
						}

						.logo {
							margin-bottom: 21rpx;
							height: 40rpx;

							.image {
								height: 40rpx;
							}
						}

						.text_3 {
							font-size: 24rpx;
							color: #999999;
						}
					}

					.right {
						width: 150rpx;
						height: 48rpx;
						line-height: 48rpx;
						background: #FFFFFF;
						border: 0rpx solid #212121 !important;
						text-align: center;
						font-size: 24rpx;
						color: #333333;
						position: relative;
					}

					.right::after {
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

			.brand_goods_scroll {
				padding-bottom: 40rpx;

				.scroll {
					padding: 0 24rpx;
					height: 360rpx;
					display: flex;

					.goods {
						width: 240rpx;
						margin-right: 24rpx;
						flex-shrink: 0;

						.image {
							width: 100%;
							height: 240rpx;
						}

						.info {
							padding: 16rpx 0;
							text-align: center;

							.name {
								font-size: 28rpx;
								color: #666666;
								margin-bottom: 8rpx;
							}

							.price {
								display: flex;
								align-items: flex-end;
								font-weight: 600;
								font-family: DINAlternate-Bold;

								.price_now {
									flex: 1;
									text-align: right;
									font-size: 28rpx;
									color: #333333;
									margin-right: 4rpx;
								}

								.price_old {
									flex: 1;
									text-align: left;
									font-size: 22rpx;
									margin-left: 4rpx;
									color: #CCCCCC;
									text-decoration: line-through;
								}
							}
						}
					}

					.last_goods {
						width: 264rpx;
						padding-right: 24rpx;
					}

					.check_more_box {
						padding-right: 24rpx;
						height: 360rpx;

						.check_more {
							height: 360rpx;
							padding: 130rpx 16rpx;
							line-height: 25rpx;
							background: #F9F9F9;
							font-size: 18rpx;
							color: #999999;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							text-align: center;
						}
					}
				}
			}
		}

		.goods_list {
			background: #FFFFFF;
			padding-bottom: 20rpx;

			.pad-24 {
				padding: 24rpx;
			}

			.pad-35 {
				padding: 0 35rpx;
			}

			.title {
				padding: 5rpx 25rpx 5rpx 16rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					align-items: center;

					.big_text {
						font-size: 36rpx;
						color: #333333;
						font-weight: 500;
						margin-right: 16rpx;
					}

					.small_text {
						font-size: 22rpx;
						color: #CCCCCC;
					}
				}

				.right {
					width: 24rpx;
					height: 24rpx;
				}
			}

			.goods_list_box {
				padding: 0 40rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.goods {
					width: 328rpx;
					border: 1rpx solid #EEEEEE;
					margin-bottom: 16rpx;


					.info {
						padding: 16rpx;
						text-align: center;
						position: relative;

						.name {
							font-size: 28rpx;
							color: #666666;
							margin-bottom: 8rpx;
						}

						.price {
							display: flex;
							align-items: flex-end;
							font-weight: 600;
							margin-bottom: 16rpx;
							font-family: DINAlternate-Bold;

							.price_now {
								flex: 1;
								text-align: right;
								font-size: 28rpx;
								color: #212121;
								margin-right: 4rpx;
							}

							.price_old {
								flex: 1;
								text-align: left;
								font-size: 22rpx;
								margin-left: 4rpx;
								color: #CCCCCC;
								text-decoration: line-through;

							}
						}

						.like_box {
							height: 30rpx;
							width: 120rpx;
							text-align: center;
							line-height: 30rpx;
							font-size: 18rpx;
							color: #999999;
							background: #F9F9F9;
							margin: auto;
							// .like_num {
							// 	position: absolute;
							// 	bottom: 16rpx;
							// 	padding: 0rpx 16rpx;
							// 	height: 30rpx;
							// 	line-height: 30rpx;
							// 	font-size: 18rpx;
							// 	color: #999999;
							// 	background: #F9F9F9;
							// }
						}
					}
				}
			}
		}

	}
</style>
