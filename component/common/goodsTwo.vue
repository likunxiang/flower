<template>
	<!-- 一行两商品 -->
	<view class="goods_list_box">
		<view class="goods" v-for="(item,index) in goodsList" :key="index"
			@click.stop="$toUrl('/pages/index/goods/goods',{id: item.id})">
			<imageBox width="344rpx" height="344rpx" :imageUrl="item.image"></imageBox>
			<view class="info">
				<view class="name u-line-1">
					{{item.title}}
				</view>
				<view class="price u-line-1 u-line-1">
					<view class="price_now">￥{{item.price}}</view>
					<view class="price_old">￥{{item.ot_price}}</view>
				</view>
				<view class="buy_now">
					立即购买
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
	.goods_list_box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	
		.goods {
			width: 344rpx;
			margin-bottom: 16rpx;
			background: #FFFFFF;
	
			.info {
				padding: 16rpx;
				padding-bottom: 24rpx;
				text-align: center;
				position: relative;
	
				.name {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
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
						margin-right: 8rpx;
					}
	
					.price_old {
						flex: 1;
						text-align: left;
						font-size: 22rpx;
						margin-left: 8rpx;
						color: #CCCCCC;
						text-decoration: line-through;
	
					}
				}
	
				.buy_now {
					margin: auto;
					margin-top: 16rpx;
					width: 160rpx;
					padding: 8rpx 0;
					text-align: center;
					background: #212121;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
