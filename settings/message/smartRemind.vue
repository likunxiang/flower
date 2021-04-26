<template>
	<view class="page">
		<view class="remind_item" v-for="(item,index) in 3" :key="index" @click="$toUrl('/settings/message/remindRecord')">
			<view class="remind_item_time">
				2021年02月01日 09:46:17
			</view>
			<view class="remind_main">
				<view class="icon">
					<u-icon name="timeout" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
				</view>
				<view class="desc">
					<view class="text u-line-1">您的发货单DD89283912未发货未发货未发货</view>
					<view class="dot" v-if="item.is_read === 0 || true"></view>
				</view>
				<view class="btn">
					查看详情 >
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
		padding: 24rpx;
		.remind_item {
			margin-bottom: 24rpx;
			.remind_item_time {
				font-size: 22rpx;
				color: #999999;
				margin-bottom: 16rpx;
				text-align: center;
			}
			.remind_main {
				background: #FFFFFF;
				padding: 21rpx 25rpx 21rpx 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.icon {
					width: 36rpx;
					height: 36rpx;
					margin-right: 24rpx;
					flex-grow: 0;
					flex-shrink: 0;
					
				}
				.desc {
					display: flex;
					align-items: center;
					flex-grow: 1;
					.text {
						margin-right: 24rpx;
						width: 365rpx;
						font-size: 26rpx;
						color: #333333;
					}
					.dot {
						width: 12rpx;
						height: 12rpx;
						background: #F1444D;
						border-radius: 50%;
						flex-grow: 0;
						flex-shrink: 0;
					}
				}
				.btn {
					flex-grow: 0;
					flex-shrink: 0;
					font-size: 22rpx;
					color: #CCCCCC;
				}
			}
		}
	}
</style>
