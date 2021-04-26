<template>
	<view class="page">
		<view class="notice_item" v-for="(item,index) in 5" :key="index">
			<view class="notice_item_time">
				2021年02月01日 09:46:17
			</view>
			<view class="notice_item_main">
				<view class="main">
					<view class="desc u-line-1">
						您有新待发货单4880元；请在24小时内尽快审核。您有新待发货单4880元；请在24小时内尽快审核。
					</view>
					<!-- 未读时，红点 -->
					<view class="dot" v-if="item.is_read === 0 || true"></view>
				</view>
				<view class="footer">
					查看订单 >
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
	.page {
		padding: 24rpx;
		.notice_item {
			margin-bottom: 24rpx;
			.notice_item_time {
				font-size: 22rpx;
				color: #999999;
				margin-bottom: 16rpx;
				text-align: center;
			}
			.notice_item_main {
				padding: 0 24rpx;
				background: #FFFFFF;
				.main {
					padding-top: 24rpx;
					padding-bottom: 16rpx;
					font-size: 26rpx;
					color: #333333;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					.desc {
						flex-grow: 1;
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
				.footer {
					padding-top: 16rpx;
					padding-bottom: 24rpx;
					display: flex;
					justify-content: flex-end;
					font-size: 26rpx;
					color: #999999;
				}
			}
		}
	}
</style>
