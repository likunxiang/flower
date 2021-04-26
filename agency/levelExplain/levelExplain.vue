<template>
	<view class="page">
		<view class="card_name">金卡会员</view>
		<view class="about_card">
			<view>1、葵花市场的会员等级分为VIP会员和银卡会员</view>
			<view>2、不同的会员等级享有差异化的特权和福利</view>
			<view>3、会员可通过消费增加成长值提升等级；</view>
			<view class="remind">* 成为VIP会员和银卡会员需签署《平台协议》</view>
		</view>
		<view class="card_name">会员等级介绍</view>
		<view class="level_bg_1">
			<image src="/agency/static/levelExplain/level_bg.png" mode="aspectFill"></image>
		</view>
		<view class="card_name">金卡会员</view>
		<view class="level_bg_2">
			<image src="/agency/static/levelExplain/level_bg_2.png" mode="aspectFill"></image>
		</view>
		
		<view>
			<view class="read_agreement" @click="jumpPage">查看《平台协议》</view>
			<view class="attention">
				<view>注： </view>
				<view>银卡会员升金卡会员的成长值有效期为365天，365天内未成为金卡会员，过期成长值将失效；</view>
				<view>如：（三级）用户A在366天时没有升级为金卡会员，则第1天的成长值将失效；</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
			//跳转会员协议
			jumpPage(){
				this.$jumpPage('/settings/personal/aboutComm',{typePage:3});	
			}
			
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
		.page {
			padding: 40rpx;
			.card_name {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
				margin-bottom: 24rpx;
			}
			.about_card {
				font-size: 22rpx;
				color: #666666;
				margin-bottom: 40rpx;
				.remind {
					color: #2995E6;
				}
			}
			.level_bg_1 {
				width: 100%;
				height: 671rpx;
				margin-bottom: 40rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.level_bg_2 {
				width: 100%;
				height: 755rpx;
				margin-bottom: 16rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.read_agreement {
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 22rpx;
				color: #E76234;
				margin-bottom: 44rpx;
			}
			.attention {
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 22rpx;
				color: #E76234;
				line-height: 40rpx;
			}
			
		}
	}
</style>
