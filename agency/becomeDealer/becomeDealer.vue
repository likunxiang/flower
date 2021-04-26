<template>
	<view class="page">
		<view class="header">
			<view class="normal_bg"></view>
			<view class="pic_bg"></view>
			<view class="card_desc">
				<image src="/agency/become_dealer_card.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="main">
			<view class="main_item">
				<u-icon name="info" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
				<view class="">
					<view class="title">升级说明</view>
					<view class="discount_msg">
						<view class="">· 充值100000，即可升级为经销商；</view>
						<view class="">· 充值成功后，不可退款；充值费可用购买平台商品；</view>
						<view class="">· 升级后永久有效；</view>
					</view>
				</view>
			</view>
			<view class="main_item">
				<u-icon name="extra" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
				<view class="">
					<view class="title">经销商特权</view>
					<view class="discount_msg">
						<view class="">· 此后购买本站产品一律享有5.5折优惠；</view>
						<view class="">· 邀请好友在本站注册消费，享有订单返佣及同级返利；</view>
						<view class="">· 完成业绩可开启业绩奖励</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<pageFooter title="前往葵花籽APP" @footerBtnEvent="footerBtnEvent"></pageFooter>
	</view>
</template>

<script>
	import pageFooter from '@/component/common/pageFooter.vue'
	export default {
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
			};
		},
		components: {
			pageFooter: pageFooter
		},
		methods: {
			footerBtnEvent() {
			}
		}
	}
</script>

<style lang="scss">
	.page{
		min-height: 100%;
		position: relative;
		.header {
			position: relative;
			margin-bottom: 52rpx;
			.normal_bg {
				width: 100%;
				height: 266rpx;
				background: #212121;
			}
			.pic_bg {
				width: 100%;
				height: 76rpx;
				background: url(../static/joinMember/hu_bg.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
			.card_desc {
				width: 636rpx;
				height: 318rpx;
				position: absolute;
				left: 57rpx;
				top: 36rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.main {
			padding-left: 40rpx;
			padding-right: 24rpx;
			.main_item {
				display: flex;
				margin-bottom: 80rpx;
				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 16rpx;
					flex-grow: 0;
					flex-shrink: 0;
				}
				.title {
					font-size: 24rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 22rpx;
				}
				.discount_msg {
					font-size: 22rpx;
					color: #666666;
					line-height: 40rpx;
				}
			}
			
		}
		
	}
</style>

