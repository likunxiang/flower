<template>
	<view class="page">
		<view class="detail">
			<view class="header">
				<view class="title">
					{{noticeDetail.title}}
				</view>
				<view class="time">
					{{noticeDetail.add_time_format2}}
				</view>
			</view>
			<view class="main">
				<u-parse :html="noticeDetail.content" :selectable="true"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 1,
				noticeDetail: {}
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getMessageDetail();
		},
		methods: {
			// 请求消息详情
			getMessageDetail() {
				this.$api.my.MESSAGE_DETAIL({
					notify_id: this.id
				}).then(res => {
					this.noticeDetail = res.data.notify_detail;
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}
	.page {
		padding: 16rpx 24rpx;
		.detail {
			background: #FFFFFF;
			padding: 0 24rpx;
			.header {
				padding-top: 24rpx;
				padding-bottom: 16rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				.title {
					font-size: 26rpx;
					color: #333333;
					margin-bottom: 16rpx;
				}
				.time {
					font-size: 22rpx;
					color: #999999;
				}
			}
			.main {
				padding: 16rpx 0;
			}
		}
	}
</style>
