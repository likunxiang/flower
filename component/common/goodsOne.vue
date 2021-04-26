<template>
	<!-- 一行商品 -->
	<view class="goods_list">
		<view class="goods" v-for="(item,index) in goodsList" :key="index" @click="$toUrl('/pages/index/goods/goods',{id:item.id})">
			<view class="image">
				<imageBox width="160rpx" height="160rpx" :imageUrl="item.image"></imageBox>
				<view class="rank" v-if="showRank && index < 5">
					TOP {{index + 1}}
				</view>
			</view>
			<view class="info">
				<view class="name u-line-2">
					{{item.title}}
				</view>
				<view class="price_num">
					<view class="left">
						<view class="price_now font_family_din">
							<text class="icon">￥</text>
							<text class="text">{{item.price}}</text>
						</view>
						<view class="price_old">
							￥{{item.ot_price}}
						</view>
					</view>
					<view class="right" v-if="showSale">
						已售：{{item.sale_num}}件
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
				
			}
		},
		props: {
			// 是否显示 已售
			showSale: {
				type: Boolean,
				default: false
			},
			goodsList: {
				type: Array,
				default: () => {
					return {}
				}
			},
			// 是否显示 TOP *
			showRank: {
				type: Boolean,
				default: false
			}
		},
		components: {
			imageBox: imageBox
		},
		methods: {
	
		}
	}
</script>

<style scoped lang="scss">
	.goods_list {
		.goods {
			background: #FFFFFF;
			padding: 20rpx;
			margin-bottom: 24rpx;
			display: flex;
			.image {
				width: 160rpx;
				height: 160rpx;
				margin-right: 24rpx;
				flex-grow: 0;
				flex-shrink: 0;
				position: relative;
				.image {
					width: 100%;
					height: 100%;
					background: #CCCCCC;
				}
				.rank {
					position: absolute;
					top: 0rpx;
					left: 0rpx;
					width: 66rpx;
					line-height: 24rpx;
					text-align: center;
					height: 24rpx;
					background: #F1444D;
					font-size: 18rpx;
					color: #FFFFFF;
				}
			}
	
			.info {
				flex-grow: 1;
	
				.name {
					font-size: 28rpx;
					color: #333333;
					line-height: 40rpx;
					margin-bottom: 32rpx;
					height: 80rpx;
				}
	
				.price_num {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.left {
						display: flex;
						align-items: center;
						.price_now {
							color: #E76234;
							margin-right: 16rpx;
							font-weight: 600;
						
							.icon {
								font-size: 24rpx;
							}
						
							.text {
								font-size: 36rpx;
							}
						}
						
						.price_old {
							font-size: 28rpx;
							color: #999999;
							text-decoration: line-through;
						}
					}
					.right {
						font-size: 22rpx;
						color: #333333;
					}
				}
			}
		}
	}
</style>
