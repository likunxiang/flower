<template>
	<view class="content_main">

		<u-navbar title="支付成功" :custom-back="$goback" :border-bottom="false" :is-back="false"></u-navbar>

		<view class="content_box" :style="'height: calc(100vh - 92rpx ' + heightInfo + 'px);'">

			<view class="box_img">
				<u-icon name="onclick" custom-prefix="custom-icon" size="72"></u-icon>
			</view>

			<view class="box_title">恭喜你, 订单支付成功!</view>

			<view class="box_button">
				<view class="button_color button_teSshu" @click="jumpPage(0)">查看订单</view>
				<view class="button_color" @click="jumpPage(1)">返回首页</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				heightInfo: '', //标题栏高度
				phoneModel: uni.getStorageSync('phoneModel'),
				payPrice:'',//付款金额
				typePage:''
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.payPrice=option.payPrice;
			this.typePage=option.typePage;
		},
		methods: {

			//跳转设置
			jumpPage(val) {
				switch (val) {
					case 0: //查看订单
					    if(this.typePage==0){
							this.$jumpPage('/pages/my/order/myOrder',{typePage: 0},'replace');
						}else{
							this.$goback();
						}
						break;
					case 1: //返回首页
						this.$jumpPage('/pages/index/index','', 'pushTab');
						break;
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;
		width: 100%;

		.content_box {
			width: 100%;
			padding: 0 60rpx;
			text-align: center;

			.box_img {
				width: 100%;
				margin-top: 160rpx;
			}

			.box_title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #212121;
				margin-top: 40rpx;
			}

			.box_button{
				margin-top: 249rpx;

				.button_color{
					margin-bottom:24rpx;
					width: 630rpx;
					height: 80rpx;
					border: 1rpx solid #212121;
					line-height: 80rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
				}

				.button_teSshu{
					color: #FFFFFF;
					background: #000000;
				}

			}

		}


	}
</style>
