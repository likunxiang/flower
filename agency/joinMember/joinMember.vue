<template>
	<view class="page">
		<view class="header">
			<view class="normal_bg"></view>
			<view class="pic_bg"></view>
			<view class="card_desc">
				<image src="/agency/static/joinMember/card_bg.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="main">
			<u-icon name="consume" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
			<view class="">
				<view class="title">品牌产品消费</view>
				<view class="discount_msg">
					<view class="">· 满980元可升级VIP会员，全场品牌产品9折</view>
					<view class="">· 满1980元可升级银卡会员，全场品牌产品85折</view>
				</view>
			</view>
			
		</view>
		
		<pageFooter title="立即加入" @footerBtnEvent="footerBtnEvent"></pageFooter>
	</view>
</template>

<script>
	import pageFooter from '@/component/common/pageFooter.vue'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			pageFooter: pageFooter
		},
		methods: {
			footerBtnEvent() {
				this.$jumpPage('/pages/index/choiceness/choiceness')
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
			display: flex;
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
</style>
