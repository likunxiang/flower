<template>
	<view class="content_main">

		<u-navbar title="设置密码" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_title">
				请输入6位支付密码, 建议不要与银行卡取款密码相同
			</view>

			<view class="box_pass">
				<u-message-input mode="box" :focus="true" :dot-fill="true" :maxlength="6" @finish="getModifyInfo"></u-message-input>
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
			
			//输入完成时触发 设置新密码
			getModifyInfo(val) {
				let that = this;
				that.$api.my.API_USERMODIFY({
					new_pay_pwd:val
				}).then(res => {
					uni.showToast({
						title: '操作成功!!!'
					});
					setTimeout(() => {
						that.$jumpPage('/settings/personal/paymentSettings', {}, 'replace'); //验证支付密码
					}, 800)
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;

		.content_box {
			padding: 25rpx 25rpx;

			.box_title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-bottom: 22rpx;
			}

			.box_pass {
				align-items: left;
				display: flex;
				
				
				::v-deep.u-box{
					border-radius: 0;
					width: 116rpx !important;height: 90rpx !important;
					margin: 0;
					border: 1px solid #CCCCCC !important;
					margin-left: -1px;
				}
				
				
				
			}

		}

	}
</style>
