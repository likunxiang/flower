<template>
	<view class="content_main">

		<u-navbar title="关于我们" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_box">

			<view class="box_item">

				<view class="item_line" @click="jumpPage(4)">
					<view class="line_name">平台服务协议</view>
					<view>
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

				<view class="item_line" @click="jumpPage(3)">
					<view class="line_name">会员服务协议</view>
					<view>
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>
				
				<view class="item_line" @click="jumpPage(2)">
					<view class="line_name">隐私政策</view>
					<view>
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

			</view>

			<view class="box_item box_teShu">

				<view class="item_line item_teShu" @click="jumpPage(1)">
					<view class="line_name">向日葵介绍</view>
					<view>
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

			</view>


		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			

			//跳转设置
			jumpPage(val) {
				switch (val) {
					case 1:
						this.$jumpPage('/settings/personal/aboutComm',{typePage:val});
						break;
					case 2:
						this.$jumpPage('/settings/personal/aboutComm',{typePage:val});
						break;
					case 3:
						this.$jumpPage('/settings/personal/aboutComm',{typePage:val});	
						break;
					case 4:
						this.$jumpPage('/settings/personal/aboutComm',{typePage:val});		
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

	}
</style>
