<template>
	<view class="page">
		<view class="remind_item" v-for="(item,index) in 3" :key="index" @click="$toUrl('/settings/message/messageDetail')">
			<view class="remind_item_time">2021年02月01日 09:46:17</view>
			<view class="remind_main">
				您的提货单DD1238923123未审核，请尽快审核；否则再过20小时，该笔订单将移交上级；
			</view>
		</view>
		<footerBtn :title="pageFooter" @footerBtnEvent="footerBtnEvent"></footerBtn>
	</view>
</template>

<script>
	import footerBtn from '@/component/common/pageFooter.vue' // 底部按钮
	export default {
		data() {
			return {
				pageFooter: "查看订单"
			};
		},
		components: {
			footerBtn: footerBtn
		},
		methods: {
			footerBtnEvent() {
				
				this.$jumpPage('/pages/my/order/orderDetails', { id: '666'});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
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
				padding: 24rpx;
				font-size: 26rpx;
				color: #333333;
				line-height: 50rpx;
			}
		}
	}
</style>
