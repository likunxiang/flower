<template>
	<view class="page">
		<view class="member_item" v-for="(item,index) in memberList" :key="index">
			<view class="left">
				<view class="image_box">
					<image class="image" :src="item.avatar" mode=""></image>
				</view>
				<view class="user_info">
					<view class="user_name">
						{{item.nickname}}
					</view>
					<view class="user_tel">
						电话：{{item.phone}}
					</view>
				</view>
			</view>
			<view class="right">
				<view class="member_type">
					{{item.user_level_name}}
				</view>
				<view class="member_time">
					2021-04-01 19:50:06 加入
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberList: []
			};
		},
		onLoad(options) {
			uni.showLoading({
				title: '加载中'
			});
			this.getMemberList();
		},
		methods: {
			// 请求推广订单列表 接口
			getMemberList() {
				this.$api.member.PROMOTION_MEMBER({
			
				}).then(res => {
					this.loadEnd = true;
					this.memberList = res.data.list;
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}
	.page {
		.member_item {
			background: #FFFFFF;
			margin-bottom: 1rpx;
			padding: 24rpx;
			padding-left: 60rpx;
			display: flex;
			align-items: center;
			font-family: PingFangSC-Regular, PingFang SC;
			.left {
				flex-grow: 1;
				display: flex;
				align-items: center;
				.image_box {
					width: 64rpx;
					height: 64rpx;
					margin-right: 40rpx;
					.image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #CCCCCC;
					}
				}
				.user_info {
					.user_name {
						font-size: 22rpx;
						font-weight: 400;
						color: #333333;
						margin-bottom: 16rpx;
					}
					.user_tel {
						font-size: 22rpx;
						font-weight: 400;
						color: #999999;
					}
				}
			}
			.right {
				flex-grow: 0;
				flex-shrink: 0;
				.member_type {
					padding-right: 16rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #333333;
					margin-bottom: 16rpx;
					text-align: right;
				}
				.member_time {
					font-size: 22rpx;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
</style>
