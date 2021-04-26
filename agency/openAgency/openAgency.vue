<template>
	<view class="page">
		<view class="header">
			<view class="normal_bg"></view>
			<view class="pic_bg"></view>
			<view class="card_desc">
				<image src="/agency/static/openAgency/agency_bg.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="main">
			<view class="main_item">
				<u-icon name="extra" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
				<view class="">
					<view class="title">金卡代理特权</view>
					<view class="discount_msg">
						<view class="">· 此后购买本站的品牌产品一律所有权75折优惠；</view>
						<view class="">· 享有邀请奖励；</view>
					</view>
				</view>
			</view>
			<view class="main_item">
				<u-icon name="extra" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
				<view class="">
					<view class="title">黑卡代理特权</view>
					<view class="discount_msg">
						<view class="">· 此后购买本站的品牌产品一律所有权65折优惠；</view>
						<view class="">· 享有邀请奖励；</view>
					</view>
				</view>
			</view>
			<view class="main_item">
				<u-icon name="info" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
				<view class="">
					<view class="title">注意事项</view>
					<view class="discount_msg">
						<view class="">· 开通品牌代理需下载葵花子APP进行开通；</view>
						<view class="">· 产品购买成功后，无法进行退款；</view>
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
				margin-bottom: 40rpx;
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

