<template>
	<view class="content">
		<view class="page_title">
			请输入邀请码
		</view>
		<view class="desc">
			请填写邀请你的邀请码
		</view>
		<!-- 方形输入框组件 -->
		<!-- <squreInput :smsCodeLength='smsCodeLength' :smsCode='smsCode' @changeSmsCode='changeSmsCode' @loginSuccess="loginSuccess"></squreInput> -->
		<!-- 方形输入框组件 end -->
		
		<view class="pp">
			<input :maxlength="smsCodeLength" :focus="isFocus" class="input" @input="change" :value="smsCode" />
		</view>
		<view class="btn" @click="loginSuccess" v-if="smsCode">
			注册
		</view>
		<view class="btn btn_disable" v-else>
			注册
		</view>
	</view>
</template>

<script>
	import squreInput from '@/component/common/squareInput.vue';
	export default {
		data() {
			return {
				smsCode: '',
				smsCodeLength: 8,
				phone: '',  // 用户的授权手机号
				isFocus: true
			}
		},
		components: {
			squreInput: squreInput
		},
		onLoad() {
			this.phone = this.usertel;
		},
		methods: {
			change(e) {
				let smsCode = e.detail.value;
				this.smsCode = smsCode;
				if (smsCode.length >= this.smsCodeLength) {
					this.isFocus = false;
					this.loginSuccess(); // 触发父组件 输入完成回调
				}
				
			},
			changeSmsCode(e) {
				let smsCode = e;
				let arr = smsCode.split('');
				this.smsCode = e;
			},
			
			loginSuccess() {
				
				if (this.smsCode.length >= 6) {
					this.$api.login.bindTelAndCode({
						p_invite_code: this.smsCode,
						phone: this.phone
					}).then(res => {
						this.$u.vuex("setInvitecode", this.smsCode);
						this.$u.vuex("setInvitebinding","isOk");
						uni.navigateBack();
						// uni.showModal({
						// 	content: '注册成功',
						// 	showCancel: false,
						// 	success: (res) => {
						// 		if (res.confirm) {
						// 			uni.navigateBack();
						// 		}
						// 	}
						// })
						
					});
				} else {
					uni.showToast({
						title: '格式错误',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
	.content {
		padding: 60rpx;
		.page_title {
			font-size: 52rpx;
			color: #333333;
			font-weight: 500;
			margin-bottom: 10rpx;
		}
		.desc {
			font-size: 26rpx;
			font-weight: 400;
			color: #666666;
			margin-bottom: 60rpx;
		}
		.pp {
			padding: 24rpx 31rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.3);
			.input {
				font-size: 36rpx;
				color: #333333;
				font-weight: bold;
			}
		}
		.btn {
			margin-top: 234rpx;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: #212121;
			font-size: 24rpx;
			color: #FFFFFF;
		}
		.btn_disable {
			background: #CCCCCC;
			color: #FFFFFF;
		}
	}

</style>
