<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item :right-options="options" @click="deleteItem(index)"
				v-for="(item, index) in collectionData" :key="index">
				<view class="block_info">
		
					<view class="order_product">
		
						<view class="product_img">
							<image :src="item.image"></image>
						</view>
		
						<view class="product_title">
							<view class="title_name u-line-2">{{item.title}}</view>
							<view class="title_num">
								<view class="title_price">¥ {{item.price}}</view>
								<!-- <view class="title_model">
									<image src="/settings/static/collection_purchase.png" @click="jumpPage(index)">
									</image>
								</view> -->
							</view>
						</view>
		
		
					</view>
		
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	export default {
		props: ["collectionData"],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F1444D',
					}
				}]
			}
		},
		methods: {
			
			
			//点击删除收藏
			deleteItem(index) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除收藏?',
					success: function(res) {
						if (res.confirm) {
							that.$api.my.API_COLLECTDEL({
								id: that.collectionData[index].id,
							}).then(res => {
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								that.$emit("refresh" ,index)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.block_info {
		height: 208rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		padding: 25rpx 25rpx;
		width: 100%;
	
		.order_product {
			display: flex;
			align-items: center;
			width: 100%;
	
			.product_img {
				width: 160rpx;
				height: 160rpx;
				background: #CCCCCC;
	
				image {
					width: 100%;
					height: 100%;
				}
	
			}
	
			.product_title {
				width: calc(100% - 160rpx);
				padding: 0 0rpx 0 20rpx;
				height: 160rpx;
	
				.title_name {
					height: 84rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #212121;
					margin-bottom: 34rpx;
				}
	
	
				.title_num {
					display: flex;
					align-items: center;
					flex-direction: row;
					justify-content: space-between;
	
					.title_model {
						width: 130rpx;
						height: 50rpx;
	
						image {
							width: 100%;
							height: 100%;
						}
	
					}
	
					.title_price {
						font-size: 30rpx;
						font-weight: bold;
						color: #E76234;
					}
	
				}
			}
	
		}
	
	}
	
</style>
