<template>
	<view class="content_main">

		<u-navbar title="个人信息" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_box">

			<view class="box_item">

				<view class="item_line" style="height:140rpx;" @click="callInfo">
					<view class="line_name">个人头像</view>
					<view class="line_cont">
						<imageBox :imageUrl="userInfo.avatar" width="100rpx" height="100rpx" margin="margin-right:24rpx;"></imageBox>
						<!-- <u-avatar :src="userInfo.avatar" mode="circle" style="margin-right:24rpx;"></u-avatar> -->
						<view class="cont_right">
							<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
						</view>
					</view>
				</view>

				<view class="item_line" @click="jumpPage">
					<view class="line_name">昵称</view>
					<view class="line_cont">
						<view class="cont_space">{{userInfo.nickname}}</view>
						<view class="cont_right">
							<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
						</view>
					</view>
				</view>
				
				<view class="item_line">
					<view class="line_name">手机号</view>
					<view class="line_cont">
						<view class="cont_space">{{userInfo.phone}}</view>
						<view class="cont_right">
							<!-- <u-icon name="arrow-right" color="#9B969A" size="24"></u-icon> -->
						</view>
					</view>
				</view>
				
<!-- 				<view class="item_line">
					<view class="line_name">登录密码</view>
					<view class="line_cont">
						<view class="cont_space">去修改</view>
						<view class="cont_right">
							<u-icon name="arrow-right" color="#9B969A" size="24"></u-icon>
						</view>
					</view>
				</view> -->
				
<!-- 				<view class="item_line">
					<view class="line_name">微信账号</view>
					<view class="line_cont">
						<view class="cont_space">13015995667</view>
						<view class="cont_right">
							<u-icon name="arrow-right" color="#9B969A" size="24"></u-icon>
						</view>
					</view>
				</view> -->
				
				<view class="item_line item_teShu">
					<view class="line_name">等级</view>
					<view class="line_cont">
						<view class="cont_space">{{userInfo.level_str}}</view>
						<view class="cont_right">
							<!-- <u-icon name="arrow-right" color="#9B969A" size="24"></u-icon> -->
						</view>
					</view>
				</view>
				

			</view>

		</view>

	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue';
	export default {
		components: {
			imageBox
		},
		data() {
			return {
				userInfo: {
					nickname: '', //昵称
					avatar: '', //头像
					phone: '', //手机号
					level: '', //等级
					level_str: '', //等级名字
				}, //部分用户信息
			}
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			
			//获取用户信息
			getUserInfo() {
				let that = this;
				that.$api.my.API_USERINFO().then(res => {
					that.userInfo = {
						nickname: res.data.nickname, //昵称
						avatar: res.data.avatar, //头像
						phone: res.data.phone, //手机号
						level: res.data.level, //等级
						level_str: res.data.level_str, //等级名字
					}; //部分用户信息
				});
			},
			
			//调用传图片
			callInfo(){
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'https://api.xrkmall.com/common/file_upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let obj=JSON.parse(uploadFileRes.data);
								let imgSrc=obj.data.src;
								that.getModifyInfo(imgSrc)
							}
						});
					}
				});
			},
			
			//获取用户信息
			getModifyInfo(val) {
				let that = this;
				that.$api.my.API_USERMODIFY({
					avatar:val
				}).then(res => {
					uni.showToast({
						title: '头像修改成功!!!'
					});
					that.getUserInfo();
				});
			},
			
			//修改昵称跳转
			jumpPage() {
				let that = this;
				that.$jumpPage('/settings/personal/nickName',{nickname: that.userInfo.nickname});
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
					border-top:1rpx solid rgba(0, 0, 0, 0.1);
					
					
					.line_cont{
						display: flex;
						align-items: center;
						
						
						.cont_space{
							margin-right: 22rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #9B969A;
						}
						
						.cont_right{
							
						}
						
				
					}


					.line_name {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

				}
				
				.item_teShu{
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					border-top:1rpx solid rgba(0, 0, 0, 0.1);
				}
				

			}

		}

	}
</style>
