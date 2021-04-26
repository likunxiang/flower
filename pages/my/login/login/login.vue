<template>
	<view class="page">
		<view class="logo">
			<image src="/static/images/sunflower_logo.png" mode=""></image>
		</view>
		<view class="title">
			<image src="/static/images/sunflower_title.png" mode=""></image>
		</view>
		<view class="desc">
			<image src="/static/images/sunflower_desc.png" mode=""></image>
		</view>
		<button class="author_btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
			<view class="wechat_icon">
				<u-icon class="image" name="lasttimeWeChatlogin" custom-prefix="custom-icon" size="46" color="#FFFFFF"></u-icon>
			</view>
			<view class="text">一键授权微信登录</view>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: ''
			};
		},
		onLoad() {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					this.code = res.code
				}
			});


		},
		methods: {
			getPhoneNumber(e) {
				let code = this.code;
				let encryptedData = e.detail.encryptedData;
				let iv = e.detail.iv;
				
				
				this.$api.login.login({
					code: code,
					encrypted_data: encryptedData,
					iv: iv
				}).then(res => {
					if (res.status == 0) {
						this.$u.vuex("setToken", res.data.token);
						this.$u.vuex("setUser", res.data);
						this.$u.vuex("setInvitebinding", res.data.p_invite_code.length==0? "onOk" :
							"isOk");
						if (res.data.p_invite_code.length == 0) {
							let usertel = res.data.phone;
							this.$u.vuex("setUsertel", usertel);
							// 检查是否存在邀请码
							let inviteCode = this.sharecode;
							if (inviteCode) {
								this.$api.login.bindTelAndCode({
									p_invite_code: inviteCode,
									phone: usertel
								}).then(res => {
									this.$u.vuex("setInvitecode", this.inviteCode);
									this.$u.vuex("setInvitebinding","isOk");
									uni.navigateBack();
									
								});
							} else {
								this.$jumpPage('/pages/my/login/inviteCode/inviteCode', {}, 'replace');
							};
						} else {
							this.$goback();
						};
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					};
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.page {
		height: 100vh;
		padding: 40rpx;
		padding-top: 226rpx;
		position: relative;
		.logo {
			width: 186rpx;
			height: 186rpx;
			margin: 0rpx auto 38rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
		.title {
			width: 178rpx;
			height: 50rpx;
			margin: 0 auto 65rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.desc {
			width: 390rpx;
			height: 27rpx;
			margin: 0 auto;
			image {
				width: 100%;
				height: 100%;
			}
		}

		.author_btn {
			position: absolute;
			bottom: 98rpx;
			left: 40rpx;
			width: 670rpx;
			height: 88rpx;
			background: #212121;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 0rpx;
			line-height: 1.0;
			.wechat_icon {
				width: 46rpx;
				height: 46rpx;
				margin-right: 16rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
