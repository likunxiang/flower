<template>
	<view class="content_main">

		<u-navbar title="设置" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_box">

			<view class="box_item">

				<view class="item_line" @click="jumpPage(0)">
					<view class="line_name">个人信息</view>
					<view class="line_cont">
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

				<view class="item_line" @click="jumpPage(1)">
					<view class="line_name">支付设置</view>
					<view class="line_cont">
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

			</view>
			
<!-- 			<view class="box_item box_teShu">
			
				<view class="item_line" style="border-top: 0;">
					<view class="line_name">版本号</view>
					<view class="line_cont">
						<view class="cont_space">{{smallVersion}}</view>
						<view class="cont_right">
							
						</view>
					</view>
				</view>
			
			</view> -->

			<view class="box_item box_teShu">

				<view class="item_line item_teShu" @click="jumpPage(2)">
					<view class="line_name">关于我们</view>
					<view class="line_cont">
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

			</view>

		</view>

		
		<!-- <pageBottom title="退出登录" @footerBtnEvent="outReturn"></pageBottom> -->

	</view>
</template>

<script>
	import zmConfig from "@/config/index";
	import pageBottom from '@/component/common/pageFooter.vue';
	export default {
		components: {
			pageBottom
		},
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
				smallVersion:'',//小程序版本号
			}
		},
		onLoad(){
			this.smallVersion=zmConfig.smallVersion;
		},
		methods: {

			//跳转设置
			jumpPage(val) {
				switch (val) {
					case 0:
						this.$jumpPage('/settings/personal/personal');
						break;
					case 1:
						this.$jumpPage('/settings/personal/paymentSettings');
						break;
					case 2:
						this.$jumpPage('/settings/personal/aboutUs');
						break;
				}
			},

			//退出登录
			outReturn() {
				let that = this;
				that.$goback();
				that.$cache('signType', 'onSign');
				// that.$u.vuex("setToken", "");
				// uni.clearStorage();
				// that.$store.state.token = "";
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;

		.content_box {

			.box_item {


				.item_line {
					width: 100%;
					height: 100rpx;
					align-items: center;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding: 0 25rpx;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);
					
					.line_cont{
						display: flex;
						align-items: center;

						
						
						.cont_space{
							margin-right: 12rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #9B969A;
						}
						
						.cont_right{
							height: 20rpx;
							line-height: 19rpx;
						}
						
					
					}

					.line_name {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

				}

				.item_teShu {
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					border-top: none;
				}



			}

			.box_teShu {
				border-top: 16rpx solid #EEEEEE;
			}

		}

		.content_bottom {
			width: 100%;
			height: 98rpx;
			position: absolute;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 26rpx;
			position: fixed;
			background: #fff;
			
			.bottom_button {
				width: 702rpx;
				height: 66rpx;
				text-align: center;
				line-height: 66rpx;
				text-align: center;
				border: 1rpx solid #000000;
				background: #000000;
				color: #FFFFFF;
			}
			
		}

	}
</style>
