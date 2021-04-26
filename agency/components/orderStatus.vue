<template>
	<view class="order_status">

		<view class="icon">
			<block v-if="status == 1">
				<u-icon name="timing" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
			</block>
			<block v-else-if="status == 2 || status == 3">
				<u-icon name="bag" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
			</block>
			<block v-else-if="status == 5">
				<u-icon name="onclick" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
			</block>
			<block v-else-if="status == 10 || status == 11">
				<u-icon name="stoped" custom-prefix="custom-icon" size="36" color="#F1444D"></u-icon>
			</block>

		</view>
		<view class="order_status_info">
			<view class="status" :class="{'status_red': status == 10 || status == 11}">{{statusStr}}</view>
			<block v-if="status == 1">
				<view class="desc">等待买家付款中…</view>
			</block>
			<block v-else-if="status == 2">
				<view class="desc">更值得等待，好物在路上！</view>
			</block>
			<block v-else-if="status == 3">
				<view class="desc">心爱的宝贝已到货，快去领回家吧</view>
			</block>
			<block v-else-if="status == 5">
				<view class="desc">好物记得分享给你的小伙伴哦~</view>
			</block>
			<block v-else-if="status == 10">
				<view class="desc">订单已被主动取消~</view>
			</block>
			<block v-else-if="status == 11">
				<view class="desc">超时订单已被取消，如需订购请重新下单</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			// 订单状态
			status: {
				type: String,
				default: "1"
			},
			// 订单状态说明
			statusStr: {
				type: String,
				default: ""
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.order_status {
		padding: 24rpx 40rpx;
		background: #FFFFFF;
		display: flex;
		margin-bottom: 8rpx;

		.icon {
			width: 36rpx;
			height: 36rpx;
			margin-right: 24rpx;
		}

		.order_status_info {
			.status {
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 8rpx;
			}
			.status_red {
				color: #F1444D;
			}

			.desc {
				font-size: 22rpx;
				color: #CCCCCC;
			}
		}
	}
</style>
