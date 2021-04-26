<template>
	<view class="page">
		<view class="msg_center" @click="$toUrl('/settings/message/expressNotice',{type:messageList[1].type})">
			<view class="image">
				<u-icon name="logistics" custom-prefix="custom-icon" size="64" color="#212121"></u-icon>
			</view>
			<view class="main">
				<view class="title">
					<view>{{messageList[1].title}}</view>
					<view class="time" v-if="messageList[1].add_time">{{messageList[1].add_time}}</view>
				</view>
				<view class="desc u-line-1">
					<view class="text u-line-1">{{messageList[0].content || '暂无消息'}}</view>
					<view class="num" v-if="messageList[1].num > 0">{{messageList[1].num}}</view>
				</view>
			</view>
		</view>
		<view class="msg_center" @click="$toUrl('/settings/message/messageNotice',{type:messageList[0].type})">
			<view class="image">
				<u-icon name="message" custom-prefix="custom-icon" size="64" color="#212121"></u-icon>
			</view>
			<view class="main">
				<view class="title">
					<view>{{messageList[0].title}}</view>
					<view class="time" v-if="messageList[0].add_time">{{messageList[0].add_time}}</view>
				</view>
				<view class="desc u-line-1">
					<view class="text u-line-1">{{messageList[0].content || '暂无消息'}}</view>
					<view class="num" v-if="messageList[0].num > 0">{{messageList[0].num}}</view>
				</view>
			</view>
		</view>
		<view class="msg_center" @click="$toUrl('/settings/message/smartRemind',{type:messageList[2].type})">
			<view class="image">
				<u-icon name="AI" custom-prefix="custom-icon" size="64" color="#212121"></u-icon>
			</view>
			<view class="main">
				<view class="title">
					<view>{{messageList[2].title}}</view>
					<view class="time" v-if="messageList[2].add_time">{{messageList[2].add_time}}</view>
				</view>
				<view class="desc u-line-1">
					<view class="text u-line-1">{{messageList[2].content || '暂无消息'}}</view>
					<view class="num" v-if="messageList[2].num > 0">{{messageList[2].num}}</view>
				</view>
			</view>
		</view>
		<view class="msg_center" @click="$toUrl('/settings/message/incomeNotice',{type:messageList[3].type})">
			<view class="image">
				<u-icon name="purchaseorders" custom-prefix="custom-icon" size="64" color="#212121"></u-icon>
			</view>
			<view class="main">
				<view class="title">
					<view>{{messageList[3].title}}</view>
					<view class="time" v-if="messageList[3].add_time">{{messageList[3].add_time}}</view>
				</view>
				<view class="desc u-line-1">
					<view class="text u-line-1">{{messageList[3].content || '暂无消息'}}</view>
					<view class="num" v-if="messageList[3].num > 0">{{messageList[3].num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList: []
			};
		},
		onShow() {
			this.getMessage();
		},
		methods: {
			getMessage() {
				this.$api.my.MESSAGE({
					
				}).then(res => {
					this.messageList = res.data;
				});
			}
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
		.msg_center {
			padding: 26rpx 24rpx 25rpx 40rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			margin-bottom: 24rpx;
			.image {
				flex-grow: 0;
				flex-shrink: 0;
				width: 64rpx;
				height: 64rpx;
				margin-right: 40rpx;
			}
			.main {
				flex-grow: 1;
				.title {
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 14rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.time {
						font-size: 24rpx;
						color: #999999;
					}
				}
				.desc {
					font-size: 24rpx;
					color: #999999;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text {
						flex-grow: 0;
						margin-right: 25rpx;
						width: 485rpx;
					}
					.num {
						width: 24rpx;
						height: 24rpx;
						text-align: center;
						line-height: 24rpx;
						font-size: 18rpx;
						color: #FFFFFF;
						flex-grow: 0;
						flex-shrink: 0;
						background: #F1444D;
						border-radius: 50%;
					}
				}
			}
			
		}
	}
</style>
