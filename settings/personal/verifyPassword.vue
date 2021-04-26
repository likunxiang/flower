<template>
	<view class="content_main">

		<u-navbar title="验证密码" :custom-back="$goback"></u-navbar>

		<view class="content_box">
			
			<view class="box_title">
			   请输入旧支付密码
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
			
			//输入完成时触发 验证旧密码
			getModifyInfo(val) {
				let that = this;
				that.$api.my.API_USERMODIFY({
					old_pay_pwd:val
				}).then(res => {
					uni.showToast({
						title: '验证成功!!!'
					});
					setTimeout(() => {
						that.$jumpPage('/settings/personal/setPassword', {}, 'replace'); //修改支付密码
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
