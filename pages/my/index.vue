<template>
	<view class="content_main">

		<!-- 导航栏及标题 -->
		<u-navbar title="个人中心" :is-back="false" :border-bottom="false" :background="background"></u-navbar>

		<!-- 个人头像及图片 -->
		<view class="content_top">

			<view class="top_upper">

				<view class="top_img" @click="jumpPage(18)">
					<!-- <u-avatar mode="circle" size="default" :src="userInfo.avatar"></u-avatar> -->
					<imageBox :imageUrl="userInfo.avatar" width="80rpx" height="80rpx" shape="circle"></imageBox>
				</view>

				<view class="top_title">

					<view class="title_name">
						<view class="name_color" v-if="userInfo.nickname.length==0" @click="jumpPage(19)">点这里登录</view>
						<view class="name_color" v-else @click="jumpPage(18)">{{userInfo.nickname}}</view>
						<view class="name_png" @click="jumpPage(13)">
							<u-icon name="Notice" custom-prefix="custom-icon" size="36" color="#FFFFFF"></u-icon>
							<view class="color_tips" v-if="messageNum > 0">{{messageNum}}</view>
						</view>
					</view>

					<view class="title_num">
						<view class="num_img">邀请码：{{userInfo.invite_code}}
						   <u-icon name="copy" custom-prefix="custom-icon" size="24" @click="copyBtn"></u-icon>
						</view>
					</view>

				</view>

			</view>

			<view class="top_card">
				<template>
					<!-- 注册会员 -->
					<image src="/static/images/member/general_bg.png" v-if="userInfo.level==0"></image>
					<!-- vip会员 -->
					<image src="/static/images/member/vip_member_bg.png" v-else-if="userInfo.level==5"></image>
					<!-- 银卡会员 -->
					<image src="/static/images/member/silver_member_bg.png" v-else-if="userInfo.level==10"></image>
					<!-- 金卡代理 -->
					<image src="/static/images/member/golden_card.png" v-else-if="userInfo.level==20"></image>
					<!-- 黑卡代理 -->
					<image src="/static/images/member/black_card.png" v-else-if="userInfo.level==30"></image>
					<!-- 经销商 -->
					<image src="/static/images/member/dealer_bg.png" v-else-if="userInfo.level==40"></image>
				</template>
				<view class="card_main" v-if="userInfo.level==0 || userInfo.level==5">
					<view class="card_desc">

					</view>
					<view class="progress">
						<view class="progress_bg">
							<u-line-progress active-color="#B8B8B8" :percent="contentNum" height="10"
								:show-percent="false" v-if="userInfo.level==0"></u-line-progress>
							<u-line-progress active-color="#EAC3A7" inactive-color="#B48562" :percent="contentNum"
								height="10" :show-percent="false" v-else-if="userInfo.level==5"></u-line-progress>
						</view>
						<view class="progress_value"
							:style="'color: ' + (userInfo.level === 0?'#666666':(userInfo.level === 5?'#82441C':'#687184'))">
							{{userInfo.consume_money}}<text
								v-if="userInfo.uid">/</text>{{userInfo.next_level_need_consume_money}}
						</view>
					</view>
				</view>
			</view>

		</view>

		<!-- 矩形图片 -->
		<view class="content_png">
			<image src="/static/images/my/my_rectangle.png"></image>
		</view>

		<!-- 主要内容 -->
		<view class="content_box">

			<view class="box_top">

				<view class="top_layer" style="width: 350rpx;" @click="jumpPage(2)">
					<view class="layer_top">
						<u-icon name="attestation" custom-prefix="custom-icon" size="36"></u-icon>
					</view>
					<view v-if="userInfo.is_certification == 0">实名认证</view>
					<view v-else>已实名认证</view>
				</view>

				<view class="top_layer" @click="jumpPage(3)">
					<view class="layer_top">
						<u-icon name="invite" custom-prefix="custom-icon" size="36"></u-icon>
					</view>
					<view>邀请好友</view>
				</view>

			</view>

			<view class="box_middle">

				<view class="middle_title" @click="jumpPage(1)">
					<view class="title_left">我的订单</view>
					<view class="title_right">查看全部 <u-icon name="rightBack" custom-prefix="custom-icon" size="20"></u-icon>
					</view>
				</view>

				<view class="middle_main">

					<view class="main_item" @click="jumpPage(4)">
						<u-icon name="wallet" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>待付款</text></view>
					</view>

					<view class="main_item" @click="jumpPage(5)">
						<u-icon name="dispatch" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>待发货</text></view>
					</view>

					<view class="main_item" @click="jumpPage(6)">
						<u-icon name="consignee" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>待收货</text></view>
					</view>

					<view class="main_item" @click="jumpPage(7)">
						<u-icon name="finishedlist" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>已完成</text></view>
					</view>

					<view class="main_item" @click="jumpPage(8)">
						<u-icon name="aftersale" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>售后</text></view>
					</view>

				</view>

			</view>

			<view class="box_bottom">

				<view class="bottom_title">
					<view>常用工具</view>
				</view>

				<view class="bottom_main">

					<view class="main_item" @click="jumpPage(9)">
						<u-icon name="coupon" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>优惠券</text></view>
					</view>

					<view class="main_item" @click="jumpPage(10)">
						<u-icon name="getcoupon" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>领券中心</text></view>
					</view>

					<view class="main_item" @click="jumpPage(11)">
						<u-icon name="adress" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>地址管理</text></view>
					</view>

					<view class="main_item" @click="jumpPage(17)">
						<u-icon name="aftersaleadress" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>售后地址</text></view>
					</view>

					<view class="main_item" @click="jumpPage(12)">
						<u-icon name="favorite" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>我的收藏</text></view>
					</view>

					<view class="main_item" @click="jumpPage(16)">
						<u-icon name="question" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>常见问题</text></view>
					</view>

					<view class="main_item" @click="jumpPage(14)">
						<u-icon name="opinion" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>意见反馈</text></view>
					</view>

					<button class="main_item main_button"  open-type="contact" 
					    :session-from="'nickName=' + userInfo.nickname + '|avatarUrl='+ userInfo.avatar">
						<u-icon name="sever" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>联系客服</text></view>
					</button>

					<view class="main_item" @click="jumpPage(0)">
						<u-icon name="setting" custom-prefix="custom-icon" size="36"></u-icon>
						<view class="name_title"><text>设置</text></view>
					</view>
					

				</view>

			</view>

		</view>

		<!-- 售后地址 -->
		<afterAddress :showAfter="showAfter" :afterInfo="after" @close="closeAfterAddress" ref="afterItem"></afterAddress>
		
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue';
	import afterAddress from '@/component/common/afterAddress.vue';
	export default {
		components: {
			imageBox,
			afterAddress
		},
		data() {
			return {
				background: {
					backgroundColor: '#212121',
				}, //顶部导航栏样式
				userInfo: {
					nickname: '', //昵称
					avatar: '', //头像
					invite_code: '', //邀请码
					is_certification: 0, //身份证认证过没
					phone: '', //手机号
					level: '', //等级
					level_str: '', //等级名字
					consume_money: '', //当前的成长值
					next_level_need_consume_money: '', //升级到下-个等级
					invite_post_url: '', //分享页
					uid: '', //用户id
				}, //部分用户信息
				contentNum: 0, //进度条
				messageNum: 0, // 消息数量
				signType: "", //判断退出登录
				showAfter: false, //售后地址
			}
		},
		onShow() {
			this.showAfter = false; //关闭售后弹窗
			this.getUserInfo();
			// this.signType = this.$cache('signType');
			// if (this.signType) { //判断退出登录
			// 	uni.clearStorage();
			// 	this.$store.state.token = "";
			// 	this.userInfo = {
			// 		nickname: '', //昵称
			// 		avatar: '', //头像
			// 		invite_code: '', //邀请码
			// 		is_certification: 0, //身份证认证过没
			// 		phone: '', //手机号
			// 		level: '', //等级
			// 		level_str: '', //等级名字
			// 		consume_money: '', //当前的成长值
			// 		next_level_need_consume_money: '', //升级到下-个等级
			// 		invite_post_url: '', //分享页
			// 		uid: '', //用户id
			// 	}; //部分用户信息
			// 	this.contentNum = 0; //进度条
			// 	this.$cache('signType', null);
			// } else {

			// }
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getUserInfo();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			//获取用户信息
			getUserInfo() {
				let that = this;
				// kx  判断是否授权登录和绑定手机号才能进行接口请求，防止注册过程中的返回
				that.$api.my.API_USERINFO().then(res => {
					if (that.invitebinding == 'isOk') {
						that.userInfo = {
							nickname: res.data.nickname, //昵称
							avatar: res.data.avatar, //头像
							invite_code: res.data.invite_code, //邀请码
							is_certification: res.data.is_certification, //身份证认证过没
							phone: res.data.phone, //手机号
							level: res.data.level, //等级
							level_str: res.data.level_str, //等级名字
							consume_money: res.data.consume_money, //当前的成长值
							next_level_need_consume_money: res.data.next_level_need_consume_money, //升级到下-个等级
							invite_post_url: res.data.invite_post_url, //分享页
							uid: res.data.uid, //用户id
						}; //部分用户信息
						that.contentNum = (that.userInfo.consume_money / that.userInfo
							.next_level_need_consume_money) * 100;
						that.messagesInfo();
					}
				});

			},

			//获取消息中心提醒数量
			messagesInfo() {
				let that = this;
				that.$api.my.MESSAGE_NUM().then(res => {
					that.messageNum = res.data.num;
				});
			},

			//复制粘贴
			copyBtn() {
				let that = this;
				uni.setClipboardData({
					data: that.userInfo.invite_code,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						});
					}
				});
			},

			//跳转设置
			jumpPage(val) {
				switch (val) {
					case 0: //设置
						this.$jumpPage('/settings/personal/setUp');
						break;
					case 1: //我的订单
						this.$jumpPage('/pages/my/order/myOrder', {
							typePage: 0
						});
						break;
					case 2: //实名认证
						if (this.userInfo.is_certification == 1) {
							uni.showModal({
								content: '您已通过实名认证',
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										console.log('用户点击确认');
									}
								}
							})
							return
						}
						this.$jumpPage('/settings/real/realName');
						break;
					case 3: //邀请好友
						this.$jumpPage('/settings/personal/sharePage', {
							urlImg: this.userInfo.invite_post_url
						});
						break;
					case 4: //我的订单 待付款
						this.$jumpPage('/pages/my/order/myOrder', {
							typePage: 1
						});
						break;
					case 5: //我的订单 待发货
						this.$jumpPage('/pages/my/order/myOrder', {
							typePage: 2
						});
						break;
					case 6: //我的订单 待收货
						this.$jumpPage('/pages/my/order/myOrder', {
							typePage: 3
						});
						break;
					case 7: //我的订单 已完成
						this.$jumpPage('/pages/my/order/myOrder', {
							typePage: 4
						});
						break;
					case 8: //售后
						this.$jumpPage('/pages/my/after/afterOrder');
						break;
					case 9: //我的优惠劵
						this.$jumpPage('/pages/my/coupons/myCoupons', {
							typePage: 0
						});
						break;
					case 10: //领劵中心
						this.$jumpPage('/settings/coupons/centerCoupons', {
							typePage: 2
						});
						break;
					case 11: //地址管理
						this.$jumpPage('/settings/address/addressSet', {
							typePage: 0
						});
						break;
					case 12: //我的收藏
						this.$jumpPage('/settings/collection/myCollection');
						break;
					case 13: //消息中心
						this.$jumpPage('/settings/message/messageCenter');
						break;
					case 14: //意见反馈
						this.$jumpPage('/settings/opinion/feedBack');
						break;
					case 15: //联系客服

						break;
					case 16: //常见问题

						break;
					case 17: //售后地址
					    this.openAfterAddress();
						break;
					case 18: //个人信息页面
						this.$jumpPage('/settings/personal/personal');
						break;
					case 19: //登录页面
						this.$jumpPage('/pages/my/login/login/login');
						break;

				}
			},
			
			//打开售后地址
			openAfterAddress(){
				let that = this;
				that.showAfter=true;
				that.$refs.afterItem.openFrm();
			},
			
			//关闭售后地址
			closeAfterAddress(){
				let that = this;
				that.showAfter= false; //售后地址
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	
	button::after {
	  border: none !important;
	}
	
	.content_main {
		background: #EEEEEE;
		height: 100%;


		.slot-wrap {
			display: flex;
			align-items: center;
			padding: 0 15rpx;



			image {
				width: 48rpx;
				height: 48rpx;
			}

		}

		.content_top {
			width: 100%;
			height: 260rpx;
			background: #212121;
			padding: 20rpx 24rpx 0 57rpx;
			position: relative;


			.top_upper {
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				.top_title {
					margin-left: 30rpx;
					width: 100%;
					padding-right: 10rpx;

					.title_name {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 100%;
						height: 50rpx;
						margin-bottom: 8rpx;

						.name_color {
							font-size: 36rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}

						.name_png {
							width: 36rpx;
							height: 36rpx;
							position: relative;

							.color_tips {
								width: 24rpx;
								height: 24rpx;
								border-radius: 14rpx;
								background-color: red;
								color: #FFFFFF;
								font-size: 22rpx;
								position: absolute;
								bottom: 8px;
								text-align: center;
								line-height: 24rpx;
								right: -15rpx;
							}

						}

					}

					.title_num {
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFFc4;
						height: 30rpx;




						.num_img {
							display: flex;
							align-items: center;
							margin-bottom: 8rpx;
							
							::v-deep.u-icon{
								margin-left: 16rpx;
							}
						}



					}

				}

			}

			.top_card {
				position: absolute;
				width: 636rpx;
				height: 218rpx;

				.card_main {
					position: absolute;
					left: 0rpx;
					top: 0rpx;
					width: 636rpx;
					height: 218rpx;
					padding: 42rpx;

					.card_desc {
						font-size: 30rpx;
						color: #82441C;
						font-weight: 500;
						height: 82rpx;
					}

					.progress {
						.progress_bg {
							width: 300rpx;


							.progress_reality {
								width: 0rpx;
								height: 10rpx;
								background: #EAC3A7;
								border-radius: 6rpx;
							}

						}

						.progress_value {
							font-size: 22rpx;
						}
					}

				}

				.card_tips {
					position: absolute;
					right: 0rpx;
					bottom: 40rpx;
					width: 154rpx;
					height: 48rpx;
					border-radius: 24rpx 0 0 24rpx;
					text-align: center;
					line-height: 48rpx;
					background: rgba(255, 255, 255, 0.5);
					font-size: 24rpx;
					color: #666666;
				}


				image {
					width: 636rpx;
					height: 218rpx;
				}

			}
		}

		.content_png {
			width: 100%;
			height: 76rpx;

			image {
				width: 100%;
				height: 76rpx;
			}

		}

		.content_box {
			padding: 8rpx 24rpx;

			.box_top {
				width: 100%;
				height: 88rpx;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 26rpx 0;

				.top_layer:nth-child(1) {
					border-right: 1rpx solid rgba(0, 0, 0, 0.1);
				}

				.top_layer {
					width: 352rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;

					.layer_top {
						display: flex;
						align-items: center;
						
						::v-deep.u-icon{
							margin-right: 16rpx;
						}


					}


				}



			}

			.box_middle {
				width: 100%;
				height: 218rpx;
				background: #FFFFFF;
				margin-top: 16rpx;

				.middle_title {
					width: 100%;
					height: 85rpx;
					display: flex;
					align-items: center;
					padding: 0 24rpx;
					flex-direction: row;
					justify-content: space-between;

					.title_left {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}

					.title_right {
						line-height: 36rpx;
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						display: flex;
						align-items: center;
						
						::v-deep.u-icon{
							margin-left: 16rpx;
						}

					}

				}

				.middle_main {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					height: 134rpx;
				
					

					.main_item {
						width: 140rpx;
						height: 134rpx;
						text-align: center;
						
						::v-deep.u-icon{
							margin-top: 24rpx;
						}

						.name_title {
							// text-align: center;
							color: #333333;
							margin-top: 16rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
						}

					}
					
				}

			}

			.box_bottom {
				width: 100%;
				height: 484rpx;
				background: #FFFFFF;
				margin-top: 16rpx;

				.bottom_title {
					width: 100%;
					height: 85rpx;
					display: flex;
					align-items: center;
					padding: 0 24rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}

				.bottom_main {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					height: 266rpx;

					.main_item {
						width: 175rpx;
						height: 133rpx;
						text-align: center;
						
						::v-deep.u-icon{
							margin-top: 24rpx;
						}
						

						.name_title {
							text-align: center;
							color: #333333;
							margin-top: 10rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							margin-top: 16rpx;
						}

					}
					
					.main_button{
						line-height: 1.25;
						background: #fff;
						margin: 0;
					}

				}

			}

		}

		.after_main {
			width: 100%;
			padding-bottom: 30rpx;

			.after_top {
				padding: 0 40rpx;
				height: 50rpx;
				margin-top: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.top_name {
					font-size: 36rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				image {
					width: 24rpx;
					height: 24rpx;
				}


			}

			.after_content {
				margin-top: 60rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;

				.after_line {
					height: 90rpx;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

					.line_name {
						height: 40rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						width: 112rpx;
					}

					.line_input {
						margin-left: 32rpx;
						width: calc(100% - 160rpx);
					}

				}

			}

			.after_bottom {
				margin: 0 25rpx;
				height: 66rpx;
				background: #212121;
				color: #FFFFFF;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				align-items: center;
				display: flex;
				justify-content: space-around;
				margin-top: 40rpx;
			}

		}
	}
</style>
