<template>
	<view class="content_main">

		<u-navbar :background="background" :border-bottom="false"></u-navbar>

		<view class="content_box">

			<view class="box_img" @click="chooseImage">
				<image :src="shareImg"></image>
			</view>

		</view>

		<view class="content_bottom">

			<view class="bottom_img">

				<view class="block_line">
<!-- 					<image src="/settings/static/share_weChat.png"></image>
					<view class="name_title">微信</view> -->
				</view>
				
				<view class="block_line" @click="preservation">
					<image src="/settings/static/share_save.png"></image>
					<view class="name_title">保存到相册</view>
				</view>

				<view class="block_line">
<!-- 					<image src="/settings/static/share_moment.png"></image>
					<view class="name_title">朋友圈</view> -->
				</view>

			</view>

			<view class="bottom_button" @click="returnPage">取消</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#000000',

					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',

					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				shareImg: '', //分享页
			}
		},
		onLoad(option) {
			this.shareImg = decodeURIComponent(option.urlImg);
		},
		methods: {

			//返回上一页
			returnPage() {
				this.$goback();
			},

			//保存到相册
			preservation() {
				let that = this;
				uni.downloadFile({
						url: that.shareImg,
						success: (res) =>{
							if (res.statusCode === 200){
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.showToast({
											title: "保存成功",
										});
									},
									fail: function() {
										uni.showToast({
											title: "保存失败，请稍后重试",
											icon: "none"
										});
									}
								});
							}
						}
					})
			},

			//保存图片
			chooseImage() {
				let urlImg = decodeURIComponent(this.shareImg);
				uni.previewImage({
					count: 1,
					urls: [urlImg],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							uni.saveImageToPhotosAlbum({
								filePath: data.path,
								success: function() {
								}
							});
						},
						fail: function(err) {
							console.log(err)
						}
					},
					success: (res) => {
					},
					fail: (res) => {
						console.log('失败', res);
					}
				});
			}


		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background: #000000;
		height: 100%;

		.content_box {
			padding: 96rpx 80rpx 280rpx 80rpx;

			.box_img {
				width: 590rpx;
				height: 964rpx;

				image {
					width: 100%;
					height: 100%;
				}

			}

		}


		.content_bottom {
			width: 100%;
			height: 261rpx;
			position: absolute;
			bottom: 0;
			position: fixed;
			background: #333333;

			.bottom_img {
				height: 163rpx;
				border-bottom: 1rpx solid rgba(255, 255, 255, 0.3);
				width: 100%;
				padding: 0 91rpx;
				display: flex;

				.block_line {
					width: 190rpx;
					height: 164rpx;
					align-items: center;

					image {
						display: block;
						width: 72rpx;
						height: 72rpx;
						margin: 0 auto;
						margin-top: 31rpx;
					}

					.name_title {
						text-align: center;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin-top: 13rpx;
					}

				}

			}

			.bottom_button {
				height: 97rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}

		}

	}
</style>
