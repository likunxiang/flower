<template>
	<view class="content_main">

		<u-navbar title="支付设置" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_box">

			<view class="box_item">

				<view class="item_line" @click="jumpPage(0)">
					<view class="line_name">支付密码</view>
					<view>
						<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

				<view class="item_line item_teShu" @click="jumpPage(1)">
					<view class="line_name">我的银行卡</view>
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
				pay_pwd: '', //判断这个支付密码有没有
			}
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {

			//获取支付密码
			getUserInfo() {
				let that = this;
				that.$api.my.API_USERINFO().then(res => {
					that.pay_pwd = res.data.pay_pwd;
				});
			},


			//跳转设置
			jumpPage(val) {
				let that = this;
				switch (val) { //先判断有没有密码，没有密码在跳设置页，有密码跳修改页
					case 0:
						if (that.pay_pwd.length == 0) {
							that.$jumpPage('/settings/personal/setPassword',{}, 'replace'); //设置密码
						} else {
							that.$jumpPage('/settings/personal/verifyPassword',{}, 'replace'); //验证密码
						}
						break;
					case 1:
						that.$jumpPage('/settings/bank/bankCardList', {
							typePage: 0
						});
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
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);
				}



			}

			.box_teShu {
				border-top: 16rpx solid #EEEEEE;
			}

		}

	}
</style>
